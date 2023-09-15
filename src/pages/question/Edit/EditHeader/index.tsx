import React, { FC } from 'react'
import styles from './index.module.scss'
import { Button, Space, Typography } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { EditToolbar } from '../EditToolbar'

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
                        <Typography.Title>问卷标题</Typography.Title>
                    </Space>
                </div>
                <div className={styles.main}>
                    <EditToolbar />
                </div>
                <div className={styles.right}>
                    <Space>
                        <Button>保存</Button>
                        <Button type="primary">发布</Button>
                    </Space>
                </div>
            </div>
        </div>
    )
}
