import React, { useEffect, useRef, useState } from 'react';
import styles from './timer.css';
import { useDispatch, useStore } from 'react-redux';
import { MinusPomidorFromCart, RootState } from '../../../storeRedux/actionTask';
import { PomidorsComplete, Stops, TimePause, TimeWork, timeWorkDay } from '../../../storeRedux/actionStatistic';

export function TimerPomidor() {
  // Числа в таймере
  let minuteWork = 25;
  let minuteBreak = 5;
  const [timeLeft, setTimeLeft] = useState(0);
  const [initTimerNumber, setInitTimerNumber] = useState<number>(25)

  //работа с кнопками
  const [mode, setMode] = useState('work')
  const [isStart, setIsStart] = useState(false)
  const [isCounting, setIsCounting] = useState(false);
  const [isBreak, setIsBreak] = useState(false)
  const [isPause, setIsPause] = useState(false)
  const [isPauseBreak, setIsPauseBreak] = useState(false)

  const timeLeftRef = useRef(timeLeft);
  const isCountingRef = useRef(isCounting);
  const modeRef = useRef(mode);

  // Данные из Redux
  const store = useStore();
  const dispatch = useDispatch()
  const [taskStoreId, setTaskStoreId] = useState<number>()
  const [taskStorePomidors, setTaskStorePomidors] = useState<any>()
  useEffect(() => {
    store.subscribe(() => {
      if (store.getState().rootReducer.taskList.length !== 0) {
        setTaskStoreId(store.getState().rootReducer.taskList[0].id);
        setTaskStorePomidors(store.getState().rootReducer.taskList[0].pomidors);
      }
    })
  }, [])

  function initTimer(minuteWork: number) {
    timeLeftRef.current =  modeRef.current === 'work' ? 25* 60 : minuteWork * 60;
    setTimeLeft(timeLeftRef.current)
  }

  function switchMode() {
    const nextMode = modeRef.current === 'work' ? 'break' : 'work';
    const nextSeconds = (nextMode === 'work' ? minuteWork : minuteBreak) * 60;
    modeRef.current = nextMode

    if (modeRef.current === 'break') {
      dispatch(MinusPomidorFromCart(taskStoreId));
      dispatch(PomidorsComplete())
      if (taskStorePomidors === 1) {
        modeRef.current = 'work'
        setTimeLeft(minuteWork * 60)
        timeLeftRef.current = minuteWork * 60;
        setIsCounting(false)
        isCountingRef.current = false
        setIsPause(false)
        setIsStart(false)
        setIsBreak(false)
        return
      }
    }

    setTimeLeft(nextSeconds)
    timeLeftRef.current = nextSeconds
  }

  function tick() {
    timeLeftRef.current--
    setTimeLeft(timeLeftRef.current)
  }

  useEffect(() => {

    initTimer(initTimerNumber)

    const interval = setInterval(() => {
      if (!isCountingRef.current) {
        return
      }

      if (timeLeftRef.current === 0) {
        return switchMode();
      }

      tick()
      dispatch(TimeWork())
      dispatch(timeWorkDay())
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [modeRef, taskStorePomidors, timeLeftRef])

  function handleStart() {
    setIsCounting(true)
    isCountingRef.current = true
    setIsStart(true)
    setIsBreak(true)
  }

  function handlePause() {
    setIsCounting(false)
    isCountingRef.current = false
    setIsPause(true)
    setIsBreak(false)
  }

  function handleResume() {
    setIsCounting(true)
    isCountingRef.current = true
    setIsPause(false)
    setIsBreak(true)
  }

  function handleComplete() {
    dispatch(MinusPomidorFromCart(taskStoreId))
    dispatch(PomidorsComplete())
    setInitTimerNumber(5)
    modeRef.current = 'break'
    timeLeftRef.current = minuteBreak * 60
    setTimeLeft(minuteBreak * 60)
    setIsCounting(true)
    isCountingRef.current = true
    setIsPause(false)
    setIsBreak(true)
  }

  function handlePauseBreak() {
    setIsCounting(false)
    isCountingRef.current = false
    setIsPauseBreak(true)
    setIsBreak(false)
  }

  function handlePauseResume() {
    setIsPauseBreak(false)
    isCountingRef.current = true
    setIsCounting(true)
    setIsBreak(true)
  }

  function handleStop() {
    dispatch(Stops())
    setTimeLeft(minuteWork * 60)
    timeLeftRef.current = minuteWork * 60
    setIsCounting(false)
    isCountingRef.current = false
    setIsPause(false)
    setIsStart(false)
    setIsBreak(false)
  }

  function handlePauseComplete() {
    modeRef.current = 'work'
    setTimeLeft(minuteWork * 60)
    timeLeftRef.current = minuteWork * 60
    setIsCounting(false)
    isCountingRef.current = false
    setIsPause(false)
    setIsStart(false)
    setIsBreak(false)
  }

  function handleTimePlus() {
    setTimeLeft(timeLeft + 60)
    timeLeftRef.current = timeLeft + 60
  }

  // Дисатч данных в Redux время на паузе
  useEffect(() => {

    const intervalPause = setInterval(() => {
      if (!isCountingRef.current && !isCounting && isPause && !isBreak) {
        dispatch(TimePause())
      } else return
    }, 1000)


    return () => {
      clearInterval(intervalPause);
    };
  }, [isCountingRef.current, isCounting, isPause, isBreak])

  const getPadTime = (time: any) => time.toString().padStart(2, "0")
  const minutes = getPadTime(Math.floor(timeLeft / 60));
  const seconds = getPadTime(timeLeft - minutes * 60);


  return (
    <div className={styles.container}>
      <div className={!isStart ? styles.timerHeader : modeRef.current === 'work' ? styles.timerHeaderStart : styles.timerHeaderBreak}>
        <p className={styles.subtitle}>{!store.getState().rootReducer.taskList[0] ? 'Напишите задачу' : store.getState().rootReducer.taskList[0].text}</p>
        <p className={styles.pomidors}>Помидор {store.getState().rootReducerStatistic.pomidors}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.timeTimer}>
          <h2 className={!isBreak ? styles.time : modeRef.current === 'work' ? styles.timeRun : styles.timeBreak}>{minutes}:{seconds}</h2>
          <svg className={styles.timeBtn} onClick={handleTimePlus} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="25" fill="#C4C4C4" />
            <path d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z" fill="white" />
          </svg>
        </div>
        <p className={styles.taskAndNumber}><span className={styles.number}>Задача 1 - </span>{!store.getState().rootReducer.taskList[0] ? 'Напишите задачу' : store.getState().rootReducer.taskList[0].text}</p>
        {modeRef.current === 'work' && !isCounting && !isPause &&
          <div>
            <button className={styles.start} disabled={store.getState().rootReducer.taskList.length !== 0 ? false : true} onClick={handleStart}>Старт</button>
            <button className={styles.stopDisabled}>Стоп</button>
          </div>}
        {modeRef.current === 'work' && isCounting && !isPause &&
          <div>
            <button className={styles.start} onClick={handlePause}>Пауза</button>
            <button className={styles.stop} onClick={handleStop}>Стоп</button>
          </div>
        }
        {modeRef.current === 'work' && isPause &&
          <div>
            <button className={styles.start} onClick={handleResume}>Продолжить</button>
            <button className={styles.stop} onClick={handleComplete}>Сделанно</button>
          </div>
        }
        {modeRef.current === 'break' && !isPauseBreak &&
          <div>
            <button className={styles.start} onClick={handlePauseBreak}>Пауза</button>
            <button className={styles.stop} onClick={handlePauseComplete}>Пропустить</button>
          </div>
        }
        {modeRef.current === 'break' && isPauseBreak &&
          <div>
            <button className={styles.start} onClick={handlePauseResume}>Продолжить</button>
            <button className={styles.stop} onClick={handlePauseComplete}>Пропустить</button>
          </div>
        }
      </div>
    </div>
  );
}
