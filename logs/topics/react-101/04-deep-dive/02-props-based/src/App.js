    import React from "https://esm.sh/react@19.0.0";
import ReactDOM from "https://esm.sh/react-dom@19.0.0/client";

const Chai = (props) => {
    return React.createElement("div", { className: "container" }, [
        React.createElement("h1", null, props.name || "Hello React"),
        React.createElement("h2", null, props.chai || "Hello Chai"),
    ]);
};

const App = () => {
    return React.createElement("div", { className: "container" }, [
        React.createElement("h1", null, "Hello React"),
        // ✅ Correct way: call Chai component with props
        React.createElement(Chai, { name: "Chai", chai: "Masala Chai" }),
    ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
