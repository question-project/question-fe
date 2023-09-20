/**
 * @description: 基于 dnd-kit 的拖拽组件 container
 * @author: wangqiaoling
 * @date: 2023/09/20
 */
import React, { FC } from 'react'
import {
    DndContext,
    closestCenter,
    // 鼠标相关行为
    MouseSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core'
import {
    // arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'

type PropType = {
    children: JSX.Element | JSX.Element[]
    items: Array<{ id: string; [key: string]: any }>
    onDragEnd: (oldIndex: number, newIndex: number) => void
}

export const SortableContainer: FC<PropType> = (props: PropType) => {
    const { children, items, onDragEnd } = props

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 8, // 8px 才触发拖拽
            },
        })
    )

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (over == null) return

        if (active.id !== over.id) {
            const oldIndex = items.findIndex(c => c.fe_id === active.id)
            const newIndex = items.findIndex(c => c.fe_id === over.id)
            // 通知父组件计算结果
            onDragEnd(oldIndex, newIndex)
        }
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {children}
            </SortableContext>
        </DndContext>
    )
}
