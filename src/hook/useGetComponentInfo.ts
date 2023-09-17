import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentsStateType } from '../store/componentsReducer'

const useGetComponentInfo = () => {
    const components = useSelector<StateType>(state => state.components) as ComponentsStateType

    const { componentList = [], selectedId = '', copiedComponent } = components

    return {
        componentList,
        selectedId,
        selectedComponent: componentList.find(c => c.fe_id === selectedId),
        copiedComponent,
    }
}

export default useGetComponentInfo
