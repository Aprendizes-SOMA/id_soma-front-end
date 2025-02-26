import React from "react";
import styles from "@/styles/ActionButton.module.css";

const ActionButton: React.FC<ActionButtonProps> = ({ iconSrc, altText, onClick, disabled }) => {
  return (
    <button className={styles.iconButton} onClick={onClick} disabled={disabled}>
      <img src={iconSrc} alt={altText} className={styles.icon} />
    </button>
  );
};

export default ActionButton;
