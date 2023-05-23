import React, { ChangeEvent, FormEvent, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useStore } from 'react-redux';
import { EditTask } from '../../storeRedux/actionTask';
import { EName, Icons } from '../Icons';
import styles from './modaledit.css';

interface IPropsModalEdit {
  onClose: () => void;
  id: number;
}

export function ModalEdit(props: IPropsModalEdit) {
  const store = useStore()
  const dispatch = useDispatch()
  const itemEdit = store.getState().rootReducer.taskList.find((item: any) => item.id === props.id)
  const [value, setValue] = useState<string>(itemEdit.text)

  const node = document.querySelector('#modal_root');
  if (!node) return null

  function formSubmit(event: FormEvent) {
    event.preventDefault()
    props.onClose()
    dispatch(EditTask(props.id, value))
  }

  function formClose() {
    props.onClose()
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  return ReactDOM.createPortal((
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.modalCloe} onClick={formClose}>
          <Icons name={EName.modalClose} />
        </div>
        <form action='' className={styles.modalForm} onSubmit={formSubmit}>
          <h3 className={styles.title}>Редактировать задачу?</h3>
          <input type="text" value={value} onChange={handleChange} className={styles.input} />
          <button className={styles.btnEdit}>Изменить</button>
        </form>
      </div>
    </div>
  ), node);
}
