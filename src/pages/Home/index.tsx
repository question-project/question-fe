import React, { FC } from 'react'
import styles from './index.module.scss'
import { Button, Typography } from 'antd'
const { Title, Paragraph } = Typography

const Home: FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <Title>问卷调查 ｜ 在线投票</Title>
                <Paragraph>已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份</Paragraph>
                <div>
                    <Button type="primary">开始使用</Button>
                </div>
            </div>
        </div>
    )
}
export default Home
