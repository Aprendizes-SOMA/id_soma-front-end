interface TextInputProps {
  label: string;
  id: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  toggleShowPassword?: () => void;
}