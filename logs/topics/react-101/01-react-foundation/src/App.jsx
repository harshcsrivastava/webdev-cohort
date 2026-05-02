import { useEffect, useState } from "react";

function App() {
    const [posts, setPosts] = useState([]);
    const [status, setStatus] = useState("idle");
    const [seconds, setSeconds] = useState(10);

    // useEffect(() => {

    //     return () => {
    //cleanup - memory ye hold nhi rakhna, deleted the reference like in websocketd
    // Without the cleanup, if the component unmounted or re-rendered, the interval would keep running in the background, possibly
    // updating state on an unmounted component → leading to warnings or wasted resources.
    //     }
    // }, [dependency-array])
    // It runs on component mount

    useEffect(() => {
        const timerId = setInterval(() => {
            setSeconds((current) => Math.max(current - 1, 0));
        }, 1000);
        return () => {
            //cleanup
            clearInterval(timerId);
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        async function loadPost() {
            try {
                setStatus("loading");
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/posts?_limit=5",
                    { signal: controller.signal },
                );
                const data = await response.json();

                setPosts(data);
                setStatus("Success");
            } catch (error) {
                // if error aya then
                setStatus("Error");
            }
        }

        loadPost();

        return () => {
            // user kisi aur page pe chala gya hai, to component unmount hogya, lekin request chli gyi and data me save hogya to component ko mana krta.
            controller.abort();
        };
    }, []);

    // if(status){
    //     return <LoadingComponent/>
    // }

    return (
        <>
            <h1>Still Alive, Still Breathing.</h1>
            <h3>{seconds}</h3>
        </>
    );
}

export default App;
