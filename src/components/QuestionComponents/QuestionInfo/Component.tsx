import React, { FC } from 'react'
import { QuestionInfoDefaultProps, QuestionInfoPropsType } from './interface'
import { Typography } from 'antd'
const { Title, Paragraph } = Typography

const QuestionInfo: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
    const { title = '', desc = '' } = { ...QuestionInfoDefaultProps, ...props }
    return (
        <div style={{ textAlign: 'center' }}>
            <Title style={{ fontSize: '24px' }}>{title}</Title>
            <Paragraph>
                {desc.split('\n').map((item, index) => (
                    <span key={index}>
                        {index > 0 && <br />}
                        {item}
                    </span>
                ))}
            </Paragraph>
        </div>
    )
}
export default QuestionInfo
