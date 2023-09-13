import React, { FC } from 'react'
import { QuestionTitleProps, QuestionTitleDefaultProps } from './interface'
import { Typography } from 'antd'

const QuestionTitle: FC<QuestionTitleProps> = (props: QuestionTitleProps) => {
    const { text, level = 1, isCenter } = { ...QuestionTitleDefaultProps, ...props }

    const genFontSize = (level: number) => {
        if (level === 1) {
            return '24px'
        } else if (level === 2) {
            return '20px'
        } else {
            return '16px'
        }
    }
    return (
        <div>
            <Typography.Title
                level={level}
                style={{
                    textAlign: isCenter ? 'center' : 'start',
                    marginBottom: 0,
                    fontSize: genFontSize(level),
                }}
            >
                {text}
            </Typography.Title>
        </div>
    )
}

export default QuestionTitle
