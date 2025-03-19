import { Input, Modal, notification } from "antd";
import { useState } from "react";
interface IProps {
    isCreateModalOpen: boolean;
    SetIsCreateModalOpen: (value: boolean) => void;
    fetchUser: any;
}
const CreateModal = (props: IProps) => {
    const { isCreateModalOpen, SetIsCreateModalOpen, fetchUser } = props;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    const handleOk = () => {
        const url = "http://localhost:8000/api/v1/users";

        const accessToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJfaWQiOiI2N2M5MDNhOWE1ODNmYTM4NmQwZjI4NzkiLCJuYW1lIjoiaSBhbSBhZG1pbiIsInJvbGUiOnsiX2lkIjoiNjdjOTAzYTlhNTgzZmEzODZkMGYyODc0IiwibmFtZSI6IlNVUEVSIEFETUlOIn0sImlhdCI6MTc0MTc5MjM1NiwiZXhwIjoxNzQyNjU2MzU2fQ.iqXvFlSL-uwkyNFYBQ1t1d-2ebuSMDyXqPvGt5gaCV8";

        let user = {
            name,
            email,
            password,
            age,
            gender,
            address,
            role,
        };
        console.log("name", user);

        const fetchData = async () => {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            if (data.data) {
                notification.success({
                    message: "ADD USER SUCCESS",
                });
                SetIsCreateModalOpen(false);
                handleCloseModel();
                await fetchUser();
            } else {
                notification.error({
                    message: "ADD USER FAIL",

                    description: data.error,
                });
            }
        };
        fetchData();
    };

    const handleCloseModel = () => {
        SetIsCreateModalOpen(false);
        setName("");
        setEmail("");

        setPassword("");
        setAge("");

        setGender("");
        setAddress("");
        setRole("");
    };

    return (
        <Modal
            title="ADD USER"
            open={isCreateModalOpen}
            onOk={handleOk}
            onCancel={() => {
                handleCloseModel();
            }}
            maskClosable={false}
        >
            <div>
                <label htmlFor="">name</label>
                <Input
                    placeholder="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />{" "}
            </div>
            <div>
                <label htmlFor="">email</label>
                <Input
                    placeholder="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />{" "}
            </div>
            <div>
                <label htmlFor="">password</label>
                <Input
                    placeholder="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />{" "}
            </div>
            <div>
                <label htmlFor="">age</label>
                <Input
                    placeholder="age"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                />{" "}
            </div>
            <div>
                <label htmlFor="">Gender</label>
                <Input
                    placeholder="Gender"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                />{" "}
            </div>
            <div>
                <label htmlFor="">Adress</label>
                <Input
                    placeholder="Adress"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />{" "}
            </div>

            <div>
                <label htmlFor="">Role</label>
                <Input
                    placeholder="Role"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                />{" "}
            </div>
        </Modal>
    );
};

export default CreateModal;
