import React from 'react';
import styles from './index.css';
import SideBar from './SideBar';
import withRouter from 'umi/withRouter';

function Layout({ children, location }) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
            </div>
            <div className={styles.body}>
                <SideBar className={styles.sideBar} location={location}/>
                <div className={styles.content}>
                    <div className={styles.main}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Layout);