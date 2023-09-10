import axios, { ResDataType } from './ajax'
import {
    LIST_PAGE_PARAM_KEY,
    LIST_PAGE_SIZE_PARAM_KEY,
    LIST_SEARCH_PARAM_KEY,
} from '../constant/index'

export const getQuestionService = async (id: string): Promise<ResDataType> => {
    const url = `/api/question/${id}`
    const data = (await axios.get(url)) as ResDataType
    return data
}

// 创建问卷
export const createQuestionService = async (): Promise<ResDataType> => {
    const url = '/api/question'
    const data = (await axios.post(url)) as ResDataType
    return data
}

// 问卷列表
export type SearchOption = {
    [LIST_SEARCH_PARAM_KEY]: string
    isStar: boolean
    isDeleted: boolean
    [LIST_PAGE_PARAM_KEY]: number
    [LIST_PAGE_SIZE_PARAM_KEY]: number
}

// Partial 表示 为 SearchOption 的一部分
export const getQuestionListService = async (params: Partial<SearchOption>): Promise<any> => {
    const url = '/api/question'
    const data = await axios.get(url, { params })
    return data
}
