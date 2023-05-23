import React, { ChangeEvent, FormEvent, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useStore } from 'react-redux';
import { EditTask, RemoveAllItemFromList } from '../../storeRedux/actionTask';
import { EName, Icons } from '../Icons';
import styles from './modaldelete.css';

interface IPropsModalEdit {
  onClose: () => void;
  id: number;
}

export function ModalDelete(props: IPropsModalEdit) {
  const dispatch = useDispatch()

  const node = document.querySelector('#modal_root_delete');
  if (!node) return null

  function formSubmit(event: FormEvent) {
    event.preventDefault()
    props.onClose()
    dispatch(RemoveAllItemFromList(props.id))
  }

  function formClose() {
    props.onClose()
  }


  return ReactDOM.createPortal((
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.modalCloe} onClick={formClose}>
          <Icons name={EName.modalClose} />
        </div>
        <form action='' className={styles.modalForm} onSubmit={formSubmit}>
          <h3 className={styles.title}>Удалить задачу?</h3>
          <button className={styles.btnDelete}>Удалить</button>
          <span className={styles.modalCancellation} onClick={formClose}>Отмена</span>
        </form>
      </div>
    </div>
  ), node);
}
