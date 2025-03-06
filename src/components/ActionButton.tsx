import React from "react";
import styles from "@/styles/ActionButton.module.css";
import Image from 'next/image'

const ActionButton: React.FC<ActionButtonProps> = ({ iconSrc, altText, onClick, disabled }) => {
  return (
    <button className={styles.iconButton} onClick={onClick} disabled={disabled}>
      <Image src={iconSrc} alt={altText} className={styles.icon} width={30} height={30} />
    </button>
  );
};

export default ActionButton;
