import styles from './EditPopup.module.scss';

interface IEditPopupPropsType {
  isOpen: boolean
  newText: { title: string, description: string }
  onCancel: () => void
  onChange: (value: string, name: string) => void
  onAccept: () => void
}

const EditPopup: React.FC<IEditPopupPropsType> = ({ isOpen, newText, onCancel, onChange, onAccept }) => {

  if (!isOpen) return;


  return (
    <div className={styles.editOverlay}>
      <div className={styles.editContainer}>
        <ul className={styles.editList}>
          <li className={styles.editItem}>
            <input className={styles.editInput} type="text" name="title" value={newText.title} onChange={(e) => onChange(e.target.value, e.target.name)} />
          </li>
          <li className={styles.editItem}>
            <textarea className={`${styles.editInput} ${styles.editInputDesc}`} name="description" value={newText.description} onChange={(e) => onChange(e.target.value, e.target.name)} />
          </li>
        </ul>
        <div className={styles.editButtons}>
          <button className={styles.editButton} onClick={onAccept}>Save</button>
          <button className={styles.editButton} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default EditPopup;