interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  color?: "primary" | "secondary" | "danger";
  type?: "button" | "submit" | "reset";
}
