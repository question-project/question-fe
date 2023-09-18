import React, { FC, useEffect } from 'react'
import { QuestionInfoPropsType } from './interface'
import { Form, Input } from 'antd'

const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
    const { title, desc, onChange, disabled } = props
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({ title, desc })
    }, [title, desc])

    return (
        <Form
            layout="vertical"
            initialValues={{ title, desc }}
            disabled={disabled}
            onValuesChange={() => {
                onChange?.(form.getFieldsValue())
            }}
            form={form}
        >
            <Form.Item
                label="标题"
                name="title"
                rules={[{ required: true, message: '请输入问卷标题' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item name={'desc'} label="描述">
                <Input.TextArea />
            </Form.Item>
        </Form>
    )
}
export default PropComponent
