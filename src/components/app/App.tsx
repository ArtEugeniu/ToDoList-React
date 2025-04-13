import styles from './App.module.scss';
import { useState, useEffect } from 'react';
import CreateTasks from '../../containers/createTasks/CreateTasks';
import ResponsiveMessage from '../responsiveMessage/ResponsiveMessage';
import TaskListFilter from '../../containers/taskListFilterContainer/TaskListFilterContainer';
import ConfirmPopup from '../confirmPopup/ConfirmPopup';
import EditPopupContainer from '../../containers/editPopupContainer/EditPopupContainer'

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
          <TaskListFilter />
          <ConfirmPopup />
          <EditPopupContainer />
        </article>
      }
    </>

  )
}

export default App
