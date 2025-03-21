import {
    Input,
    Modal,
    notification,
    Button,
    Checkbox,
    Form,
    FormProps,
    Select,
    InputNumber,
} from "antd";
import { useState } from "react";
interface IProps {
    isCreateModalOpen: boolean;
    SetIsCreateModalOpen: (value: boolean) => void;
    fetchUser: any;
}
const CreateModal = (props: IProps) => {
    const { isCreateModalOpen, SetIsCreateModalOpen, fetchUser } = props;

    const { Option } = Select;
    const [form] = Form.useForm();

    const handleCloseModel = () => {
        SetIsCreateModalOpen(false);
        form.resetFields();
    };
    // create user
    const onFinish = (values: any) => {
        const url = "http://localhost:8000/api/v1/users";

        const accessToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJfaWQiOiI2N2M5MDNhOWE1ODNmYTM4NmQwZjI4NzkiLCJuYW1lIjoiaSBhbSBhZG1pbiIsInJvbGUiOnsiX2lkIjoiNjdjOTAzYTlhNTgzZmEzODZkMGYyODc0IiwibmFtZSI6IlNVUEVSIEFETUlOIn0sImlhdCI6MTc0MTc5MjM1NiwiZXhwIjoxNzQyNjU2MzU2fQ.iqXvFlSL-uwkyNFYBQ1t1d-2ebuSMDyXqPvGt5gaCV8";
        let { name, email, password, age, gender, address, role } = values;
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

    return (
        <Modal
            title="ADD USER"
            open={isCreateModalOpen}
            onOk={() => {
                form.submit();
            }}
            onCancel={() => {
                handleCloseModel();
            }}
            maskClosable={false}
        >
            <Form
                name="basic"
                onFinish={onFinish}
                layout="vertical"
                form={form}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Age"
                    name="age"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[{ required: true }]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        // onChange={onGenderChange}
                        allowClear
                    >
                        <Option value="MALE">male</Option>
                        <Option value="FEMALE">female</Option>
                        <Option value="OTHER">other</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Role"
                    rules={[{ required: true }]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        // onChange={onGenderChange}
                        allowClear
                    >
                        <Option value="ADMIN">ADMIN</Option>
                        <Option value="USER">USER</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
            </Form>
            {/* <div>
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
            </div> */}
        </Modal>
    );
};

export default CreateModal;
