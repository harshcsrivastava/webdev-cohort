import { useState } from "react";
export interface Todo {
    id: string;
    title: string;
    isCompleted: boolean;
}

const App = () => {
    const [curr, setCurr] = useState("");
    const [todos, setTodos] = useState<Todo[]>([]);

    function handleRemove(key: string) {
        setTodos((prev) => prev.filter((todo) => todo.id !== key));
    }

    function handleTodos() {
        todos.push({
            id: `${Date.now()}`,
            title: curr,
            isCompleted: false,
        });
        const newArray: Todo[] = [...todos];
        setTodos(newArray);
        setCurr("");
    }

    return (
        <div>
            <div>
                <input
                    onChange={(e) => setCurr(e.target.value)}
                    value={curr}
                    type="text"
                />
                <button onClick={handleTodos}>Add</button>
            </div>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.title}
                        <button onClick={() => handleRemove(todo.id)}>X</button>
                    </li>
                ))}                     
            </ul>
        </div>
    );
};

export default App;
