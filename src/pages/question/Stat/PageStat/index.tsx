import { useRequest } from 'ahooks'
import React, { FC, useState } from 'react'
import { Pagination, Spin, Table, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { getQuestionStatListService } from '../../../../services/stat'
import useGetComponentInfo from '../../../../hook/useGetComponentInfo'
import { STAT_PAGE_SIZE } from '../../../../constant'

interface PageStatProps {
    selectedComponentId: string
    setSelectedComponentId: (id: string) => void
    setSelectedComponentType: (id: string) => void
}

export const PageStat: FC<PageStatProps> = (props: PageStatProps) => {
    const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
    const { id = '' } = useParams()
    const [total, setTotal] = useState(0)
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)

    const { loading } = useRequest(
        async () => await getQuestionStatListService(id, { page, pageSize }),
        {
            refreshDeps: [page, pageSize, id],
            onSuccess: res => {
                const { total, list } = res
                setList(list)
                setTotal(total)
            },
        }
    )

    const { componentList } = useGetComponentInfo()
    const columns = componentList.map(c => {
        const { fe_id, title, props = {}, type } = c
        const colTitle = props!.title || title
        return {
            title: (
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        setSelectedComponentType(type)
                        setSelectedComponentId(fe_id)
                    }}
                >
                    <span style={{ color: fe_id === selectedComponentId ? '#1890ff' : 'inherit' }}>
                        {colTitle}
                    </span>
                </div>
            ),
            dataIndex: fe_id,
        }
    })

    const TableElem = (
        <>
            <Table rowKey={'_id'} dataSource={list} columns={columns} pagination={false} />
            <div style={{ textAlign: 'center', marginTop: '18px' }}>
                <Pagination
                    pageSize={pageSize}
                    total={total}
                    current={page}
                    onChange={setPage}
                    onShowSizeChange={(page, pageSize) => {
                        setPage(page)
                        setPageSize(pageSize)
                    }}
                />
            </div>
        </>
    )

    return (
        <div>
            <Typography.Title level={3} style={{ margin: 0 }}>
                答卷数量：{!loading && total}
            </Typography.Title>
            {loading && (
                <div style={{ textAlign: 'center' }}>
                    <Spin spinning={loading}></Spin>
                </div>
            )}
            {!loading && TableElem}
        </div>
    )
}
