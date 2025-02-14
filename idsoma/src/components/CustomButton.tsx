import React from "react";
import styles from "@/styles/components/CustomButton.module.css";

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick, color = "primary" }: CustomButtonProps) => {
  return (
    <button className={`${styles.button} ${styles[color]}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default CustomButton;
