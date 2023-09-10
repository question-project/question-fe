import React, { FC } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { Button, Divider, Space } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { createQuestionService } from '../../services/question'
import { useRequest } from 'ahooks'

const ManageLayout: FC = () => {
    const nav = useNavigate()

    const { pathname } = useLocation()

    const {
        loading,
        error,
        run: onCreate,
    } = useRequest(createQuestionService, {
        manual: true,
        onSuccess: res => {
            nav(`/question/edit/${res.id}`)
        },
    })

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Space direction="vertical">
                    <Button
                        type="primary"
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={onCreate}
                        disabled={loading}
                    >
                        创建问卷
                    </Button>
                    <Divider style={{ borderTop: 'transparent' }} />
                    <Button
                        type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
                        size="large"
                        icon={<BarsOutlined />}
                        onClick={() => nav('/manage/list')}
                    >
                        我的问卷
                    </Button>
                    <Button
                        type={pathname.startsWith('/manage/sta') ? 'default' : 'text'}
                        size="large"
                        icon={<StarOutlined />}
                        onClick={() => nav('/manage/star')}
                    >
                        星标问卷
                    </Button>
                    <Button
                        type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
                        size="large"
                        icon={<DeleteOutlined />}
                        onClick={() => nav('/manage/trash')}
                    >
                        回收站
                    </Button>
                </Space>
            </div>
            <div className={styles.right}>
                <Outlet />
            </div>
        </div>
    )
}
export default ManageLayout
