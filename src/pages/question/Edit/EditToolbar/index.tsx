import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import {
    BlockOutlined,
    CopyOutlined,
    DeleteOutlined,
    DownOutlined,
    EyeInvisibleOutlined,
    LockOutlined,
    PauseOutlined,
    RedoOutlined,
    UndoOutlined,
    UpOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
    changeComponentHidden,
    copySelectedComponent,
    moveComponent,
    pasteCopiedComponent,
    removeSelectedComponent,
    toggleComponentLocked,
} from '../../../../store/componentsReducer'
import useGetComponentInfo from '../../../../hook/useGetComponentInfo'
import { useBindCanvasKeyPress } from '../../../../hook/useBindCanvasKeyPress'

export const EditToolbar: FC = () => {
    useBindCanvasKeyPress()

    const dispatch = useDispatch()

    const { selectedId, selectedComponent, copiedComponent, componentList } = useGetComponentInfo()

    const { isLocked } = selectedComponent || {}

    const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

    const isFirst = selectedIndex <= 0

    const isLast = selectedIndex + 1 >= componentList.length

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

    const moveUp = () => {
        if (isFirst) return
        dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
    }

    const moveDown = () => {
        if (isLast) return
        dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
    }

    const undo = () => {
        //
    }

    const redo = () => {
        //
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

            <Tooltip title="上移">
                <Button
                    shape="circle"
                    icon={<UpOutlined />}
                    onClick={moveUp}
                    disabled={isFirst}
                ></Button>
            </Tooltip>
            <Tooltip title="下移">
                <Button
                    shape="circle"
                    icon={<DownOutlined />}
                    onClick={moveDown}
                    disabled={isLast}
                ></Button>
            </Tooltip>
            <Tooltip title="撤销">
                <Button shape="circle" icon={<UndoOutlined />} onClick={undo}></Button>
            </Tooltip>
            <Tooltip title="重做">
                <Button shape="circle" icon={<RedoOutlined />} onClick={redo}></Button>
            </Tooltip>
        </Space>
    )
}
