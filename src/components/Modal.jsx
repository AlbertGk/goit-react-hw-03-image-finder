import styles from '../styles/Modal.module.css';

export const Modal = ({ isModalOpen, onClick, onKeyDown, bigPicture }) => {
  return (
    isModalOpen && (
      <div className={styles.Overlay} onClick={onClick} onKeyDown={onKeyDown} tabIndex={0} >
        <div className={styles.Modal}>
          <img src={bigPicture.largeImageURL} alt="" />
        </div>
      </div>
    )
  );
};
