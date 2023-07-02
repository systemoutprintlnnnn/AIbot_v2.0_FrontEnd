import styles from './dialog-message-item.module.scss'
import {Avatar, Space} from "antd";
import {Message, MessageDirection, MessageRole} from "@/types/chat";
import { RefObject } from 'react';
import { Markdown } from '@/app/components/markdown/markdown';

/**
 * 用对象封装属性，方便扩展
 */
interface Props {
    message: Message;
    parentRef?: RefObject<HTMLDivElement>;
}

/**
 * 对话面板消息元素
 * @constructor
 */
export function DialogMessageItem(props: Props) {
    const {message, parentRef} = props;
    const isUser = message.role === MessageRole.user;
    return <>
        <div
            className={
                isUser ? styles["chat-message-user"] : styles["chat-message"]
            }
        >
            <div className={styles["chat-message-container"]}>
                <div className={styles["chat-message-avatar"]}>
                    <Avatar shape="square" src={message.avatar} size={40} style={{
                        borderRadius: '4px',
                        backgroundColor: '#f6f6f6'
                    }}/>
                </div>
                <div className={styles["chat-message-item"]}>
                    <Markdown
                        content={message.content}
                        fontSize={14}
                        parentRef={parentRef}
                        defaultShow={false}
                    />
                </div>
            </div>
        </div>
    </>
}