import styles from '../styles/Modal.module.css';

export const Modal = ({ isModalOpen, bigPicture }) => {
  return (
    isModalOpen && (
      <div className={styles.Overlay}>
        <div className={styles.Modal}>
          <img src={bigPicture.largeImageURL} alt="" />
        </div>
      </div>
    )
  );
};
