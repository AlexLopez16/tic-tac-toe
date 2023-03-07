import styles from '../styles/modal.module.css'

export const UserLeaveModal = () => {
    return (
        <div className={styles.modal} >
            <div className={`${styles.modalContent} `} >
                <h3 style={{ fontSize: '3rem' }}>
                    User left the room...
                </h3>
                <div className={styles.modalFooter}>
                    <button className={styles.grey} onClick={() => window.location.reload()}>
                        QUIT
                    </button>
                </div>
            </div>
        </div >
    )
}
