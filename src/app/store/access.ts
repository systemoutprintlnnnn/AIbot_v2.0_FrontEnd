import {create} from "zustand";
import {persist} from "zustand/middleware";
import {login} from "@/apis";
import {VerifyState} from "@/app/constants";

export interface AccessControlStore {
    accessCode: string;
    token: string;
    accessCodeErrorMsgs: string;
    authorizationStatus: boolean;

    updateToken: (_: string) => void;
    updateCode: (_: string) => void;
    isAuthorized: () => boolean;
    login: () => Promise<string>;
    goToLogin: () => void;
    setAuthorizationStatus: (status: boolean) => void;
}

export const useAccessStore: any = create<AccessControlStore>()(
    persist(
        (set, get) => ({
            token: "",
            accessCode: "",
            accessCodeErrorMsgs: "",
            authorizationStatus: false, // 初始化为未授权状态
            updateCode(code: string) {
                set(() => ({accessCode: code}));
            },
            updateToken(token: string) {
                set(() => ({token}));
            },
            isAuthorized() {
                console.log("token", get().token);
                console.log("authorizationStatus", get().authorizationStatus);
                return get().authorizationStatus;
            },
            setAuthorizationStatus(status: boolean) {
                set(() => ({ authorizationStatus: status }));
            },
            goToLogin() {
                get().updateCode("");
                get().updateToken("");
            },
            async login() {
                const res = await login({
                    code: get().accessCode
                });
                //从Cookie中获取token
                const token = res.headers.get("satoken");
                const {data} = await res.json();
                console.log("data", data);
                console.log(data.accessToken)
                console.log(data.verifyCode)
                // 这里需要根据返回结果设置
                if (data.verifyCode === VerifyState.SUCCESS) {
                    console.log("登陆成功");
                    console.log(data.accessToken)
                    get().updateToken(data.accessToken);
                    set(() => ({accessCodeErrorMsgs: ""}));
                }
                if (data.verifyCode === VerifyState.FAIL) {
                    set(() => ({accessCodeErrorMsgs: "验证失败,请获取最新验证码"}));
                }
                if (data.verifyCode === VerifyState.EXPIRED) {
                    set(() => ({accessCodeErrorMsgs: "验证码已过期,请获取最新验证码"}));
                }
                if (data.verifyCode === VerifyState.NOT_EXIST) {
                    set(() => ({accessCodeErrorMsgs: "验证码不存在,请确认最新验证码"}));
                }
                if (data.verifyCode === VerifyState.ERROR) {
                    set(() => ({accessCodeErrorMsgs: "验证码错误,请确认最新验证码"}));
                }
                return data;
            },
        }),
        {
            name: "chat-access",
            version: 1,
        }
    )
);
