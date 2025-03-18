import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import MyButton from "./test/test.component";

function App() {
    const [count, setCount] = useState(0);

    const info = {
        name: "COST",
        age: 20,
    };
    const handTest = (name: string) => {
        alert(name);
    };
    const [listFullName, setListFullName] = useState([
        "COST",
        "COST1",
        "COST2",
    ]);
    const address = "Istanbul";
    return (
        <>
            <MyButton
                info={info}
                address={address}
                hoidanit={handTest}
                listFullName={listFullName}
                setListFullName={setListFullName}
            />
            <ul>
                {listFullName.map((item, index) => {
                    return <li key={index}>toi la {item}</li>;
                })}
            </ul>
        </>
    );
}

export default App;
