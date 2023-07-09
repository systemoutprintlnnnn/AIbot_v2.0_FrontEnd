const host = 'https://console-mock.apipost.cn/mock/072fa474-ab36-4650-a798-a57e8223e6e6'

export const getRoleList = () => {
    // 从 apiPost mock 接口获取
    // return fetch(`${host}/role/list`).then((res) =>
    //     res.json()
    // );

    // 从本地 json 文件获取
    return fetch(`/prompts.json`).then((res) =>
        res.json()
    );
}

