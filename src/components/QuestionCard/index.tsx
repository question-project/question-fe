import React, { FC } from 'react'
import styles from './index.module.scss'
import { Button, Divider, Space, Tag, Popconfirm, Modal } from 'antd'
import {
    EditOutlined,
    LineChartOutlined,
    StarOutlined,
    CopyOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
type PropsType = {
    _id: string
    title: string
    isStar: boolean
    isPublished: boolean
    answerCount: number
    createdAt: string
}
const QuestionCard: FC<PropsType> = (props: PropsType) => {
    const { title, createdAt, answerCount, isPublished, _id, isStar } = props

    const nav = useNavigate()

    const duplicate = () => {
        console.log('copyed')
    }

    const del = () => {
        Modal.confirm({
            title: '确认删除该问卷？',
            icon: <ExclamationCircleOutlined />,
        })
    }
    return (
        <div className={styles.questionCardWrapper}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <Link to={isPublished ? `question/stat/${_id}` : `question/edit/${_id}`}>
                        <Space>
                            {isStar && <StarOutlined style={{ color: 'red' }} />}
                            {title}
                        </Space>
                    </Link>
                </div>
                <div className={styles.right}>
                    <Space>
                        {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
                        <span>答卷：{answerCount}</span>
                        <span>{createdAt}</span>
                    </Space>
                </div>
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div className={styles.container}>
                <div className={styles.left}>
                    <Space>
                        <Button
                            type="text"
                            size="small"
                            icon={<EditOutlined />}
                            onClick={() => nav(`question/edit/${_id}`)}
                        >
                            编辑问卷
                        </Button>
                        <Button
                            type="text"
                            size="small"
                            icon={<LineChartOutlined />}
                            onClick={() => nav(`question/stat/${_id}`)}
                            disabled={!isPublished}
                        >
                            数据统计
                        </Button>
                    </Space>
                </div>
                <div className={styles.right}>
                    <Space>
                        <Button
                            type="text"
                            size="small"
                            icon={<StarOutlined />}
                            onClick={() => nav(`question/stat/${_id}`)}
                        >
                            {isStar ? '取消标星' : '标星'}
                        </Button>
                        <Popconfirm
                            title="确定复制该问卷？"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={duplicate}
                        >
                            <Button type="text" size="small" icon={<CopyOutlined />}>
                                复制
                            </Button>
                        </Popconfirm>

                        <Button type="text" size="small" icon={<DeleteOutlined />} onClick={del}>
                            删除
                        </Button>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default QuestionCard
