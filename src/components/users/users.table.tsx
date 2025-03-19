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
    Popconfirm,
    PopconfirmProps,
    message,
} from "antd";
import { Value } from "sass";
import CreateModal from "./create.user.modal";
import UpdateUserModal from "./update.user.modal";
interface IUser {
    _id: string;
    email: string;
    name: string;
    role: string;
    age: number;
    gender: string;
    address: string;
}
const UserTable = () => {
    const [listUser, setListUser] = useState([]);

    const [isCreateModalOpen, SetIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, SetIsUpdateModalOpen] = useState(false);
    const [isUser, setIsUser] = useState<IUser | null>(null);

    useEffect(() => {
        fetchData();
        fetchUser();
    }, []);

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
    const confirm = async (user: IUser) => {
        const url = `http://localhost:8000/api/v1/users/${user._id}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        console.log("data", data);
        if (data.data.deleted === 1) {
            message.success("Delete success");
            fetchUser();
        }
    };

    const cancel: PopconfirmProps["onCancel"] = () => {};

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
        {
            title: "Action",
            render: (value, record) => {
                return (
                    <div>
                        <button
                            onClick={() => {
                                SetIsUpdateModalOpen(true);
                                setIsUser(record);
                            }}
                        >
                            edit
                        </button>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={() => {
                                confirm(record);
                            }}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];

    const showModal = () => {
        SetIsCreateModalOpen(true);
    };

    console.log("a", isUser);
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
            <CreateModal
                isCreateModalOpen={isCreateModalOpen}
                SetIsCreateModalOpen={SetIsCreateModalOpen}
                fetchUser={fetchUser}
            />

            <UpdateUserModal
                isUpdateModalOpen={isUpdateModalOpen}
                SetIsUpdateModalOpen={SetIsUpdateModalOpen}
                fetchUser={fetchUser}
                isUser={isUser}
                setIsUser={setIsUser}
            />
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
