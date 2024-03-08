import styles from "../Header/Header.module.scss"
import logoImage from "../../assets/logo.png"

const Header = () => {
  return (
      <header className={styles.header}>
          <img className={styles.logo} src={logoImage} />
      </header>
  )
}

export default Header