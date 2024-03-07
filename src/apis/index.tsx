import {MessageRole} from "@/types/chat";
import {GptVersion} from "@/app/constants";
import {useAccessStore} from "@/app/store/access";

const PUBLIC_API_HOST_URL = process.env.NEXT_PUBLIC_API_HOST_URL || "http://localhost:8090"
const host = 'https://yunwenbot.top'

export const getRoleList = () => {
    // 从 apiPost mock 接口获取
    // return fetch(`${host}/role/list`).then((res) =>
    //     res.json()
    // );

    // 从本地 json 文件获取
    return fetch(`/prompts.json`).then((res) =>
        res.json()
    );
}

export const completions = (data: {
    messages: { content: string; role: MessageRole }[],
    model: GptVersion,
    stream: boolean
}, token: string) => {
    const chat = PUBLIC_API_HOST_URL + "/openai/chat"
    const streamChat = PUBLIC_API_HOST_URL + "/openai/streamChat"
    // const streamChat = "https://proxy.qiheweb.com/v1/chat/completions"

    return fetch(data.stream ? streamChat : chat, {
        method: 'post',
        headers: {
            //写入token
            satoken: token,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
}

/**
 * 登录鉴权接口
 * @param verifyCodeRequest
 */
export const login = (verifyCodeRequest: {
    code: string
    sessionId?: string
}) => {
    console.log(PUBLIC_API_HOST_URL)
    const accessState = useAccessStore.getState()
    const defaultSessionId = 'sessionId'
    const sessionId = verifyCodeRequest.sessionId || defaultSessionId
    return fetch(`${PUBLIC_API_HOST_URL}/auth/verifyCode`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ...verifyCodeRequest, sessionId })
    });
};

export const authorize = async (token: string) => {

    return await fetch(`${PUBLIC_API_HOST_URL}/auth/authorize`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            satoken: token
        }
    });
}

