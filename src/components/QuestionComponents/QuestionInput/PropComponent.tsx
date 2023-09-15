import React, { FC, useEffect } from 'react'
import { QuestionInputProps } from './interface'
import { Form, Input } from 'antd'

export const PropComponent: FC<QuestionInputProps> = (props: QuestionInputProps) => {
    const { title, placeholder, onChange } = props

    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({ title, placeholder })
    }, [title, placeholder])

    const handleValuesChange = () => {
        onChange?.(form.getFieldsValue())
    }
    return (
        <Form
            layout="vertical"
            initialValues={{ title, placeholder }}
            form={form}
            onValuesChange={handleValuesChange}
        >
            <Form.Item
                label="标题"
                name={'title'}
                rules={[{ required: true, message: '请输入标题' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="Placeholder" name={'placeholder'}>
                <Input />
            </Form.Item>
        </Form>
    )
}
