import { Space, Typography } from 'antd'
import React, { FC } from 'react'
import { FormOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
const { Title } = Typography
const Logo: FC = () => {
    return (
        <div className={styles.container}>
            <Link to={'/'}>
                <Space>
                    <Title>
                        <FormOutlined />
                    </Title>
                    <Title>问卷</Title>
                </Space>
            </Link>
        </div>
    )
}

export default Logo
