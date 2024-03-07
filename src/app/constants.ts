export enum Path {
    Home = "/",
    Chat = "/chat",
    Role = "/role"
}

export enum GptVersion {
    TEXT_DAVINCI_003 = "text-davinci-003",
    TEXT_DAVINCI_002 = "text-davinci-002",
    DAVINCI = "davinci",
    GPT_3_5_TURBO = "gpt-3.5-turbo",
    GPT_3_5_TURBO_16K = "gpt-3.5-turbo-16k",
    GPT_4 = "gpt-4",
    GPT_4_0125_PREVIEW = "gpt-4-0125-preview",
    GPT_4_1106_VISION_PREVIEW = "gpt-4-1106-vision-preview",
    GPT_4_32K = "gpt-4-32k",
}

export enum VerifyState {
    SUCCESS = 140,
    FAIL = 141,
    EXPIRED = 142,
    NOT_EXIST = 143,
    ERROR = 144,
}