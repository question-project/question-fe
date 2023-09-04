import React, { FC, useState } from 'react'
import styles from './index.module.scss'
import { useTitle } from 'ahooks'
import { Empty, Input, Typography } from 'antd'
import QuestionCard from '../../../components/QuestionCard'
const starList = [
    {
        _id: 'q1',
        title: '问卷1',
        isPublished: true,
        isStar: true,
        createdAt: new Date().getTime().toString(),
        answerCount: 1,
    },
    {
        _id: 'q2',
        title: '问卷2',
        isPublished: false,
        isStar: true,
        createdAt: new Date().getTime().toString(),
        answerCount: 2,
    },
    {
        _id: 'q3',
        title: '问卷3',
        isPublished: false,
        isStar: true,
        createdAt: new Date().getTime().toString(),
        answerCount: 3,
    },
]
const Star: FC = () => {
    const [list] = useState(starList)
    useTitle('问卷 - 星标问卷')
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Typography.Title level={3}>星标问卷</Typography.Title>
                </div>
                <div className={styles.right}>
                    <Input />
                </div>
            </div>
            <div className={styles.content}>
                {!!list.length &&
                    list.map(item => {
                        const { _id } = item
                        return <QuestionCard key={_id} {...item} />
                    })}
                {!list.length && <Empty description={'暂无数据'} />}
            </div>
            <div className={styles.footer}></div>
        </div>
    )
}
export default Star
