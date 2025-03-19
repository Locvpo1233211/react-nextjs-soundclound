import { Input, Modal, notification } from "antd";
import { set } from "mongoose";
import { useEffect, useState } from "react";
interface IProps {
    isUpdateModalOpen: boolean;
    SetIsUpdateModalOpen: (value: boolean) => void;
    fetchUser: any;
    isUser: any;
    setIsUser: any;
}
const UpdateUserModal = (props: IProps) => {
    const {
        isUpdateModalOpen,
        SetIsUpdateModalOpen,
        fetchUser,
        isUser,
        setIsUser,
    } = props;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [id, setId] = useState("");
    console.log("nameaa", isUser);

    useEffect(() => {
        if (isUser) {
            setName(isUser.name);
            setEmail(isUser.email);
            setAge(isUser.age);
            setGender(isUser.gender);
            setAddress(isUser.address);
            setRole(isUser.role);
            setId(isUser._id);
        }
    }, [isUser]);

    const handleOk = () => {
        const url = "http://localhost:8000/api/v1/users/" + id;

        const accessToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJfaWQiOiI2N2M5MDNhOWE1ODNmYTM4NmQwZjI4NzkiLCJuYW1lIjoiaSBhbSBhZG1pbiIsInJvbGUiOnsiX2lkIjoiNjdjOTAzYTlhNTgzZmEzODZkMGYyODc0IiwibmFtZSI6IlNVUEVSIEFETUlOIn0sImlhdCI6MTc0MTc5MjM1NiwiZXhwIjoxNzQyNjU2MzU2fQ.iqXvFlSL-uwkyNFYBQ1t1d-2ebuSMDyXqPvGt5gaCV8";

        let user = {
            name,
            email,

            age,
            gender,
            address,
            role,
        };

        console.log("name", user);

        const updateData = async () => {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            console.log("data", data);
            if (data.data) {
                notification.success({
                    message: "UPDATE USER SUCCESS",
                });
                SetIsUpdateModalOpen(false);
                handleCloseModel();
                await fetchUser();
            } else {
                notification.error({
                    message: "UPDATE USER FAIL",

                    description: data.message,
                });
            }
        };
        updateData();
    };

    const handleCloseModel = () => {
        SetIsUpdateModalOpen(false);
        setName("");
        setEmail("");

        setPassword("");
        setAge("");
        setGender("");
        setAddress("");
        setRole("");
        setIsUser(null);
    };

    return (
        <Modal
            title="UPDATE USER"
            open={isUpdateModalOpen}
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

export default UpdateUserModal;
