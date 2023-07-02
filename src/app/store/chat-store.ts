import {create} from "zustand";
import {persist} from "zustand/middleware";
import {Dialog, Message, MessageDirection, MessageRole, MessageType, SessionConfig} from "@/types/chat";
import {GptVersion} from "@/app/constants";

interface ChatStore {
    id: number;
    sessions: ChatSession[];
    currentSessionIndex: number;
    openSession: () => ChatSession;
    selectSession: (index: number) => void;
    deleteSession: (index: number) => void;
    currentSession: () => ChatSession;
    onSendMessage: (message: Message) => void;
    updateCurrentSession: (updater: (session: ChatSession) => void) => void;
}

export interface ChatSession {
    // 会话ID
    id: number;
    // 对话框体
    dialog: Dialog;
    // 对话消息
    messages: Message[];
    // 会话配置
    config: SessionConfig;
    // 清除会话的索引
    clearContextIndex?: number;
}

function createChatSession(): ChatSession {
    return {
        id: 0,
        dialog: {
            avatar: "/role/wali.png",
            title: "新的对话",
            count: 0,
            subTitle: "请问有什么需要帮助的吗？",
            timestamp: new Date().getTime(),
        },
        messages: [
            {
                avatar: "/role/wali.png",
                content: "请问有什么需要帮助的吗？",
                message_type: MessageType.Text,
                time: Date.now(),
                direction: MessageDirection.Receive,
                role: MessageRole.system
            }
        ],
        clearContextIndex: undefined,
        config: {
            gptVersion: GptVersion.GPT_3_5_TURBO,
        }
    };
}

export const userChatStore = create<ChatStore>()(
    persist(
        (set, get) => ({
            // 属性赋值
            id: 0,
            sessions: [createChatSession()],
            currentSessionIndex: 0,

            // 开启会话
            openSession() {
                const session = createChatSession();
                // 每开启一个会话，就对应设置一个对话ID
                set(() => ({id: get().id + 1}));
                session.id = get().id;

                // 保存创建的会话，到 sessions 数组中
                set((state) => ({
                    currentSessionIndex: session.id,
                    // 在数组头部插入数据
                    sessions: [session].concat(state.sessions),
                }));

                return session;
            },

            // 选择会话
            selectSession(index: number) {
                set({
                    currentSessionIndex: index,
                });
            },

            // 删除会话
            deleteSession(index: number) {
                const count = get().sessions.length;
                const deleteSession = get().sessions.at(index);

                if (!deleteSession) return;

                const sessions = get().sessions.slice();
                sessions.splice(index, 1);

                const currentIndex = get().currentSessionIndex;
                let nextIndex = Math.min(
                    currentIndex - Number(index < currentIndex),
                    sessions.length - 1,
                );

                if (count === 1) {
                    nextIndex = 0;
                    sessions.push(createChatSession());
                }

                set(() => ({
                    currentSessionIndex: nextIndex,
                    sessions,
                }));

            },

            // 当前会话
            currentSession() {
                let index = get().currentSessionIndex;
                const sessions = get().sessions;
                if (index < 0 || index >= sessions.length) {
                    index = Math.min(sessions.length - 1, Math.max(0, index));
                    set(() => ({currentSessionIndex: index}));
                }
                return sessions[index];
            },

            // 发送消息
            onSendMessage(message: Message) {
                const session = get().currentSession();
                get().updateCurrentSession((session) => {
                    session.messages = session.messages.concat(message);
                });
                // 后续调用接口，将消息发送给服务端

            },

            // 更新当前会话
            updateCurrentSession(updater) {
                const sessions = get().sessions;
                const index = get().currentSessionIndex;
                updater(sessions[index]);
                set(() => ({sessions}))
            }
        }),
        {
            name: "chat-store"
        }
    ),
);