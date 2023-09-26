import axios, { ResDataType } from './ajax'

export const getQuestionStatListService = async (
    questionId: string,
    opt: {
        page: number
        pageSize: number
    }
): Promise<ResDataType> => {
    return (await axios.get(`/api/stat/${questionId}`, { params: opt })) as ResDataType
}

// 获取组件统计数据汇总
export const getComponentStatService = async (
    questionId: string,
    componentId: string
): Promise<ResDataType> => {
    const url = `/api/stat/${questionId}/${componentId}`
    const data = (await axios.get(url)) as ResDataType
    return data
}
