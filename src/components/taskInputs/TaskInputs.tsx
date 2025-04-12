import styles from './TaskInputs.module.scss'

interface ITaskInputs {
  onInputChange: (value: string, id: string) => void
  titleValue: string
  descriptionValue: string
}

const TaskInputs: React.FC<ITaskInputs> = ({ onInputChange, titleValue, descriptionValue }) => {

  return (
    <ul className={styles.inputList}>
      <li className={styles.inputItem}>
        <label htmlFor="taskTitle"></label>
        <input
          id="taskTitle"
          name="title"
          type="text"
          placeholder="Title..."
          value={titleValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e.target.value, e.target.name)}
        />
      </li>
      <li className={styles.inputItem}>
        <label htmlFor="taskDescription"></label>
        <input
          id="taskDescription"
          name="description"
          type="text"
          placeholder="Description..."
          value={descriptionValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e.target.value, e.target.name)}
        />
      </li>
    </ul>
  )
}

export default TaskInputs;