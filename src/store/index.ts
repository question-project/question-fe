import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'
import undoable, { StateWithHistory, excludeAction } from 'redux-undo'

export type StateType = {
    user: UserStateType
    components: StateWithHistory<ComponentsStateType>
    pageInfo: PageInfoType
}

export default configureStore({
    reducer: {
        // 分模块
        // 用户信息
        user: userReducer,
        // 组件列表
        components: undoable(componentsReducer, {
            // 限制 20 步
            limit: 20,
            // 排除一些行为
            filter: excludeAction([
                'components/resetComponents',
                'components/changeSelectedId',
                'components/selectPrevComponent',
                'components/selectNextComponent',
            ]),
        }),
        // 问卷信息 （页面设置、问卷标题等）
        pageInfo: pageInfoReducer,
    },
})
