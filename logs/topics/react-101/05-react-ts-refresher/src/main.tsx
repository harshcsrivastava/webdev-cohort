import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("my-react-container")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
