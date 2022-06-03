import styles from '../styles/Modal.module.css';

export const Modal = ({isModalOpen}) => {
  return (
    ({ isModalOpen}) && (
      <div className={styles.Overlay}>
        <div className={styles.Modal}>
          <img src="" alt="" />
        </div>
      </div>
    )
  );
};
