export interface DialogType {
    // 头像
    avatar: string;
    // 对话ID
    dialogId: number;
    // 是否阅读
    read: boolean;
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
    message: string;
    message_type: MessageType;
    time: number;
    direction?: MessageDirection;
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
