import { useRequest } from 'ahooks'
import { Typography } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { getComponentStatService } from '../../../../services/stat'
import { useParams } from 'react-router-dom'
import { getComponentConfByType } from '../../../../components/QuestionComponents'

interface ChartStatProps {
    selectedComponentId: string
    selectedComponentType: string
}

export const ChartStat: FC<ChartStatProps> = (props: ChartStatProps) => {
    const { selectedComponentId, selectedComponentType } = props
    const { id = '' } = useParams()
    const [stat, setStat] = useState([])

    const { run } = useRequest(
        async (questionId, componentId) => await getComponentStatService(questionId, componentId),
        {
            manual: true,
            onSuccess: res => {
                setStat(res.stat)
            },
        }
    )

    useEffect(() => {
        !!selectedComponentId && run(id, selectedComponentId)
    }, [selectedComponentId, id])

    const genCharts = () => {
        if (!selectedComponentId) {
            return <div>未选中组件</div>
        }
        const { StatComponent } = getComponentConfByType(selectedComponentType) || {}
        if (!StatComponent) return <div>该组件暂无图表</div>
        return <StatComponent stat={stat} />
    }

    return (
        <>
            <Typography.Title level={3} style={{ margin: 0 }}>
                图标统计
            </Typography.Title>
            <div>{genCharts()}</div>
        </>
    )
}
