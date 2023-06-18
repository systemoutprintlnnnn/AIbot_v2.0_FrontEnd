import {DialogItem} from "@/app/components/dialog/dialog-item";
import {DialogType} from "@/types/chat";
import {DialogResizeableSidebar} from "@/app/components/dialog/dialog-resizeable-sidebar";
import {useState} from "react";

/**
 * 对话框列表
 */
export function DialogList() {
    const [dialogs, setDialogs] = useState<DialogType[]>([]);
    const [selected, setSelected] = useState<DialogType>();

    // 测试数据
    const dialog01: DialogType = {
        avatar: 'https://bugstack.cn/images/system/xingqiu.png',
        dialogId: 123,
        read: true,
        subTitle: '写个java冒泡排序?',
        timestamp: Date.now(),
        title: '普通对话',
        count: 1
    };

    // 测试数据
    const dialog02: DialogType = {
        avatar: 'https://bugstack.cn/images/system/xingqiu.png/100*100',
        dialogId: 124,
        read: true,
        subTitle: 'Hello, how are you?',
        timestamp: Date.now(),
        title: '面试官',
        count: 0
    };

    dialogs.push(dialog01);
    dialogs.push(dialog02);

    return (
        // DialogResizeableSidebar 用于调整对话栏的大小
        <DialogResizeableSidebar>
            <div>
                {/*循环遍历数据，当有数据变更时会自动刷新到页面*/}
                {dialogs.map((dialog, index) =>(
                    <DialogItem
                        key={dialog.dialogId}
                        dialog={dialog}
                        selected={selected?.dialogId === dialog.dialogId}
                        onClick={() => {
                            alert("点击对话");
                        }}
                    />
                ))}
            </div>
        </DialogResizeableSidebar>
    );

}