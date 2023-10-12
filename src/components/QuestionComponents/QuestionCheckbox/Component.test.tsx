import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
    render(<Component />)
    const p = screen.getByText('多选框')
    expect(p).toBeInTheDocument()

    for (let i = 1; i <= 3; i++) {
        const checkbox = screen.getByDisplayValue(`item${i}`)
        expect(checkbox).toBeInTheDocument()
        const label = screen.getByText(`选项${i}`)
        expect(label).toBeInTheDocument()
        // 每个都未被选中
        expect(checkbox.getAttribute('checked')).toBeNull()
    }
})

test('传入属性', () => {
    const list = [
        { value: 'v1', text: 't1', checked: false },
        { value: 'v2', text: 't2', checked: true },
        { value: 'v3', text: 't3', checked: true },
    ]

    const checkedList = ['v2', 'v3']
    render(<Component title="hello" list={list} />)

    const p = screen.getByText('hello')
    expect(p).toBeInTheDocument()

    for (let i = 1; i <= 3; i++) {
        const curVal = `v${i}`
        const checkbox = screen.getByDisplayValue(curVal)
        expect(checkbox).toBeInTheDocument()
        const label = screen.getByText(`t${i}`)
        expect(label).toBeInTheDocument()
        // 选中的
        if (checkedList.includes(curVal)) {
            expect(checkbox.getAttribute('checked')).not.toBeNull()
        } else {
            expect(checkbox.getAttribute('checked')).toBeNull()
        }
    }
})
