"use client";

import React from "react";
import styles from "@/styles/CustomButton.module.css";

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick, color = "primary", type = "button", disabled }) => {
  return (
    <button className={`${styles.button} ${styles[color]}`} onClick={onClick} type={type} disabled={disabled}>
      {text}
    </button>
  );
};

export default CustomButton;
