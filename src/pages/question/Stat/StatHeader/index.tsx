import React, { FC, useMemo, useRef } from 'react'
import styles from './index.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Input, InputRef, Popover, Space, Tooltip, Typography, message } from 'antd'
import { useGetPageInfo } from '../../../../hook/useGetPageInfo'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import QRCode from 'qrcode.react'

export const StatHeader: FC = () => {
    const nav = useNavigate()
    const { title, isPublished } = useGetPageInfo()
    const { id } = useParams()
    const urlInputRef = useRef<InputRef>(null)

    const copyLink = () => {
        const elem = urlInputRef.current
        if (elem == null) return
        // 选中 input 的内容
        elem.select()
        // 拷贝选中内容
        document.execCommand('copy')
        message.success('拷贝成功')
    }

    /**
     * 使用 useMemo:
     * 1. 依赖项是否经常变化，不经常变就适合使用
     * 2. 缓存的元素是否创建成本较高
     */
    const LinkAndQrCodeElem = useMemo(() => {
        if (!isPublished) return null
        // 拼接 url 需要参考 c 端的 url 的规则
        const url = `http://localhost:8000/question/${id}`

        const QRCodeElem = (
            <div style={{ textAlign: 'center' }}>
                <QRCode value={url} size={150} />
            </div>
        )

        return (
            <Space>
                <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
                <Tooltip title="拷贝链接">
                    <Button icon={<CopyOutlined />} onClick={copyLink}></Button>
                </Tooltip>
                <Popover content={QRCodeElem}>
                    <Button icon={<QrcodeOutlined />}></Button>
                </Popover>
            </Space>
        )
    }, [id, isPublished])

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Space>
                        <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
                            返回
                        </Button>
                        <Typography.Title>{title}</Typography.Title>
                    </Space>
                </div>
                <div className={styles.main}>{LinkAndQrCodeElem}</div>
                <div className={styles.right}>
                    <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
                        编辑问卷
                    </Button>
                </div>
            </div>
        </div>
    )
}
