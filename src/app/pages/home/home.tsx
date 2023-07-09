"use client";

import styles from "./home.module.scss";
import {SideBar} from "../../components/sidebar/sidebar";
import {DialogMessage} from "@/app/components/dialog/dialog-message";

import {
    HashRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import dynamic from "next/dynamic";
import {Path} from "@/app/constants";

import {useAppConfig} from "../../store/config";
import {RoleDetail} from "@/app/components/role/role-detail";

const Chat = dynamic(async () => (await import("../chat/chat")).Chat);
const Role = dynamic(async () => (await import("../role/role")).Role);

function Screen() {
    const config = useAppConfig();
    return (
        <div className={`${config.tightBorder ? styles["tight-container"] : styles.container}`}>
            {/* 工具菜单 */}
            <SideBar/>

            {/* 路由地址 */}
            <div className={styles["window-content"]}>
                <Routes>
                    <Route path={Path.Home} element={<Chat/>}/>
                    <Route path={Path.Chat} element={<Chat/>}>
                        <Route path=":id" element={<DialogMessage/>}/>
                    </Route>
                    <Route path={Path.Role} element={<Role/>}>
                        <Route path=":id" element={<RoleDetail/>}/>
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export function Home() {
    return (
        <Router>
            <Screen/>
        </Router>
    );
}