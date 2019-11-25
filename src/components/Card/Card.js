import React from "react";
import styles from "./card.module.scss";

const Card = ({ label, value }) => {
  return (
    <div className={styles.card}>
      <label>{label}</label>
      {typeof value === "string" || typeof value === "number" ? (
        <p>{value}</p>
      ) : (
        value
      )}
    </div>
  );
};

export default Card;
