import { useEffect, useState } from "react";
import {
    Space,
    Table,
    TableProps,
    Tag,
    Button,
    Modal,
    Input,
    notification,
} from "antd";
import { Value } from "sass";
interface IUser {
    email: string;
    name: string;
    role: string;
}
const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const url = "http://localhost:3030/api/v1/auth/login";

        const fetchData = async () => {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: "admin@gmail.com",
                    password: "123456",
                }),
            });
            const data = await response.json();
            console.log("dât", data);
        };
        fetchData();
    }, []);

    const accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJfaWQiOiI2N2M5MDNhOWE1ODNmYTM4NmQwZjI4NzkiLCJuYW1lIjoiaSBhbSBhZG1pbiIsInJvbGUiOnsiX2lkIjoiNjdjOTAzYTlhNTgzZmEzODZkMGYyODc0IiwibmFtZSI6IlNVUEVSIEFETUlOIn0sImlhdCI6MTc0MTc5MjM1NiwiZXhwIjoxNzQyNjU2MzU2fQ.iqXvFlSL-uwkyNFYBQ1t1d-2ebuSMDyXqPvGt5gaCV8";
    const url1 = "http://localhost:8000/api/v1/users/all";
    const fetchUser = async () => {
        const response = await fetch(url1, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        const data1 = await response.json();

        setListUser(data1.data.result);
    };
    fetchUser();
    const columns: TableProps<IUser>["columns"] = [
        {
            title: "Email",
            dataIndex: "email",
            render: (value) => {
                return <a>{value}</a>;
            },
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Role",
            dataIndex: "role",
        },
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };

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
                setIsModalOpen(false);
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

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleCloseModel = () => {
        setIsModalOpen(false);
        setName("");
        setEmail("");

        setPassword("");
        setAge("");

        setGender("");
        setAddress("");
        setRole("");
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <h2>User Table</h2>
                <Button type="primary" onClick={showModal}>
                    ADD USER
                </Button>
            </div>

            <Table columns={columns} dataSource={listUser} />
            <Modal
                title="ADD USER"
                open={isModalOpen}
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
            {/* <table>
                <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Role</th>
                </tr>
                {listUser.map((item: IUser, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.email}</td>
                            <td>{item.name}</td>
                            <td>{item.role}</td>
                        </tr>
                    );
                })}
            </table> */}
        </div>
    );
};
export default UserTable;
