import React from "react";
import styles from "./index.css";
import SideBar from "./SideBar";
import withRouter from "umi/withRouter";

function Layout({ children, location }) {
  return (
    <div className={styles.container}>
      <SideBar className={styles.sideBar} location={location} />
      <div className={styles.body}>
        <div className={styles.header} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default withRouter(Layout);
