import React, { FC } from 'react'
import styles from './index.module.scss'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../../hook/useGetComponentInfo'
import { getComponentConfByType } from '../../../../components/QuestionComponents'
import {
    ComponentInfoType,
    changeSelectedId,
    moveComponent,
} from '../../../../store/componentsReducer'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { SortableContainer } from '../../../../components/DragSortable/SortableContainer'
import { SortableItem } from '../../../../components/DragSortable/SortableItem'
interface EditCanvasProps {
    loading?: boolean
}

const genComponent = (componentInfo: ComponentInfoType) => {
    const { type, props } = componentInfo
    const componentConf = getComponentConfByType(type)
    if (componentConf == null) return null
    const { Component } = componentConf
    return <Component {...props} />
}

export const EditCanvas: FC<EditCanvasProps> = (props: EditCanvasProps) => {
    const { componentList, selectedId } = useGetComponentInfo()

    const dispatch = useDispatch()

    const { loading } = props
    if (loading) return <Spin />

    const onDragEnd = (oldIndex: number, newIndex: number) => {
        dispatch(moveComponent({ oldIndex, newIndex }))
    }

    return (
        <SortableContainer
            items={componentList.map(c => ({ ...c, id: c.fe_id }))}
            onDragEnd={onDragEnd}
        >
            <div className={styles.canvas}>
                {componentList
                    .filter(c => !c.isHidden)
                    .map(item => {
                        const { fe_id, isLocked } = item
                        const wrapperClassName = classNames(styles.componentWrapper, {
                            [styles.selected]: fe_id === selectedId,
                            [styles.locked]: isLocked,
                        })
                        return (
                            <SortableItem key={fe_id} id={fe_id}>
                                <div
                                    className={wrapperClassName}
                                    onClick={e => {
                                        e.stopPropagation()
                                        dispatch(changeSelectedId(fe_id))
                                    }}
                                >
                                    <div className={styles.component}>{genComponent(item)}</div>
                                </div>
                            </SortableItem>
                        )
                    })}
            </div>
        </SortableContainer>
    )
}
