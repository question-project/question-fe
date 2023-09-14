import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentsReducer'

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
        const { title, componentList = [] } = data
        dispatch(resetComponents({ componentList }))
    }, [data])

    useEffect(() => {
        run(id)
    }, [id])

    return { loading, error }
}

export default useLoadQuestionData
