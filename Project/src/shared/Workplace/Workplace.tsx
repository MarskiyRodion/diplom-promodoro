import React from 'react';
import { TaskList } from './TaskList';
import { TextAbout } from './TextAbout';
import { TimerPomidor } from './Timer';
import styles from './workplace.css';

export function Workplace() {
  return (
    <div className={styles.container}>
      <div>
        <TextAbout />
        <TaskList />
      </div>
      <TimerPomidor />
    </div>
  );
}
