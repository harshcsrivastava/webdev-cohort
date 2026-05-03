import { useState } from "react";
import "./App.css";
import ManualForm from "./ManualForm";
import HookForm from "./HookForm";
function App() {
    const [tab, setTab] = useState(true);

    return (
        <>
            <button onClick={() => setTab(true)}>Manual</button>
            <br />
            <button onClick={() => setTab(false)}>Hook</button>
            <br />
            {tab ? <ManualForm /> : <HookForm />}
        </>
    );
}

export default App;
