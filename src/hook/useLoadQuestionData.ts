import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

const useLoadQuestionData = () => {
    const { id = '' } = useParams()

    const getData = async () => await getQuestionService(id)

    const { loading, data, error } = useRequest(getData)

    return { loading, data, error }
}

export default useLoadQuestionData
