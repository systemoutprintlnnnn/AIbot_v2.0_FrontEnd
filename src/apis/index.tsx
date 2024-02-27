import {MessageRole} from "@/types/chat";
import {GptVersion} from "@/app/constants";

const PUBLIC_API_HOST_URL = process.env.NEXT_PUBLIC_API_HOST_URL || "http://localhost:8090"
const host = 'https://console-mock.apipost.cn/mock/072fa474-ab36-4650-a798-a57e8223e6e6'

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
    model: GptVersion
    stream: boolean
}) => {
    const chat = PUBLIC_API_HOST_URL + "/openai/chat"
    const streamChat = PUBLIC_API_HOST_URL + "/openai/streamChat"
    // const streamChat = "https://proxy.qiheweb.com/v1/chat/completions"

    return fetch(data.stream ? streamChat : chat, {
        method: 'post',
        headers: {
            // b8b6 后续用于写入 token 加密信息
            Authorization: "Bearer sk-xzMBtdZG3OgKIZIT5532FcCdB7514051B469394d57F82a1e",
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
}

