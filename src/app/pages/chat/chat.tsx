import styles from './chat.module.scss';
import {DialogList} from "@/app/components/dialog/dialog-list";

export function Chat() {
    return (
        <div className={styles["chat"]}>
            <DialogList />
        </div>
    );
}