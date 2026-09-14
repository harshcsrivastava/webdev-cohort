import OpenAI from 'openai';
import 'dotenv/config';

import { HARNESS_PROMPT } from './config.js';

export interface IMessage {
  role: 'user' | 'assistant' | 'developer';
  content: string;
}

export interface ITool {
  name: string;
  description: string;
  doc?: string;
  executor: (input: string) => Promise<string>; // fn written by whomsoever is writing this tool. Returns a promise of type String
}

export type Interceptor = (messgae: IMessage) => void;

export class AgentBuilder {
  public instructions: string | undefined;
  public toolList: ITool[];

  constructor() {
    this.toolList = [];
  }

  public setInstructions(instructions: string) {
    this.instructions = instructions;
    return this;
  }

  public tool(t: ITool) {
    this.toolList.push(t);
    return this;
  }
  public build() {
    return new Agent(this);
  }
}

export class Agent {
  private instructions: string;
  private messageHistory: IMessage[];
  private toolMap: Map<string, ITool>;
  private openai: OpenAI;

  private interceptor: Interceptor[];

  private MAX_LOOP: number = 30;

  constructor(builder: AgentBuilder) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY is required');
    }

    this.openai = new OpenAI({
      apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer':
          process.env.OPENROUTER_SITE_URL ?? 'http://localhost:3000',
        'X-Title': process.env.OPENROUTER_APP_NAME ?? 'Agent SDK',
      },
    });
    this.toolMap = new Map();

    this.interceptor = [];

    for (const t of builder.toolList) {
      this.toolMap.set(t.name, t);
    }

    this.instructions = `
      ${HARNESS_PROMPT} \n\n

      System Prompt:
      ${builder.instructions}

      Available Tools:
      ${builder.toolList.map((t) => JSON.stringify({ functionName: t.name, functionDescription: t.description, functionDoc: t.doc })).join('\n')}
    `;
    this.messageHistory = [];
  }

  public attachInterceptor(interceptor: Interceptor) {
    this.interceptor.push(interceptor);
  }

  private notifyInterceptors(message: IMessage) {
    for (const interceptor of this.interceptor) {
      interceptor(message);
    }
  }

  static builder() {
    return new AgentBuilder();
  }

  public printSystemPrompt() {
    console.log(this.instructions);
  }

  public async run(query: string) {
    //  Append query to Message History
    this.messageHistory.push({ role: 'user', content: query });

    for (let i = 0; i < this.MAX_LOOP; i++) {
      //  ...LLM Response = Call LLM (SYSTEM_PROMPT + MESSAGE_HISTORY)
      const LLMResponse = await this.openai.chat.completions.create({
        model: process.env.OPENROUTER_MODEL ?? 'openrouter/free',
        messages: [
          { role: 'system', content: this.instructions },
          ...this.messageHistory.map((e) => ({
            role: e.role,
            content: e.content,
          })),
        ],
        response_format: { type: 'json_object' },
      });

      const rawLLMResponse: string = LLMResponse.choices[0]?.message
        .content as string;
      if (!rawLLMResponse) continue;

      // if (!rawLLMResponse) {
      //   const choice = LLMResponse.choices[0];
      //   const refusal = choice?.message.refusal;
      //   if (refusal) {
      //     throw new Error(`OpenRouter refused the request: ${refusal}`);
      //   }

      //   this.messageHistory.push({
      //     role: 'developer',
      //     content: `OpenRouter returned no content (finish_reason: ${choice?.finish_reason ?? 'unknown'}). Retry the previous step.`,
      //   });
      //   continue;
      // }

      // Append whatever LLM has thrown out to Message History

      this.messageHistory.push({ role: 'assistant', content: rawLLMResponse });
      this.notifyInterceptors({ role: 'assistant', content: rawLLMResponse });

      const firstJsonObject = rawLLMResponse.match(/^\s*\{[\s\S]*?\}\s*/)?.[0];
      const parsedResult = JSON.parse(firstJsonObject ?? rawLLMResponse);
      console.log(`[${parsedResult.step}]`, parsedResult.text ?? parsedResult);

      // if LLMResponse.step === "OUTPUT" break(stop condition) [We should also make it to allow only certain max iteration]
      if (parsedResult.step.toLowerCase() === 'output') {
        return this.messageHistory;
      }

      // if LLMResponse.step === "TOOL_REQUEST)"
      /**
       * tool = ToolMap.find(LLMResponse.functionName)
       * toolResult = tool.executor(LLMResponse.input)
       * Append toolResult to MESSAGE_HISTORY
       * continue
       */

      if (parsedResult.step.toLowerCase() === 'tool_request') {
        const { functionName, input } = parsedResult;
        // if (!functionName || input === undefined) {
        //   this.messageHistory.push({
        //     role: 'developer',
        //     content: 'Invalid tool request',
        //   });
        //   continue;
        // }

        const tool = this.toolMap.get(functionName);
        if (!tool) {
          this.messageHistory.push({
            role: 'developer',
            content: `Tool ${functionName} not found`,
          });
          continue;
        }

        const toolResult = await tool.executor(input);
        this.messageHistory.push({
          role: 'developer',
          content: JSON.stringify({
            functionName,
            input,
            toolResult,
          }),
        });
        this.notifyInterceptors({
          role: 'developer',
          content: JSON.stringify({ functionName, input, toolResult }),
        });
        continue;
      }
    }

    throw new Error(`Agent exceeded maximum loop count of ${this.MAX_LOOP}`);
  }
}
