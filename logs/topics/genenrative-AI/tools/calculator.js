export const calculator = async ({ op, a, b }) => {
    if (typeof a !== "number" || typeof b !== "number") {
        return "Both a and b must be numbers";
    }

    switch (op) {
        case "+":
            return a + value;
        case "-":
            return a - value;
        case "*":
            return a * value;
        case "/":
            if (value === 0) throw new Error("Division by zero is not allowed");
            return a / value;
        case "%":
            if (value === 0) throw new Error("Modulo by zero is not allowed");
            return a % value;
        default:
            return "Invalid operator";
    }
};

// tools ka metadata - usually by framework, but we can also do it ourselves
export const calculateTool = {
    type: "function",
    function: {
        name: "calculator",
        description:
            "A simple calculator that performs basic arithmetic operations",
        parameters: {
            type: "object",
            properties: {
                op: {
                    type: "string",
                    enum: ["+", "-", "*", "/", "%"],
                    description: "The operator to use",
                },
                a: { type: "number", description: "The first number" },
                b: { type: "number", description: "The second number" },
            },
        },
    },
};
