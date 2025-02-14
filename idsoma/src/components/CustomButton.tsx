"use client";

import React from "react";
import styles from "@/styles/components/CustomButton.module.css";

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick, color = "primary", type = "button" }) => {
  return (
    <button className={`${styles.button} ${styles[color]}`} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default CustomButton;
