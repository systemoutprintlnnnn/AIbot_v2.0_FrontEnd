import {DialogItem} from "@/app/components/dialog/dialog-item";
import {DialogType} from "@/types/chat";
import {DialogResizeableSidebar} from "@/app/components/dialog/dialog-resizeable-sidebar";
/**
 * 对话框列表
 */
export function DialogList() {

    const dialog: DialogType = {
        avatar: 'https://bugstack.cn/images/system/xingqiu.png',
        dialogId: 123,
        read: true,
        subTitle: 'Hello, how are you?',
        timestamp: Date.now(),
        title: 'John Doe',
    };

    return (
        <DialogResizeableSidebar>
            <div>
                <DialogItem dialog={dialog} selected={false} onClick={() => {
                    alert("点击对话");
                }}/>
            </div>
        </DialogResizeableSidebar>
    );

}