import React, { FC, useEffect } from 'react'
import { QuestionParagraphPropsType } from './interface'
import { Checkbox, Form, Input } from 'antd'

const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
    const { text, isCenter, disabled, onChange } = props

    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({ text, isCenter })
    }, [text, isCenter])

    const onValuesChange = () => {
        onChange?.(form.getFieldsValue())
    }

    return (
        <Form
            layout="vertical"
            initialValues={{ text, isCenter }}
            onValuesChange={onValuesChange}
            form={form}
            disabled={disabled}
        >
            <Form.Item
                name={'text'}
                label="段落内容"
                rules={[{ required: true, message: '请输入段落内容' }]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item name={'isCenter'} valuePropName="checked">
                <Checkbox>居中显示</Checkbox>
            </Form.Item>
        </Form>
    )
}
export default PropComponent
