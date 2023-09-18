import { Link } from 'react-router-dom';
import React from 'react';
import styles from './styles.module.css';

const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>CodeHub</h1>
                <div className={styles.nav_buttons}>
                 
                    <Link to ="/">
                    <button className={styles.white_btn}>
                       Home
                    </button>
                    </Link>
                    
                    <Link to="/add-problem">
                    <button className={styles.white_btn}>
                        Problem
                    </button>
                    </Link>

                    <Link to ="/about">
                    <button className={styles.white_btn}>
                        About
                    </button>
                    </Link>

                    <button className={styles.red_btn} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Main;
