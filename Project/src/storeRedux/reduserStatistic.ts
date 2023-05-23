import { Reducer } from "redux"
import { POMIDORS_COMPLETE, STOP_TIME, TimerState, TIME_PAUSE, TIME_WORK, TIME_WORK_DAY, WHAT_A_WEEK } from "./actionStatistic"

const initialState: TimerState = {
    pomidors: 0,
    minutesWork: 0,
    minutesPause: 0,
    stop: 0,
    weekValue: 'Эта неделя',
    days: {
        ['18.04.2023']: {
            timeWork: 5000,
        },
        ['19.04.2023']: {
            timeWork: 4000,
        },
        ['20.04.2023']: {
            timeWork: 3000,
        },
        ['25.04.2023']: {
            timeWork: 7000,
        }
    }
}

function getDate(timeWork: number) {
    const options: any = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC'
    };
    const DateNow = new Date()
    const dateRus = DateNow.toLocaleString("ru", options)
    const date = {
        [dateRus]: {
            timeWork: timeWork,
        }
    }
    return date
}

export const rootReducerStatistic: Reducer<TimerState> = (state = initialState, action) => {
    switch (action.type) {
        case POMIDORS_COMPLETE:
            return {
                ...state,
                pomidors: state.pomidors + 1,
            };
        case STOP_TIME:
            return {
                ...state,
                stop: state.stop + 1,
            };
        case TIME_WORK:
            return {
                ...state,
                minutesWork: state.minutesWork + 1,
            }
        case TIME_WORK_DAY:
            return {
                ...state,
                days: {
                    ...state.days,
                    ...getDate(state.minutesWork)
                }
            }
        case TIME_PAUSE:
            return {
                ...state,
                minutesPause: state.minutesPause + 1,
            }
        case WHAT_A_WEEK:
            return {
                ...state,
                weekValue: action.payload
            }
        default:
            return state;
    }
}