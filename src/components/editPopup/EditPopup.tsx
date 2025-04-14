import styles from './EditPopup.module.scss';
import { useConfirmPopup } from '../../hooks/useConfirmPopup';

interface EditPopupTypes {
  inputsValue: { title: string, description: string }
  editPopupState: {
    isOpen: boolean
    type: 'deleteSingle' | 'deleteAll' | 'edit' | null
    message: string
    id?: string
  }
  onInputChange: (value: string, name: string) => void
}

const EditPopup: React.FC<EditPopupTypes> = ({ inputsValue, editPopupState, onInputChange }) => {

  const { onCancel, onConfirm } = useConfirmPopup()

  if (!editPopupState.isOpen || editPopupState.type !== 'edit') return null;


  return (
    <div className={styles.editOverlay}>
      <div className={styles.editContainer}>
        <ul className={styles.editList}>
          <li className={styles.editItem}>
            <input className={styles.editInput} type="text" name="title" value={inputsValue.title} onChange={(e) => onInputChange(e.target.value, e.target.name)}/>
          </li>
          <li className={styles.editItem}>
            <textarea className={`${styles.editInput} ${styles.editInputDesc}`} name="description" value={inputsValue.description} onChange={(e) => onInputChange(e.target.value, e.target.name)}/>
          </li>
        </ul>
        <div className={styles.editButtons}>
          <button className={styles.editButton} onClick={() => onConfirm(inputsValue.title, inputsValue.description)}>Save</button>
          <button className={styles.editButton} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default EditPopup;