import React, { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { Dropdown } from '../../../Dropdown';
import { EName, Icons } from '../../../Icons';
import { DropdownMenu } from '../DropdownMenu';
import styles from './tasks.css';

interface ItaskList {
  id: number;
  text: string;
  pomidors: number;
}

export function Tasks() {
  const [taskStore, setTaskStore] = useState<ItaskList[]>()
  const [pomidors, setPomidors] = useState<number>()
  const store = useStore();
  let arrayPomidors: number[] = []
  useEffect(() => {
    store.subscribe(() => {
      setTaskStore(store.getState().rootReducer.taskList)
    })

    store.getState().rootReducer.taskList.map((item: any) => {
      arrayPomidors.push(item.pomidors)
    })
    if (arrayPomidors.length !== 0) {
      setPomidors(arrayPomidors.reduce((a, b) => a + b))
    }

    return
  }, [arrayPomidors, taskStore])


  return (
    <div>
      <ul className={styles.taskList}>
        {store.getState().rootReducer.taskList.map((item: ItaskList) => {
          return (
            <li className={styles.task} key={item.id}>
              <div>
                <span className={styles.taskNumber}>{item.pomidors}</span>
                <span className={styles.taskDescr}>{item.text}</span>
              </div>
              <Dropdown
                button={
                  <button>
                    <Icons name={EName.menu} />
                  </button>
                }
              >
                <DropdownMenu task={store.getState().rootReducer.taskList} thisTask={item} />
              </Dropdown>
            </li>
          )
        })}
      </ul>
      {pomidors && <p className={styles.minute}>{store.getState().rootReducer.taskList.length !== 0 ? `${pomidors * 25} мин` : false}</p>}
    </div>
  );
}
