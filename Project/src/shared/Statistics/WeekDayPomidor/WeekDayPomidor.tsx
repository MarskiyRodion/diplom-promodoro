import React, { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { EName, Icons } from '../../Icons';
import styles from './weekdaypomidor.css';
import { necessaryWeek } from './weekDays';


export function WeekDayPomidor() {
  const [weekNow, setWeekNow] = useState<any>()
  const [maxNumber, setMaxNumber] = useState<any>()
  // Работа с датой
  const day: Date = new Date()
  const daysWeekShort = [
    'Вс',
    'Пн',
    'Вт',
    'Ср',
    'Чт',
    'Пт',
    'Сб',
  ]

  const daysWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

  // Данные из стора
  const store = useStore();
  const pomidors = store.getState().rootReducerStatistic.pomidors;
  const timeWork = store.getState().rootReducerStatistic.minutesWork;
  const daysWithTime = store.getState().rootReducerStatistic.days;
  const arrDaysWithTime = Object.keys(daysWithTime)

  useEffect(() => {
    setWeekNow(necessaryWeek(arrDaysWithTime, daysWithTime, store.getState().rootReducerStatistic.weekValue).fullInfo)
    setMaxNumber(necessaryWeek(arrDaysWithTime, daysWithTime, store.getState().rootReducerStatistic.weekValue).maxNeedNumber)
    store.subscribe(() => {
      setWeekNow(necessaryWeek(arrDaysWithTime, daysWithTime, store.getState().rootReducerStatistic.weekValue).fullInfo)
      setMaxNumber(necessaryWeek(arrDaysWithTime, daysWithTime, store.getState().rootReducerStatistic.weekValue).maxNeedNumber)
    })
  }, [])


  // вычисляем время и шаг по оси y
  function scaleYTime(maxNumber: number) {
    if (maxNumber === undefined) return
    const minutes = (Math.floor(maxNumber / 60));
    const hours = (Math.floor(maxNumber / (60 * 60)));
    if (maxNumber === 0) return `данных нет`
    if (minutes === 0) return `${maxNumber} сек`
    if (hours === 0) return `${minutes} мин`
    const minutesWithHours = (minutes - (hours * 60))
    return `${hours} ч ${minutesWithHours} мин`
  }

  // Данные из стора + минуты
  const minutes = (Math.floor(timeWork / 60));
  const hours = (Math.floor(timeWork / (60 * 60)));

  return (
    <div className={styles.container}>
      <div className={styles.day}>
        <p className={styles.weekDay}>{daysWeek[day.getDay()]}</p>
        {timeWork === 0 && <p className={styles.infoDesct}>Нет данных</p>}
        {timeWork !== 0 &&
          <p className={styles.infoDesct}>Вы работали над задачами в течение <span className={styles.time}>{hours} часов {minutes} минут</span></p>
        }
      </div>
      <div className={styles.pomidor}>
        {pomidors !== 0 &&
          <div>
            <div className={styles.pomidorTrue}>
              <Icons name={EName.pomidorTrue} />
              <p className={styles.pomidorsQuantity}>x{pomidors}</p>
            </div>
            <div className={styles.pomidorsRed}>
              <p className={styles.pomidorsWhite}>{pomidors} помидора</p>
            </div>
          </div>
        }
        {pomidors === 0 &&
          <Icons name={EName.LazyTomato} />
        }
      </div>
      <div className={styles.week}>
        <div className={styles.weekLines}>
          <div className={styles.weekLinesTime}>
            <Icons className={styles.weekLine} name={EName.lineWeek} />
            <span className={styles.weekTime}>{scaleYTime(maxNumber)}</span>
          </div>
          <div className={styles.weekLinesTime}>
            <Icons className={styles.weekLine} name={EName.lineWeek} />
            <span className={styles.weekTime}>{scaleYTime(maxNumber * 0.75)}</span>
          </div>
          <div className={styles.weekLinesTime}>
            <Icons className={styles.weekLine} name={EName.lineWeek} />
            <span className={styles.weekTime}>{scaleYTime(maxNumber * 0.5)}</span>
          </div>
          <div className={styles.weekLinesTime}>
            <Icons className={styles.weekLine} name={EName.lineWeek} />
            <span className={styles.weekTime}>{scaleYTime(maxNumber * 0.25)}</span>
          </div>
        </div>
        <div className={styles.weekLineDays}>
          <ul className={styles.weekDays}>
            <li className={daysWeekShort.indexOf(daysWeekShort[day.getDay()]) !== 1 ? styles.weekLineDay : styles.weekLineDayActive}>Пн</li>
            <li className={daysWeekShort.indexOf(daysWeekShort[day.getDay()]) !== 2 ? styles.weekLineDay : styles.weekLineDayActive}>Вт</li>
            <li className={daysWeekShort.indexOf(daysWeekShort[day.getDay()]) !== 3 ? styles.weekLineDay : styles.weekLineDayActive}>Ср</li>
            <li className={daysWeekShort.indexOf(daysWeekShort[day.getDay()]) !== 4 ? styles.weekLineDay : styles.weekLineDayActive}>Чт</li>
            <li className={daysWeekShort.indexOf(daysWeekShort[day.getDay()]) !== 5 ? styles.weekLineDay : styles.weekLineDayActive}>Пт</li>
            <li className={daysWeekShort.indexOf(daysWeekShort[day.getDay()]) !== 6 ? styles.weekLineDay : styles.weekLineDayActive}>Сб</li>
            <li className={daysWeekShort.indexOf(daysWeekShort[day.getDay()]) !== 0 ? styles.weekLineDay : styles.weekLineDayActive}>Вс</li>
          </ul>
        </div>
        <div className={styles.weekColumnsContainer}>
          <ul className={styles.weekColumns}>
            {weekNow?.map((item: any) => (
              <li key={item.data} style={item.style}></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
