import React, { FC } from 'react'
import { OptionType, QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from './interface'
import { Checkbox, Space, Typography } from 'antd'

const QuestionCheckbox: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
    const { title, list = [], isVertical } = { ...QuestionCheckboxDefaultProps, ...props }
    return (
        <div>
            <Typography.Paragraph strong>{title}</Typography.Paragraph>
            <Space direction={isVertical ? 'vertical' : 'horizontal'}>
                {list.map((opt: OptionType) => {
                    const { value, text, checked } = opt
                    return (
                        <Checkbox checked={checked} key={value} value={value}>
                            {text}
                        </Checkbox>
                    )
                })}
            </Space>
        </div>
    )
}
export default QuestionCheckbox
