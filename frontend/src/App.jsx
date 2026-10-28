import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [entervalue, setEvalue] = useState("");
    const [fruit, setFruit] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/fruitlist").then((data) => {
            console.log(data);
            setFruit(data.data);
        });
    }, []);

    return (
        <div className="flex justify-center items-center flex-col bg-gray-200 text-shadow-black p-4 h-screen w-full">
            <input
                autoComplete="off"
                className=" p-4 w-2xl h-15 text-2xl border-2 border-black rounded-2xl focus:scale-105 duration-200 shadow-lg shadow-gray-400/50 "
                type="text"
                value={entervalue}
                onChange={(e) => {
                    setEvalue(e.target.value);
                }}
                required
            />
            <button
                className=" bg-sky-600/80 w-25 h-12 rounded-2xl p-2 mt-6 hover:bg-sky-600 hover:scale-105 cursor-pointer text-white shadow-lg shadow-sky-500/50 "
                onClick={async () => {
                    const response = await axios.post(
                        "http://localhost:5000/addfruit",
                        { entervalue },
                    );
                    setFruit((currentFruit) => [
                        ...currentFruit,
                        response.data,
                    ]);
                    setEvalue("");
                }}
            >
                Add
            </button>
            <ul className="m-10 text-2xl font-bold flex flex-col gap-4">
                {fruit.map((item) => (
                    <li key={item._id} className="flex items-center gap-4">
                        <span>{item.name}</span>
                        <button
                            type="button"
                            className="rounded-lg bg-red-600 px-3 py-1 text-base text-white hover:bg-red-700"
                            onClick={async () => {
                                const response = await axios.delete(
                                    `http://localhost:5000/fruit/${item._id}`,
                                );
                                setFruit(response.data);
                            }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
