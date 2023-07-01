import {useParams} from 'react-router-dom';
import {useLocation} from "react-router-dom";
import styles from "./dialog-message.module.scss";
import {DialogMessageItem} from "@/app/components/dialog/dialog-message-item";
import {Dialog, Message, MessageDirection, MessageRole, MessageType} from "@/types/chat";
import {useEffect, useState} from "react";
import {DialogMessageInput} from "@/app/components/dialog/dialog-message-input";
import {userChatStore} from "@/app/store/chat-store";

interface Props {
    id: string,
    title: string
}

/**
 * 聊天面板
 * @constructor
 */
export function DialogMessage() {
    const {id} = useParams();
    const chatStore = userChatStore();
    const currentSession = chatStore.currentSession();
    const [messages, setMessages] = useState<Message[]>([]);
    const location = useLocation();
    const title = location.state?.title || "新的对话";

    // 也可以通过接口查询数据
    const fetchDetail = async () => {
        const session = await chatStore.currentSession();
        const messages = session?.messages;
        setMessages(messages);
    }

    // 输入事件
    const onEnter = (value: string) => {
        const newMessage = {
            avatar: "/role/runny-nose.png",
            content: value,
            message_type: MessageType.Text,
            time: Date.now(),
            direction: MessageDirection.Send,
            role: MessageRole.user
        }
        setMessages([...messages, newMessage]);
        chatStore.onSendMessage(newMessage);
    }

    // 刷新数据
    useEffect(() => {
        fetchDetail().then(r => {
        });
    }, [id]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>{title}</div>
            <div className={styles.scroll}>
                {messages?.map(
                    (message, index) => <DialogMessageItem message={message} key={index}/>)
                }
            </div>
            <DialogMessageInput onEnter={onEnter}/>
        </div>
    );

}