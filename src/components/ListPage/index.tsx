import { Pagination } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import {
    LIST_PAGE,
    LIST_PAGE_PARAM_KEY,
    LIST_PAGE_SIZE,
    LIST_PAGE_SIZE_PARAM_KEY,
} from '../../constant'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
type PropsType = {
    total: number
}

const ListPage: FC<PropsType> = (props: PropsType) => {
    const { total } = props

    const [searchParam] = useSearchParams()
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)

    const nav = useNavigate()

    const { pathname } = useLocation()

    useEffect(() => {
        const page = parseInt(searchParam.get(LIST_PAGE_PARAM_KEY) || '', 10) || LIST_PAGE
        const pageSize =
            parseInt(searchParam.get(LIST_PAGE_SIZE_PARAM_KEY) || '', 10) || LIST_PAGE_SIZE
        setCurrent(page)
        setPageSize(pageSize)
    }, [searchParam])

    const onChange = (page: number, pageSize: number) => {
        searchParam.set(LIST_PAGE_PARAM_KEY, page.toString())
        searchParam.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
        nav({
            pathname,
            search: searchParam.toString(),
        })
    }
    return <Pagination current={current} pageSize={pageSize} total={total} onChange={onChange} />
}

export default ListPage
