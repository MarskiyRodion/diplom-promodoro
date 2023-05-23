import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MinusPomidorFromCart, PlusPomidorFromCart, RemoveAllItemFromList } from '../../../../storeRedux/actionTask';
import { EName, Icons } from '../../../Icons';
import { ModalDelete } from '../../../ModalDelete';
import { ModalEdit } from '../../../ModalEdit';
import styles from './dropdownmenu.css';

interface IPropsTaskList {
  task: ItaskList[];
  thisTask: ItaskList
}

interface ItaskList {
  id: number;
  text: string;
  pomidors: number;
}

export function DropdownMenu(props: IPropsTaskList) {
  const dispatch = useDispatch()
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)

  function handleDelete() {
    setOpenModalDelete(true)
    // dispatch(RemoveAllItemFromList(props.thisTask.id))
  }

  function handlePlus() {
    dispatch(PlusPomidorFromCart(props.thisTask.id))
  }

  function handleMinus() {
    dispatch(MinusPomidorFromCart(props.thisTask.id))
  }

  function handleEdit() {
    setOpenModalEdit(true)
  }

  return (
    <div>
      <ul className={styles.dropdown}>
        <li className={styles.dropdownItem}>
          <Icons name={EName.plus} />
          <span className={styles.dropdownDescr} onClick={handlePlus}>Увеличить</span>
        </li>
        <li className={styles.dropdownItem}>
          <Icons name={EName.minus} />
          <span className={styles.dropdownDescr} onClick={handleMinus}>Уменьшить</span>
        </li>
        <li className={styles.dropdownItem}>
          <Icons name={EName.edit} />
          <span className={styles.dropdownDescr} onClick={handleEdit}>Редактировать</span>
        </li>
        <li className={styles.dropdownItem} onClick={handleDelete}>
          <Icons name={EName.urn} />
          <span className={styles.dropdownDescr}>Удалить</span>
        </li>
      </ul>
      {openModalEdit && <ModalEdit onClose={() => setOpenModalEdit(false)} id={props.thisTask.id}/>}
      {openModalDelete && <ModalDelete onClose={() => setOpenModalDelete(false)} id={props.thisTask.id}/>}
    </div>
  );
}
