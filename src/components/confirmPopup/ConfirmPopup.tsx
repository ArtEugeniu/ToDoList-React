import styles from './ConfirmPopup.module.scss';

interface IConfirmPopuptypes {
  isOpen: boolean
  message: string
  onCancel: () => void
  onConfirm: () => void
}

const ConfirmPopup: React.FC<IConfirmPopuptypes> = ({ isOpen, onCancel, onConfirm, message }) => {



  if (!isOpen) return null

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <p className={styles.popupMessage}>{message}</p>
        <div className={styles.popupButtons}>
          <button className={styles.popupButton} onClick={onConfirm}>Yes</button>
          <button className={styles.popupButton} onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmPopup;