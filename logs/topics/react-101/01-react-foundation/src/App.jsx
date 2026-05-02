import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);
    // when function is given in useState default param it is called a LAZY-STATE Initialisation
    // count => value, setCount => funct

    // react ki bhasha functions = hook
    // 2 popular - useState & useEffect

    const increase = () => {
        setCount(count + 1);
        console.log(count);
    };
    return (
        <>
            <h1>Still Alive, Still Breathing.</h1>
            <h1>Value = {count}</h1>
            <button onClick={increase}>Click Me</button>
        </>
    );
}

export default App;
