import {useLocation, useParams} from 'react-router-dom';
import styles from "./dialog-message.module.scss";
import {DialogMessageItem} from "@/app/components/dialog/dialog-message-item";
import {Message, MessageDirection, MessageRole, MessageType} from "@/types/chat";
import {useEffect, useState} from "react";
import {DialogMessageInput} from "@/app/components/dialog/dialog-message-input";
import {userChatStore} from "@/app/store/chat-store";
import userScrollToBottom from '@/app/hooks/useScrollToBottom';

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
    const {scrollRef, setAutoScroll, scrollToBottom} = userScrollToBottom();
    const title = location.state?.title || "新的对话";

    // 也可以通过接口查询数据
    const fetchDetail = async () => {
        const session = await chatStore.currentSession();
        const messages = session?.messages;
        setMessages(messages);
    }

    // 输入事件
    const onEnter = (value: string) => {
        const newMessage= chatStore.onSendMessage(value)
        setMessages([...messages, newMessage])
    }

    // 刷新数据
    useEffect(() => {
        fetchDetail().then(r => {
        });
    }, [id]);

    const clearContextIndex =
        (currentSession.clearContextIndex ?? -1) >= 0
            ? currentSession.clearContextIndex!
            : -1;

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>{title}</div>
            <div className={styles.scroll} ref={scrollRef}>
                {messages?.map(
                    (message, index) => {
                        const shouldShowClearContextDivider = index === clearContextIndex - 1;
                        return <>
                            <DialogMessageItem message={message} key={index} parentRef={scrollRef}/>
                            {shouldShowClearContextDivider && <ClearContextDivider/>}
                        </>
                    })
                }
            </div>
            <DialogMessageInput onEnter={onEnter}/>
        </div>
    );

}

/**
 * 清除上下文对话信息
 * @constructor
 */
function ClearContextDivider() {
    const chatStore = userChatStore();

    return (
        <div
            className={styles["clear-context"]}
            onClick={() =>
                chatStore.updateCurrentSession(
                    (session) => (session.clearContextIndex = undefined),
                )
            }
        >
            <div className={styles["clear-context-tips"]}>上下文已清除</div>
        </div>
    );
}