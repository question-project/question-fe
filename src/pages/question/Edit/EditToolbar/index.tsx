import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { changeComponentHidden, removeSelectedComponent } from '../../../../store/componentsReducer'
import useGetComponentInfo from '../../../../hook/useGetComponentInfo'

export const EditToolbar: FC = () => {
    const dispatch = useDispatch()

    const { selectedId } = useGetComponentInfo()

    const handleDelete = () => {
        dispatch(removeSelectedComponent())
    }

    const handleInvisible = () => {
        dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
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
        </Space>
    )
}
