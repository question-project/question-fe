import { useRequest } from 'ahooks'
import { SearchOption, getQuestionListService } from '../services/question'
import { useSearchParams } from 'react-router-dom'
import {
    LIST_PAGE_PARAM_KEY,
    LIST_PAGE_SIZE_PARAM_KEY,
    LIST_SEARCH_PARAM_KEY,
    LIST_PAGE_SIZE,
    LIST_PAGE,
} from '../constant'

const useLoadQuestionListData = (params?: Partial<SearchOption>) => {
    const { isStar, isDeleted } = params || {}

    const [searchParam] = useSearchParams()
    const {
        data = {},
        loading,
        error,
        // 手动刷新
        refresh,
    } = useRequest(
        async () => {
            const keyword = searchParam.get(LIST_SEARCH_PARAM_KEY) || ''
            const page = parseInt(searchParam.get(LIST_PAGE_PARAM_KEY) || '', 10) || LIST_PAGE
            const pageSize =
                parseInt(searchParam.get(LIST_PAGE_SIZE_PARAM_KEY) || '', 10) || LIST_PAGE_SIZE

            return await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize })
        },
        {
            // 刷新的依赖项
            refreshDeps: [searchParam],
        }
    )

    return { data, loading, error, refresh }
}

export default useLoadQuestionListData
