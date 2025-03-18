import { useState } from "react";

interface IProps {
    address: string;
    info: {
        name: string;
        age: number;
    };
    hoidanit: (name: string) => void;
    listFullName: string[];
    setListFullName: (value: string[]) => void;
}

function MyButton(props: IProps) {
    const { hoidanit, listFullName, setListFullName } = props;

    const [fullName, setFullName] = useState("");

    return (
        <div>
            <div>nhap du lieu</div>
            <input
                value={fullName}
                type="text"
                onChange={(event) => {
                    setFullName(event.target.value);
                }}
            />
            <br />
            <button
                onClick={() => {
                    setListFullName([...listFullName, fullName]);
                    setFullName("");
                }}
            >
                Save
            </button>
            <div>toi la {fullName}</div>
        </div>
    );
}
export default MyButton;
