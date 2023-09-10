import axios, { ResDataType } from './ajax'

export const getUserInfoService = async (): Promise<ResDataType> => {
    const url = '/api/user/info'
    const data = (await axios.get(url)) as ResDataType
    return data
}

export const registerService = async (
    username: string,
    password: string,
    nickname?: string
): Promise<ResDataType> => {
    const url = '/api/user/register'
    const data = (await axios.post(url, { username, password, nickname })) as ResDataType
    return data
}

export const loginService = async (username: string, password: string): Promise<ResDataType> => {
    const url = '/api/user/login'
    const data = (await axios.post(url, { username, password })) as ResDataType
    return data
}
