import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
    createBrowserRouter,
    Link,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import UserPage from "./screens/users.page.tsx";
// import "./index.css";
//  ant design
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { link } from "fs";
import "./App.scss";
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
    {
        label: <Link to="/">Home</Link>,
        key: "Home",
        icon: <MailOutlined />,
    },
    {
        label: <Link to="/user">User</Link>,
        key: "User",
        icon: <AppstoreOutlined />,
    },
];
const Header = () => {
    const [current, setCurrent] = useState("Home");

    const onClick: MenuProps["onClick"] = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
};

//

const Layout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <h1>Footer</h1>
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <App /> },
            {
                path: "user",
                element: <UserPage />,
            },
            {
                path: "/tracks",
                element: <div>tracks aaa</div>,
            },
        ],
    },

    {
        path: "/tracks",
        element: <div>tracks aaa</div>,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
