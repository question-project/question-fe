/**
 * @description: 基于 dnd-kit 拖拽 item 组件
 * @author: wangqiaoling
 * @date: 2023/09/20
 */
import React, { FC } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface SortableItemProps {
    id: string
    children: JSX.Element
}

export const SortableItem: FC<SortableItemProps> = (props: SortableItemProps) => {
    const { id, children } = props
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    )
}
