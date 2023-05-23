import React from 'react';
import { EName, Icons } from '../Icons';
import styles from './header.css';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Icons name={EName.logo} />
          <Link to='/' className={styles.logo}>pomodoro_box</Link>
        </div>
        <div>
          <Icons name={EName.statistics} />
          <Link to="/statistics" className={styles.statistics}>Статистика</Link>
        </div>
      </div>
    </div>
  );
}
