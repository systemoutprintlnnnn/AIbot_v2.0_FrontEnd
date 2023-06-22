import styles from "./dialog-list.module.scss";
import {DialogListItem} from "@/app/components/dialog/dialog-list-item";
import {DialogType} from "@/types/chat";
import {DialogResizeableSidebar} from "@/app/components/dialog/dialog-resizeable-sidebar";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

/**
 * 对话框列表
 */
export function DialogList() {
    const [dialogs, setDialogs] = useState<DialogType[]>([]);
    const [selected, setSelected] = useState<DialogType>();
    const navigate = useNavigate();

    return (
        // DialogResizeableSidebar 用于调整对话栏的大小
        <DialogResizeableSidebar>
            {/*头部操作*/}
            <div className={styles["dialog-head"]}>
                <div className={styles["dialog-search-box"]}><input type="text" placeholder="搜索"/></div>
                <div className={styles["dialog-search-add"]} onClick={() => {

                    // 心里咨询
                    const dialog01: DialogType = {
                        avatar: '/role/bugstack.png',
                        dialogId: Math.floor(Math.random() * 900) + 100,
                        read: true,
                        subTitle: '有什么可以帮你的吗？',
                        timestamp: Date.now(),
                        title: '直接对话',
                        count: Math.floor(Math.random() * 90)
                    };

                    const dialog02: DialogType = {
                        avatar: '/role/interview.png',
                        dialogId: Math.floor(Math.random() * 900) + 100,
                        read: true,
                        subTitle: '请回答一下Java的基础类型有哪些？',
                        timestamp: Date.now(),
                        title: '面试官',
                        count: Math.floor(Math.random() * 90)
                    };

                    const dialog03: DialogType = {
                        avatar: '/role/psychological.png',
                        dialogId: Math.floor(Math.random() * 900) + 100,
                        read: true,
                        subTitle: '吹灭别人的灯，不能照亮自己',
                        timestamp: Date.now(),
                        title: '心里咨询',
                        count: Math.floor(Math.random() * 90)
                    };

                    const idx = Math.floor(Math.random() * 3) + 1;
                    if (1 === idx) {
                        dialogs.unshift(dialog01);
                        setSelected(dialog01);
                    }

                    if (2 === idx) {
                        dialogs.unshift(dialog02);
                        setSelected(dialog02);
                    }

                    if (3 === idx) {
                        dialogs.unshift(dialog03);
                        setSelected(dialog03);
                    }

                }}></div>
            </div>
            {/*对话列表*/}
            <div className={styles["dialog-list"]}>
                {dialogs.map((dialog, index) => (
                    <DialogListItem
                        key={dialog.dialogId}
                        dialog={dialog}
                        selected={selected?.dialogId === dialog.dialogId}
                        onClick={() => {
                            // 点击时跳转到对应的界面，并传递必要参数信息
                            navigate(`/chat/${dialog.dialogId}`, {state: {title: dialog.title}})
                            setSelected(dialog)
                        }}
                    />
                ))}
            </div>
        </DialogResizeableSidebar>
    );

}