import { Reducer } from "redux";
import { RootState, PLUS_POMIDOR_FROM_CART, UPDATE_TASKS, MINUS_POMIDOR_FROM_CART, REVOVE_ALL_ITEM_FROM_LIST, EDIT_TASK } from "./actionTask";

const initialState: RootState = {
    taskList: []
}

const updateTasksList = (taskList: any, item: any, idx: number) => {
    if (item.pomidors === 0) {
        return [
            ...taskList.slice(0, idx),
            ...taskList.slice(idx + 1)
        ]
    }

    return [
        ...taskList.slice(0, idx),
        item,
        ...taskList.slice(idx + 1)
    ]
}

const updateTask = (item: any, quantity: number) => {
    return {
        id: item?.id,
        text: item?.text,
        pomidors: item?.pomidors + quantity,
    }
}

const updateOrder = (state: any, taskId: number, quantity: number) => {

    const task = state.taskList.find((task: any) => task.id === taskId)
    const itemIndex = state.taskList.findIndex((task: any) => task.id === taskId)
    const newTask = updateTask(task, quantity)
    return {
        taskList: updateTasksList(state.taskList, newTask, itemIndex)
    };
}

export const rootReducer: Reducer<RootState> = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TASKS:
            return {
                taskList: [
                    ...state.taskList,
                    action.list
                ]
            };
        case PLUS_POMIDOR_FROM_CART:
            return updateOrder(state, action.payload, 1)
        case MINUS_POMIDOR_FROM_CART:
            return updateOrder(state, action.payload, -1)
        case REVOVE_ALL_ITEM_FROM_LIST:
            const item: any = state.taskList.find((task) => task.id === action.payload)
            return updateOrder(state, action.payload, -item?.pomidors)
        case EDIT_TASK:
            const task = state.taskList.find((task: any) => task.id === action.payload)
            const itemIndex = state.taskList.findIndex((task: any) => task.id === action.payload)
            const newTask = {
                id: task?.id,
                text: action.text,
                pomidors: task?.pomidors,
            }
            return {
                taskList: updateTasksList(state.taskList, newTask, itemIndex)
            };
        default:
            return state;
    }
}