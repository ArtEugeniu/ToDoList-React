import styles from './ResponsiveMessage.module.scss'

const ResponsiveMessage: React.FC = () => {

  return (
    <div className={styles.message}>
      <p>
      Oops! Mobile version is still in progress 🛠️
      </p>
        <span>Please open this app on a bigger screen for the full experience 😇</span>
    </div>
  )
}

export default ResponsiveMessage;



