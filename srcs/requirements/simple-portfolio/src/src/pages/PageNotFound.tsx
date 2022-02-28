import React from "react";
import styles from "./PageNotFound.module.scss";

export interface PageNotFoundProps {}

const PageNotFound: React.FC<PageNotFoundProps> = ({}) => {
  return (
    <div>
      <blockquote className={styles.quote}>404: Page Not Found</blockquote>
    </div>
  );
};

export default PageNotFound;
