import { Form, Input } from 'antd'
import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../../store/pageInfoReducer'
import { useGetPageInfo } from '../../../../hook/useGetPageInfo'

interface PageSettingProps {
    [key: string]: any
}

export const PageSetting: FC<PageSettingProps> = (props: PageSettingProps) => {
    const pageInfo = useGetPageInfo()

    const [form] = Form.useForm()

    const dispatch = useDispatch()

    useEffect(() => {
        form.setFieldsValue(pageInfo)
    }, [pageInfo])

    return (
        <Form
            layout="vertical"
            form={form}
            onValuesChange={() => {
                dispatch(resetPageInfo(form.getFieldsValue()))
            }}
            initialValues={pageInfo}
        >
            <Form.Item
                label="问卷标题"
                name={'title'}
                rules={[{ required: true, message: '请输入问卷标题' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="问卷描述" name={'desc'}>
                <Input.TextArea placeholder="问卷描述" />
            </Form.Item>

            <Form.Item label="css" name={'css'}>
                <Input.TextArea placeholder="输入 CSS 样式代码" />
            </Form.Item>

            <Form.Item label="js" name={'js'}>
                <Input.TextArea placeholder="输入 JS 脚本代码" />
            </Form.Item>
        </Form>
    )
}
