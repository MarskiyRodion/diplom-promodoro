import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectWeek } from '../../../storeRedux/actionStatistic';
import styles from './activitipanel.css';

export function ActivitiPanel() {
  const dispatch = useDispatch()

  function handleSelect(event: ChangeEvent<HTMLSelectElement>) {
    dispatch(selectWeek(event.target.value))
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Ваша активность</h2>
      <select className={styles.select} onChange={handleSelect}>
        <option value="Эта неделя">Эта неделя</option>
        <option value="Прошедшая неделя">Прошедшая неделя</option>
        <option value="2 недели назад">2 недели назад</option>
      </select>
    </div>
  );
}
