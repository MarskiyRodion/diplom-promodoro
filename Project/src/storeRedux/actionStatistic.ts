import { ActionCreator, AnyAction } from "redux";

export type TimerState = {
    pomidors: number,
    minutesWork: number,
    minutesPause: number,
    stop: number,
    weekValue: string,
    days: any,
}

export const POMIDORS_COMPLETE = 'POMIDORS_COMPLETE';

export const PomidorsComplete: ActionCreator<AnyAction> = () => {
    return {
        type: POMIDORS_COMPLETE,
    }
};

export const STOP_TIME = 'STOP_TIME'

export const Stops: ActionCreator<AnyAction> = () => {
    return {
        type: STOP_TIME,
    }
};

export const TIME_WORK = 'TIME_WORK'

export const TimeWork: ActionCreator<AnyAction> = () => {
    return {
        type: TIME_WORK,
    }
};

export const TIME_PAUSE = 'TIME_PAUSE'

export const TimePause: ActionCreator<AnyAction> = () => {
    return {
        type: TIME_PAUSE,
    }
};

export const WHAT_A_WEEK = 'WHAT_A_WEEK'

export const selectWeek: ActionCreator<AnyAction> = (whatWeek) => {
    return {
        type: WHAT_A_WEEK,
        payload: whatWeek,
    }
}

export const TIME_WORK_DAY = 'TIME_WORK_DAY'

export const timeWorkDay: ActionCreator<AnyAction> = () => {
    return {
        type: TIME_WORK_DAY,
    }
}