import React from 'react';
import { useStore } from 'react-redux';
import { EName, Icons } from '../../Icons';
import styles from './focuspausestop.css';

export function FocusPauseStop() {
  const store = useStore();
  const stop = store.getState().rootReducerStatistic.stop;
  const pause = store.getState().rootReducerStatistic.minutesPause;
  const work = store.getState().rootReducerStatistic.minutesWork;

  const minutes = (Math.floor(pause / 60));
  const seconds = (pause - minutes * 60);
  const hours = (Math.floor(pause / (60*60)));

  //Считаем фокус
  const focus = Math.floor((work / (work + pause)) * 100);

  return (
    <div className={styles.container}>
      <div className={!focus ? styles.box : styles.boxFosusActive}>
        <div className={styles.textNumber}>
          <span className={styles.text}>Фокус</span>
          <span className={styles.number}>{focus ? focus : 0}%</span>
        </div>
        <Icons name={EName.timeFocus} className={!focus ? styles.icon : styles.iconFocuseActive}/>
      </div>
      <div className={pause === 0 ? styles.box : styles.boxPauseActive}>
        <div className={styles.textNumber}>
          <span className={styles.text}>Время на паузе</span>
          <span className={styles.number}>{pause === 0 ? '0м' : `${hours}ч ${minutes}м`}</span>
        </div>
        <Icons name={EName.timePause} className={pause === 0 ? styles.icon : styles.iconPauseActive}/>
      </div>
      <div className={stop === 0 ? styles.box : styles.boxStopActive}>
        <div className={styles.textNumber}>
          <span className={styles.text}>Остановки</span>
          <span className={styles.number}>{stop === 0 ? 0 : stop}</span>
        </div>
        <Icons name={EName.timeStop} className={stop === 0 ? styles.icon : styles.iconStopActive}/>
      </div>
    </div>
  );
}
