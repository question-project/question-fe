import { Input } from 'antd'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../../constant'

const ListSearch = () => {
    const nav = useNavigate()
    const { pathname } = useLocation()
    const [value, setValue] = useState('')
    const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)

    const [searchParams] = useSearchParams()

    useEffect(() => {
        const newVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
        setValue(newVal)
    }, [searchParams])

    const onSearch = (value: string) => {
        nav({
            pathname,
            search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
        })
    }

    return (
        <Input.Search
            allowClear
            placeholder="输入关键字"
            onSearch={onSearch}
            style={{ width: '260px' }}
            size="large"
            onChange={onChange}
            value={value}
        />
    )
}
export default ListSearch
