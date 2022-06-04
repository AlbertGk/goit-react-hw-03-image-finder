import styles from '../styles/Modal.module.css';

export const Modal = ({ isModalOpen, onClick, onKeyPress, pictures }) => {
  return (
    isModalOpen && (
      <div className={styles.Overlay} onClick={onClick} onKeyPress={onKeyPress}>
        <div className={styles.Modal}>
          <img src="" alt="" />
        </div>
      </div>
    )
  );
};
