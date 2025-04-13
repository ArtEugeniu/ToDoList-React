import styles from './ConfirmPopup.module.scss';
import { useAppSelector } from '../../hooks/hooks';
import { useConfirmPopup } from '../../hooks/useConfirmPopup';


const ConfirmPopup: React.FC = () => {
  const { onCancel, onConfirm } = useConfirmPopup();
  const popupState = useAppSelector(store => store.popups);

  if (popupState.isOpen === false) return null;
  if (popupState.type === 'edit') return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <p className={styles.popupMessage}>{popupState.message}</p>
        <div className={styles.popupButtons}>
          <button className={styles.popupButton} onClick={() => onConfirm()}>Yes</button>
          <button className={styles.popupButton} onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmPopup;