import { ActionCreator, AnyAction } from "redux";

export type RootState = {
    taskList: ItaskList[];
}

export interface ItaskList {
    id: number;
    text: string;
    pomidors: number;
}

export const UPDATE_TASKS = 'UPDATE_TASKS';

export const updateTasks: ActionCreator<AnyAction> = (list) => {
    return {
        type: UPDATE_TASKS,
        list
    }
};

export const PLUS_POMIDOR_FROM_CART = 'PLUS_POMIDOR_FROM_CART';

export const PlusPomidorFromCart: ActionCreator<AnyAction> = (taskId) => {
    return {
        type: PLUS_POMIDOR_FROM_CART,
        payload: taskId
    }
};

export const MINUS_POMIDOR_FROM_CART = 'MINUS_POMIDOR_FROM_CART';

export const MinusPomidorFromCart: ActionCreator<AnyAction> = (taskId) => {
    return {
        type: MINUS_POMIDOR_FROM_CART,
        payload: taskId
    }
};

export const REVOVE_ALL_ITEM_FROM_LIST = 'REVOVE_ALL_ITEM_FROM_LIST';

export const RemoveAllItemFromList: ActionCreator<AnyAction> = (taskId) => {
    return {
        type: REVOVE_ALL_ITEM_FROM_LIST,
        payload: taskId
    }
};

export const EDIT_TASK = 'EDIT_TASK'

export const EditTask: ActionCreator<AnyAction> = (taskId, text) => {
    return {
        type: EDIT_TASK,
        payload: taskId,
        text: text,
    }
}