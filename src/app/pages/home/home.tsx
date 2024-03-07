"use client";

import styles from "./home.module.scss";
import {SideBar} from "../../components/sidebar/sidebar";
import {DialogMessage} from "@/app/components/dialog/dialog-message";

import {
    HashRouter as Router,
    Routes,
    Route,
    useLocation
} from "react-router-dom";
import dynamic from "next/dynamic";
import {Path} from "@/app/constants";

import {useAppConfig} from "../../store/config";
import {RoleDetail} from "@/app/components/role/role-detail";
import {useAccessStore} from "@/app/store/access";
import {useEffect} from "react";
import {authorize} from "@/apis";

const Chat = dynamic(async () => (await import("../chat/chat")).Chat);
const Role = dynamic(async () => (await import("../role/role")).Role);
const Auth = dynamic(async () => (await import("../auth/auth")).Auth);

function Screen() {
    const config = useAppConfig();
    const access = useAccessStore();
    const location = useLocation();
    // const isAuthPath = location.pathname === '/auth';
    const isAuthorized = access.isAuthorized()
    console.log("home: ", isAuthorized)
    useEffect(() => {
        const fetchAuthorization = async () => {
            const response = await authorize(access.token);
            const data = await response.json()
            console.log("token校验：",data.code)
            const isAuthorized = data.code == 200;
            console.log("token校验结果：",isAuthorized)
            access.setAuthorizationStatus(isAuthorized);
        };
        fetchAuthorization();
    }, [access.token]); // 当 token 发生变化时重新发送授权请求

    return (
        <div className={`${config.tightBorder ? styles["tight-container"] : styles.container}`}>
            {!isAuthorized ? (
                // {true ? (
                <Auth/>
            ) : (
                <>
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
                </>
            )}
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