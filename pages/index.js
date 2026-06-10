import { useState } from 'react';
import Quiz from '../components/Quiz';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <Quiz />
    </main>
  );
}
