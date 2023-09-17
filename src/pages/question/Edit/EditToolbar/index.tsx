import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import {
    BlockOutlined,
    CopyOutlined,
    DeleteOutlined,
    EyeInvisibleOutlined,
    LockOutlined,
    PauseOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
    changeComponentHidden,
    copySelectedComponent,
    pasteCopiedComponent,
    removeSelectedComponent,
    toggleComponentLocked,
} from '../../../../store/componentsReducer'
import useGetComponentInfo from '../../../../hook/useGetComponentInfo'
import { useBindCanvasKeyPress } from '../../../../hook/useBindCanvasKeyPress'

export const EditToolbar: FC = () => {
    useBindCanvasKeyPress()

    const dispatch = useDispatch()

    const { selectedId, selectedComponent, copiedComponent } = useGetComponentInfo()

    const { isLocked } = selectedComponent || {}

    const handleDelete = () => {
        dispatch(removeSelectedComponent())
    }

    const handleInvisible = () => {
        dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
    }

    const handleLock = () => {
        dispatch(toggleComponentLocked({ fe_id: selectedId }))
    }

    const copy = () => {
        dispatch(copySelectedComponent())
    }

    const patse = () => {
        dispatch(pasteCopiedComponent())
    }

    return (
        <Space>
            <Tooltip title="删除">
                <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
            </Tooltip>

            <Tooltip title="隐藏">
                <Button
                    shape="circle"
                    icon={<EyeInvisibleOutlined />}
                    onClick={handleInvisible}
                ></Button>
            </Tooltip>

            <Tooltip title="锁定">
                <Button
                    type={isLocked ? 'primary' : 'default'}
                    shape="circle"
                    icon={<LockOutlined />}
                    onClick={handleLock}
                ></Button>
            </Tooltip>

            <Tooltip title="复制">
                <Button
                    type={isLocked ? 'primary' : 'default'}
                    shape="circle"
                    icon={<CopyOutlined />}
                    onClick={copy}
                ></Button>
            </Tooltip>

            <Tooltip title="粘贴">
                <Button
                    type={isLocked ? 'primary' : 'default'}
                    shape="circle"
                    icon={<BlockOutlined />}
                    disabled={copiedComponent == null}
                    onClick={patse}
                ></Button>
            </Tooltip>
        </Space>
    )
}
