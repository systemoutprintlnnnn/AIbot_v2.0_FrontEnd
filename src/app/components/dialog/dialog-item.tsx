import styles from './dialog-item.module.scss';
import {DialogType} from "@/types/chat";
import {Avatar, Badge, Button, Space} from 'antd';

interface Props {
    dialog: DialogType;
    selected: boolean;
    onClick: (dialog: DialogType) => void;
}

/**
 * 对话框列表对象元素
 * @constructor
 */
export function DialogItem(props: Props) {
    const {dialog, selected, onClick} = props;
    const date = new Date(dialog.timestamp);
    const timeString = date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
    return (
        <div className={`${styles.wrapper} ${selected ? styles.selected : ''}`} onClick={() => onClick(dialog)}>
            <div className={styles.left}>
                <Space size={24}>
                    {/* Badge 是 React 提供的组件，这里控制只有选中的才展示对话数 */}
                    <Badge count={props.selected ? dialog.count : 0} size={"small"} color={"#fca7a7"}>
                        <Avatar shape={"square"} src={dialog.avatar} size={40}/>
                    </Badge>
                </Space>
            </div>
            <div className={styles.right}>
                <div className={styles.line1}>
                    <p className={styles.title}>{dialog.title}</p>
                    <p className={styles.time}>{timeString}</p>
                </div>
                <div className={styles.line2}>
                    {dialog.subTitle}
                </div>
            </div>
        </div>
    );
}