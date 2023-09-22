import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentsReducer'
import { resetPageInfo } from '../store/pageInfoReducer'

const useLoadQuestionData = () => {
    const { id = '' } = useParams()

    const dispatch = useDispatch()

    const { loading, data, error, run } = useRequest(
        async (id: string) => {
            if (!id) throw new Error('没有问卷 id')
            return await getQuestionService(id)
        },
        { manual: true }
    )

    // 根据 data 设置 store
    useEffect(() => {
        if (!data) return
        const {
            title = '',
            desc = '',
            css = '',
            js = '',
            componentList = [],
            isPublished = false,
        } = data

        // 获取默认的 selectedId
        let selectedId = ''
        // 默认选中第一个组件
        if (componentList.length) {
            selectedId = componentList[0].fe_id
        }

        // 把 componentList 存储到 redux 中
        dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))
        // 将页面信息存储到 redux 中
        dispatch(resetPageInfo({ title, desc, js, css, isPublished }))
    }, [data])

    useEffect(() => {
        run(id)
    }, [id])

    return { loading, error }
}

export default useLoadQuestionData
