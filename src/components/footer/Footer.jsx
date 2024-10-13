import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Dev - Aniket Patil</div>
      <div className={styles.text}>
        Made with ❤️ in India.
      </div>
    </div>
  );
};

export default Footer;
