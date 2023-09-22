import React, { FC, useState } from 'react'
import styles from './index.module.scss'
import useLoadQuestionData from '../../../hook/useLoadQuestionData'
import { Button, Result, Spin } from 'antd'
import { useGetPageInfo } from '../../../hook/useGetPageInfo'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import { StatHeader } from './StatHeader'
import { ComponentList } from './ComponentList'

const Stat: FC = () => {
    const nav = useNavigate()
    const { loading } = useLoadQuestionData()
    const { isPublished, title } = useGetPageInfo()
    const [selectedComponentId, setSelectedComponentId] = useState('')
    const [selectedComponentType, setSelectedComponentType] = useState('')

    useTitle(`问卷统计 - ${title}`)

    const LoadingElem = (
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Spin spinning={loading}></Spin>
        </div>
    )

    const genContentElem = () => {
        if (typeof isPublished === 'boolean' && !isPublished) {
            return (
                <div style={{ flex: 1 }}>
                    <Result
                        status={'warning'}
                        title="该页面尚未发布"
                        extra={<Button onClick={() => nav(-1)}>返回</Button>}
                    ></Result>
                </div>
            )
        }
        return (
            <>
                <div className={styles.left}>
                    <ComponentList
                        selectedComponentId={selectedComponentId}
                        setSelectedComponentId={setSelectedComponentId}
                        setSelectedComponentType={setSelectedComponentType}
                    />
                </div>
                <div className={styles.main}></div>
                <div className={styles.right}></div>
            </>
        )
    }

    return (
        <div className={styles.container}>
            <StatHeader />
            <div className={styles.contentWrapper}>
                {loading && LoadingElem}
                {!loading && <div className={styles.content}>{genContentElem()}</div>}
            </div>
        </div>
    )
}
export default Stat
