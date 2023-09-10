import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.scss'
import QuestionCard from '../../../components/QuestionCard'
import { useDebounceFn, useRequest, useTitle } from 'ahooks'
import { Empty, Spin, Typography } from 'antd'
import ListSearch from '../../../components/ListSearch'
import { LIST_PAGE, LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../../constant'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../../../services/question'

const List: FC = () => {
    useTitle('问卷 - 我的问卷')

    const [list, setList] = useState([])

    const [page, setPage] = useState(LIST_PAGE)

    const [total, setTotal] = useState(0)

    const [searchParams] = useSearchParams()
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

    const hasMoreData = total > list.length

    const containerRef = useRef<HTMLDivElement>(null)

    // 标记是否已经开始加载，防抖有延迟时间
    const [started, setStarted] = useState(false)

    const { run: load, loading } = useRequest(
        async () => {
            const data = await getQuestionListService({
                page,
                pageSize: LIST_PAGE_SIZE,
                keyword,
            })
            return data
        },
        {
            manual: true,
            onSuccess: res => {
                const { list: l = [], total = 0 } = res
                setTotal(total)
                setList(list.concat(l))
                setPage(page + 1)
            },
        }
    )

    const { run: tryLoadMore } = useDebounceFn(
        () => {
            const elem = containerRef.current
            if (elem == null) return

            const domRect = elem.getBoundingClientRect()
            if (domRect == null) return

            const { bottom } = domRect
            // 未露出
            if (bottom > document.body.clientHeight) return

            // 真正加载数据
            load()

            setStarted(true)
        },
        { wait: 1000 }
    )

    // 页面加载，url参数变化时，触发加载
    useEffect(() => {
        tryLoadMore()
    }, [searchParams])

    // 监听页面滚动，要尝试触发加载
    useEffect(() => {
        if (!hasMoreData) return
        // 防抖
        window.addEventListener('scroll', tryLoadMore)
        return () => {
            window.removeEventListener('scroll', tryLoadMore)
        }
    }, [searchParams, hasMoreData])

    // 重制
    useEffect(() => {
        setList([])
        setPage(LIST_PAGE)
        setStarted(false)
        setTotal(0)
    }, [keyword])

    // 加载更多
    const LoadMoreContentElem = useMemo(() => {
        if (loading || !started) return <Spin />
        if (total === 0) return <Empty description="暂无数据" />
        if (!hasMoreData) return <span>没有更多了</span>
        return <span>开始加载下一页</span>
    }, [started, loading, hasMoreData])

    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Typography.Title level={3}>我的问卷</Typography.Title>
                </div>
                <div className={styles.right}>
                    <ListSearch />
                </div>
            </div>

            <div className={styles.content}>
                {!!list.length &&
                    list.map((item: any) => {
                        const { _id } = item
                        return <QuestionCard key={_id} {...item} />
                    })}
            </div>

            <div className={styles.footer}>
                <div ref={containerRef}>{LoadMoreContentElem}</div>
            </div>
        </>
    )
}
export default List
