import React, { FC, useEffect } from 'react'
import { QuestionCheckboxPropsType } from './interface'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { OptionType } from '../QuestionRadio'
import { nanoid } from 'nanoid'

const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
    const { title, list = [], isVertical, onChange, disabled } = props

    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({
            title,
            list,
            isVertical,
        })
    }, [title, list, isVertical])

    const handleChange = () => {
        if (onChange == null) return
        const newValues = form.getFieldsValue() as QuestionCheckboxPropsType
        if (newValues.list) {
            newValues.list = newValues.list.filter((op: OptionType) => !(op.text == null))
        }

        const { list = [] } = newValues
        list.forEach((op: OptionType) => {
            if (op.value) return
            op.value = nanoid()
        })
        onChange(newValues)
    }

    return (
        <Form
            layout="vertical"
            disabled={disabled}
            onValuesChange={handleChange}
            initialValues={{ title, list, isVertical }}
            form={form}
        >
            <Form.Item
                label="多选框标题"
                name="title"
                rules={[{ required: true, message: '请输入标题' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="选项">
                <Form.List name={'list'}>
                    {(fields, { add, remove }) => {
                        return (
                            <>
                                {fields.map(({ key, name }, index) => (
                                    <Space key={key} align="baseline">
                                        <Form.Item name={[name, 'checked']} valuePropName="checked">
                                            <Checkbox />
                                        </Form.Item>
                                        <Form.Item
                                            name={[name, 'text']}
                                            rules={[
                                                { required: true, message: '请输入选项文字' },
                                                {
                                                    validator: (_, text) => {
                                                        const { list = [] } = form.getFieldsValue()
                                                        let num = 0
                                                        list.forEach((op: OptionType) => {
                                                            if (op.text === text) {
                                                                num++
                                                            }
                                                        })

                                                        if (num === 1) {
                                                            return Promise.resolve()
                                                        }
                                                        return Promise.reject(
                                                            new Error('该选项和其他选项重复')
                                                        )
                                                    },
                                                },
                                            ]}
                                        >
                                            <Input placeholder="输入选项文字..." />
                                        </Form.Item>
                                        {index > 0 && (
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        )}
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button
                                        icon={<PlusOutlined />}
                                        type="link"
                                        onClick={() => add({ text: '', value: '', checked: false })}
                                        block
                                    >
                                        添加选项
                                    </Button>
                                </Form.Item>
                            </>
                        )
                    }}
                </Form.List>
            </Form.Item>

            <Form.Item name={'isVertical'} valuePropName="checked">
                <Checkbox>竖向排列</Checkbox>
            </Form.Item>
        </Form>
    )
}
export default PropComponent
