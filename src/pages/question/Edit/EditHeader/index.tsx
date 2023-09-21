import React, { ChangeEvent, FC, useState } from 'react'
import styles from './index.module.scss'
import { Button, Input, Space, Typography, message } from 'antd'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { EditToolbar } from '../EditToolbar'
import { useGetPageInfo } from '../../../../hook/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '../../../../store/pageInfoReducer'
import useGetComponentInfo from '../../../../hook/useGetComponentInfo'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { updateQuestionService } from '../../../../services/question'

// 显示和修改问卷标题
const TitleElem: FC = () => {
    const { title } = useGetPageInfo()

    const [isEdit, SetIsEdit] = useState(false)

    const dispatch = useDispatch()

    if (isEdit) {
        return (
            <Input
                value={title}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const newTitle = event.target.value.trim()
                    if (!newTitle) return
                    dispatch(changePageTitle({ title: newTitle }))
                }}
                onPressEnter={() => SetIsEdit(false)}
                onBlur={() => SetIsEdit(false)}
            />
        )
    }
    return (
        <Space>
            <Typography.Title>{title}</Typography.Title>
            <Button icon={<EditOutlined />} type="text" onClick={() => SetIsEdit(true)} />
        </Space>
    )
}

// 保存组件: 保存 pageInfo 和 componentList
const SaveButton: FC = () => {
    const pageInfo = useGetPageInfo()

    const { componentList = [] } = useGetComponentInfo()

    const { id } = useParams()

    const { run: save, loading } = useRequest(
        async () => {
            if (!id) return
            await updateQuestionService(id, { ...pageInfo, componentList })
        },
        {
            manual: true,
        }
    )

    // 保存 快捷键
    useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
        event.preventDefault()
        !loading && save()
    })

    useDebounceEffect(
        () => {
            save()
        },
        [pageInfo, componentList],
        { wait: 1000 }
    )

    return (
        <Button onClick={() => save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
            保存
        </Button>
    )
}

// 发布按钮
const PublishButton: FC = () => {
    const pageInfo = useGetPageInfo()

    const { componentList = [] } = useGetComponentInfo()

    const { id } = useParams()

    const nav = useNavigate()

    const { run: save, loading } = useRequest(
        async () => {
            if (!id) return
            await updateQuestionService(id, {
                ...pageInfo,
                componentList,
                // 标志问卷被发布
                isPublished: true,
            })
        },
        {
            manual: true,
            onSuccess: () => {
                message.success('发布成功')
                // 发布成功，跳转到统计页面
                nav(`/question/stat/${id}`)
            },
        }
    )

    return (
        <Button type="primary" onClick={save} disabled={loading}>
            发布
        </Button>
    )
}
// 编辑器头部组件
export const EditHeader: FC = () => {
    const nav = useNavigate()

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Space>
                        <Button
                            type="link"
                            icon={<LeftOutlined />}
                            onClick={() => {
                                nav(-1)
                            }}
                        >
                            返回
                        </Button>
                        <TitleElem />
                    </Space>
                </div>
                <div className={styles.main}>
                    <EditToolbar />
                </div>
                <div className={styles.right}>
                    <Space>
                        <SaveButton />
                        <PublishButton />
                    </Space>
                </div>
            </div>
        </div>
    )
}
