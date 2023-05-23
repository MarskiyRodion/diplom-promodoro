export function necessaryWeek(arrDaysWithTime: any, daysWithTime: any, week: string) {
    if (week === 'Прошедшая неделя') {
        const fullInfo: any = []
        let counter = 0
        const daysOfWeekArr = whatAWeek(7)
        const daysOfThisWeekArr = daysInChooseWeek(arrDaysWithTime, daysOfWeekArr)

        for (let k = 0; k < daysOfWeekArr.length; k++) {
            if (daysOfThisWeekArr.indexOf(daysOfWeekArr[k]) === -1) {
                fullInfo.push({
                    timeWork: 0,
                    data: daysOfWeekArr[k],
                    style: {
                        height: '5px',
                        width: '77px',
                        background: '#C4C4C4'
                    }
                })
            } else {
                const newCount = counter++
                fullInfo.push({
                    timeWork: daysWithTime[daysOfThisWeekArr[newCount]].timeWork,
                    data: daysOfThisWeekArr[newCount],
                    style: {
                        height: `${daysWithTime[daysOfThisWeekArr[newCount]].timeWork === 0 ? 5 : findingTheLargestValue(daysOfThisWeekArr, daysWithTime, daysWithTime[daysOfThisWeekArr[newCount]].timeWork)}px`,
                        width: '77px',
                        background: '#C4C4C4',
                    }
                })
            }
        }
        const maxNeedNumber = maxNumber(daysOfThisWeekArr, daysWithTime)
        return {
            fullInfo,
            maxNeedNumber
        } 
    } else if (week === '2 недели назад') {
        const fullInfo: any = []
        let counter = 0
        const daysOfWeekArr = whatAWeek(14)
        const daysOfThisWeekArr = daysInChooseWeek(arrDaysWithTime, daysOfWeekArr)
        for (let k = 0; k < daysOfWeekArr.length; k++) {
            if (daysOfThisWeekArr.indexOf(daysOfWeekArr[k]) === -1) {
                fullInfo.push({
                    timeWork: 0,
                    data: daysOfWeekArr[k],
                    style: {
                        height: '5px',
                        width: '77px',
                        background: '#C4C4C4'
                    }
                })
            } else {
                const newCount = counter++
                fullInfo.push({
                    timeWork: daysWithTime[daysOfThisWeekArr[newCount]].timeWork,
                    data: daysOfThisWeekArr[newCount],
                    style: {
                        height: `${daysWithTime[daysOfThisWeekArr[newCount]].timeWork === 0 ? 5 : findingTheLargestValue(daysOfThisWeekArr, daysWithTime, daysWithTime[daysOfThisWeekArr[newCount]].timeWork)}px`,
                        width: '77px',
                        background: '#C4C4C4',
                    }
                })
            }
        }
        const maxNeedNumber = maxNumber(daysOfThisWeekArr, daysWithTime)
        return {
            fullInfo,
            maxNeedNumber
        } 
    } else {
        const day: Date = new Date()
        const options: any = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC'
        };
        const today = day.toLocaleString("ru", options)
        const fullInfo: any = []
        let counter = 0
        const daysOfWeekArr = whatAWeek(0)
        const daysOfThisWeekArr = daysInChooseWeek(arrDaysWithTime, daysOfWeekArr)
        for (let k = 0; k < daysOfWeekArr.length; k++) {
            if (daysOfThisWeekArr.indexOf(daysOfWeekArr[k]) === -1) {
                fullInfo.push({
                    timeWork: 0,
                    data: daysOfWeekArr[k],
                    style: {
                        height: '5px',
                        width: '77px',
                        background: '#C4C4C4'
                    }
                })
            } else {
                const newCount = counter++
                fullInfo.push({
                    timeWork: daysWithTime[daysOfThisWeekArr[newCount]].timeWork,
                    data: daysOfThisWeekArr[newCount],
                    style: {
                        height: `${daysWithTime[daysOfThisWeekArr[newCount]].timeWork === 0 ? 5 : findingTheLargestValue(daysOfThisWeekArr, daysWithTime, daysWithTime[daysOfThisWeekArr[newCount]].timeWork)}px`,
                        width: '77px',
                        background: `${daysOfThisWeekArr[newCount] === today ? '#DC3E22' : '#C4C4C4'}`,
                    }
                })
            }
        }
        const maxNeedNumber = maxNumber(daysOfThisWeekArr, daysWithTime)
        return {
            fullInfo,
            maxNeedNumber
        } 
    }

}

function whatAWeek(number: number) {
    const day: Date = new Date()
    const lastWeekDay = new Date(day.setDate(day.getDate() - number))
    const dayOfWeek = lastWeekDay.getDay()
    const daysOfWeekArr: any = []
    const options: any = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC'
    };
    for (let j = dayOfWeek - 1; j > 0; j--) {
        const nextDay = new Date(lastWeekDay);
        const time = nextDay.setDate(lastWeekDay.getDate() - j)
        const dayReturn = new Date(time)
        daysOfWeekArr.push(dayReturn.toLocaleString("ru", options))
    }
    for (let i = 0; i < 7; i++) {
        if (dayOfWeek + i > 7) break
        const nextDay = new Date(lastWeekDay);
        const time = nextDay.setDate(lastWeekDay.getDate() + i)
        const dayReturn = new Date(time)
        daysOfWeekArr.push(dayReturn.toLocaleString("ru", options))
    }
    return daysOfWeekArr
}

function daysInChooseWeek(arrDaysWithTime: any, daysOfWeekArr: any) {
    const daysOfThisWeekArr: string[] = []

    for (let i = 0; i < daysOfWeekArr.length; i++) {
        if (arrDaysWithTime.indexOf(daysOfWeekArr[i]) === -1) {
            continue
        } else {


            daysOfThisWeekArr.push(daysOfWeekArr[i])
        }
    }

    for (let i = 0; i < daysOfThisWeekArr.length; i++) {

    }

    return daysOfThisWeekArr
}

function findingTheLargestValue(necesariaWeekOfRedux: any, daysRedux: any, day: number) {
    const height = (day / maxNumber(necesariaWeekOfRedux, daysRedux)) * 336
    return height
}

function maxNumber(necesariaWeekOfRedux: any, daysRedux: any) {
    const keyNames = Object.keys(daysRedux);
    const timeArr: number[] = []
    for (let i = 0; i < necesariaWeekOfRedux.length; i++) {
        if (keyNames.indexOf(necesariaWeekOfRedux[i]) === -1) {
            continue
        } else {
            timeArr.push(daysRedux[necesariaWeekOfRedux[i]].timeWork)
        }
    }
    if (timeArr.length === 0) return 0
    const maxNumber = Math.max.apply(null, timeArr)
    return maxNumber
}
