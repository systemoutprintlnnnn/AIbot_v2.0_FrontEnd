import {Button, Input} from "antd";
import styles from "./auth.module.scss";

import {useNavigate} from "react-router-dom";
import {useAccessStore} from "../../store/access";
import ChatGPTIcon from "../../icons/chatgpt.svg";

export function Auth() {
    const navigate = useNavigate();
    const access = useAccessStore();
    return (
        <div className={styles["auth-page"]}>

            <ChatGPTIcon/>
            <div className={styles["auth-title"]}>云问bot</div>
            <div className={styles["auth-sub-title"]}>
                学习AI开发、掌握AI部署、运用AI提效
            </div>
            <img
                src="https://yunwenbot.top/images/qrcode.jpg"
                style={{width: 250}}
            />
            <div className={styles["auth-tips"]}>
                扫码关注公众号【云问bot】，回复【验证码】获取访问验证码
            </div>

            <Input
                className={styles["auth-input"]}
                type="text"
                placeholder="在此处填写访问码"
                value={access.accessCode}
                onChange={(e) => {
                    access.updateCode(e.currentTarget.value);
                }}
                status={access.accessCodeErrorMsgs ? 'error' : ''}

            />
            {access.accessCodeErrorMsgs ?
                <span className={styles['auth-error']}>{access.accessCodeErrorMsgs}</span> : null}


            <div className={styles["auth-actions"]}>
                <Button type="primary" onClick={() => access.login()}>登录</Button>
                <Button type="text">稍后再说</Button>
            </div>
            <span className={styles["bold-large"]}>
        声明: 本平台始终拥护中国共产党的领导，坚持一个中国原则，坚决抵制任何反动言论，立志建设一个美好的网络环境。<br/>您如果在使用中出现不合规发言，平台将采取强制封号措施，为了您能正常使用平台功能请您在使用中理智文明发言!
      </span>
        </div>
    );
}
