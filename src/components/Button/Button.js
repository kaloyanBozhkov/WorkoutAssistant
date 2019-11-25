import React from "react";

import styles from "./button.module.scss";

const Button = ({ label, action, disabled = false }) => {
  return (
    <button onClick={action} className={styles.button} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
