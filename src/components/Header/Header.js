import React from "react";

import Card from "./../Card/Card";

import styles from "./header.module.scss";

//{ day, week, workout, restIn, exercises }
const Header = ({ headerData }) => {
  return (
    <div className={styles.header}>
      {Object.keys(headerData).map((property, key) => (
        <Card
          key={key}
          label={property.split("_").join(" ")}
          value={headerData[property]}
        />
      ))}
    </div>
  );
};

export default Header;
