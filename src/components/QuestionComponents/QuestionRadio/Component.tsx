import React, { FC } from 'react'
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from './interface'
import { Radio, Space, Typography } from 'antd'

const QuestionRadio: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
    const { title, value, options = [], isVertical } = { ...QuestionRadioDefaultProps, ...props }
    return (
        <div>
            <Typography.Paragraph strong>{title}</Typography.Paragraph>
            <Radio.Group value={value}>
                <Space direction={isVertical ? 'vertical' : 'horizontal'}>
                    {options.map(c => (
                        <Radio value={c.value} key={c.value}>
                            {c.text}
                        </Radio>
                    ))}
                </Space>
            </Radio.Group>
        </div>
    )
}

export default QuestionRadio
