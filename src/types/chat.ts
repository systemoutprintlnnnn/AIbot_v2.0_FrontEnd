import {GptVersion} from "@/app/constants";

//经过GracefulResponse处理的通用响应

export interface GracefulResponse {
    status: {
        code: number
        msg: string
    };
    payload: JSON;
}

export interface ChatResponse {
    id: string;
    object: string;
    model: string;
    choices: {
        index: number;
        message: {
            role: string;
            content: string;
        }
        finishReason: string;
    }[];
    created: string;
    usage: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    }
    system_fingerprint: string;
}

export interface ChatStreamResponse {
    id: string;
    choices: {
        delta: {
            content: string;
        }
        logprobs: string;
        finishReason: string;
        index: number;
    }[];
    created: string;
    model: string;
    system_fingerprint: string;
    object: string;
}

export interface Dialog {
    // 头像
    avatar: string;
    // 小标题
    subTitle: string;
    // 对话最后时间
    timestamp: number;
    // 聊天头
    title: string;
    // 消息数
    count: number;
}

export interface Message {
    avatar: string;
    content: string;
    message_type: MessageType;
    time: number;
    direction?: MessageDirection;
    role: MessageRole;
    id: string;
    streaming?: boolean;
}

export interface SessionConfig {
    gptVersion: GptVersion;
}

export enum MessageRole {
    system = "system",
    user = "user",
    assistant = "assistant",
}

export enum MessageType {
    Link = "link",
    Pic = "pic",
    Text = "text",
}

export enum MessageDirection {
    Send = 0,
    Receive,
}
