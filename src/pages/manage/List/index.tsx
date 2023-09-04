import React, { FC, useState } from 'react'
import styles from './index.module.scss'
import QuestionCard from '../../../components/QuestionCard'
import { useTitle } from 'ahooks'
import { Typography } from 'antd'

const questionList = [
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
        isStar: false,
        createdAt: new Date().getTime().toString(),
        answerCount: 2,
    },
    {
        _id: 'q3',
        title: '问卷3',
        isPublished: false,
        isStar: false,
        createdAt: new Date().getTime().toString(),
        answerCount: 3,
    },
    {
        _id: 'q4',
        title: '问卷4',
        isPublished: true,
        isStar: false,
        createdAt: new Date().getTime().toString(),
        answerCount: 1,
    },
]

const List: FC = () => {
    useTitle('问卷 - 我的问卷')

    const [list] = useState(questionList)

    return (
        <div className={styles.listWrapper}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Typography.Title level={3}>我的问卷</Typography.Title>
                </div>
                <div className={styles.right}>
                    <input />
                </div>
            </div>
            <div className={styles.content}>
                {!!list.length &&
                    list.map(item => {
                        const { _id } = item
                        return <QuestionCard key={_id} {...item} />
                    })}
            </div>
            <div className={styles.footer}>load more</div>
        </div>
    )
}
export default List
