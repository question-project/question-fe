import React, { ComponentProps, FC } from 'react'
import useGetComponentInfo from '../../../../hook/useGetComponentInfo'
import {
    ComponentPropsType,
    getComponentConfByType,
} from '../../../../components/QuestionComponents'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '../../../../store/componentsReducer'

const NoProp = () => <div style={{ textAlign: 'center' }}>未选中组件</div>

export const ComponentProp: FC = () => {
    const { selectedComponent, selectedId } = useGetComponentInfo()

    const dispatch = useDispatch()

    const changeProps = (newProps: ComponentPropsType) => {
        if (selectedComponent == null) return
        dispatch(changeComponentProps({ fe_id: selectedId, newProps }))
    }

    if (selectedComponent == null) return <NoProp />

    const { type, props } = selectedComponent

    const componentConf = getComponentConfByType(type)

    if (componentConf == null) return <NoProp />

    const { PropComponent } = componentConf
    return <PropComponent {...props} onChange={changeProps} />
}
