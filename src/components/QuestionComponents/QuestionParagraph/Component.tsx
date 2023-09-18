import React, { FC } from 'react'
import { QuestionParagraphDefaultProps, QuestionParagraphPropsType } from './interface'
import { Typography } from 'antd'

const QuestionParagraph: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
    const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }

    const textList = text.split('\n')

    return (
        <Typography.Paragraph
            style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '10px' }}
        >
            {textList.map((t, index) => (
                <span key={index}>
                    {index > 0 && <br />}
                    {t}
                </span>
            ))}
        </Typography.Paragraph>
    )
}
export default QuestionParagraph
