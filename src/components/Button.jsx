import styles from '../styles/Button.module.css';

export const Button = ({ pictures, onClick }) => {
    return (
        (pictures.length >0) && (
      <button type="button" className={styles.Button} onClick={onClick}>
        Load more
      </button>
    )
  );
};
