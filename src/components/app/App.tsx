import styles from './App.module.scss';
import CreateTasks from '../../containers/createTasks/CreateTasks';
import TaskManager from '../../containers/taskManager/TaskManager';
import ResponsiveMessage from '../responsiveMessage/ResponsiveMessage';
import { useState, useEffect } from 'react';

const App: React.FC = () => {

  const [browserWindowWidth, setBrowserWindowWidth] = useState<number>(window.innerWidth);


  useEffect(() => {
    const onWindowChange = () => {
      setBrowserWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', onWindowChange);
    return () => window.removeEventListener('resize', onWindowChange);
  }, [window.innerWidth])




  return (
    <>
      {browserWindowWidth < 676 ?
        <ResponsiveMessage /> :
        <article className={styles.todoApp}>
          <h1>To Do App</h1>
          <CreateTasks />
          <TaskManager />
        </article>
      }
    </>

  )
}

export default App
