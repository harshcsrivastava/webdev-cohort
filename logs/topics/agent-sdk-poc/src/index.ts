import { Agent, AgentBuilder } from './app/agent.js';
import type { ITool } from './app/agent.js';
import axios from 'axios';

import { exec } from 'child_process';

const weatherTool: ITool = {
  name: 'fetchWeatherInfo',
  description: 'Fetches realtime weather data by cityname',
  doc: 'fetchWeatherInfo(cityName: string): WeatherReport',
  async executor(cityName) {
    const url = `https://wttr.in/${cityName.toLowerCase()}?format=%C+%t`;
    const response = await axios.get(url, { responseType: 'text' });
    return JSON.stringify({ cityName, weatherInfo: response.data });
  },
};

const cliAccessTool: ITool = {
  name: 'execCLI',
  description: 'Executes a command in the CLI and returns the output',
  doc: 'execCLI(command: string): CLIResponse',
  executor(cmd) {
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          return resolve(`There was an Error ${error}`);
        } else {
          return resolve(stdout);
        }
      });
    });
  },
};
async function init() {
  const agent: Agent = Agent.builder()
    .setInstructions(`You are an expert coding agent`)
    .tool(weatherTool)
    .tool(cliAccessTool)
    .build();

  agent.attachInterceptor((message) => {
    console.log(`Intercepted message: ${message.role} - ${message.content}`);
  });
  const result = await agent.run('Can you tell me weather of London & Delhi?');
  console.log(result![result.length - 1]);
}

init();
