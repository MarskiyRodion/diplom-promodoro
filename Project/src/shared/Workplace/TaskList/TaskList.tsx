import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTasks } from '../../../storeRedux/actionTask';
import styles from './tasklist.css';
import { Tasks } from './Tasks';

export function TaskList() {
  const dateNow: Date = new Date()

  const [value, setValue] = useState('')
  const [sub, setSub] = useState(false)
  const dispatch = useDispatch()

  function formSubmit(event: FormEvent) {
    event.preventDefault()
    setSub(true)
    dispatch(updateTasks({ id: dateNow.getTime(), text: value, pomidors: 1 }))
    setValue('')
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSub(false)
    setValue(event.target.value)
  }

  return (
    <div>
      <form action="" onSubmit={formSubmit} className={styles.form}>
        <input type="text" value={value} required onChange={handleChange} placeholder='Название задачи' className={styles.inputTask} />
        <button className={styles.btnAppend}>Добавить</button>
      </form>
      <Tasks />
    </div>
  );
}
