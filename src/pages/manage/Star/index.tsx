import React, { FC } from 'react'
import styles from './index.module.scss'
import { useTitle } from 'ahooks'
import { Empty, Typography } from 'antd'
import QuestionCard from '../../../components/QuestionCard'
import ListSearch from '../../../components/ListSearch'
import useLoadQuestionListData from '../../../hook/useLoadQuestionListData'
import ListPage from '../../../components/ListPage'

const Star: FC = () => {
    useTitle('问卷 - 星标问卷')

    const { data, loading } = useLoadQuestionListData({ isStar: true })

    const { list = [], total } = data

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Typography.Title level={3}>星标问卷</Typography.Title>
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
                {!list.length && <Empty description={'暂无数据'} />}
            </div>
            <div className={styles.footer}>
                <ListPage total={total} />
            </div>
        </div>
    )
}
export default Star
