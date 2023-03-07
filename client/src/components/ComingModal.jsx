import styles from '../styles/modal.module.css'

export const ComingModal = ({ openModal, setOpenModal }) => {

    const handleCloseModal = () => {
        setOpenModal({
            ...openModal,
            cpu: false
        })
    }

    return (
        <div className={styles.modal} >
            <div className={`${styles.modalContent} `} >
                <h3>
                    Ups!!!
                    <br />
                    This mode is coming soon...
                </h3>
                <div className={styles.modalFooter}>
                    <button className={styles.grey} onClick={handleCloseModal}>
                        Ok
                    </button>
                </div>
            </div>
        </div>
    )
}
