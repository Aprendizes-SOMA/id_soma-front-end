interface TextInputProps {
  label: string;
  id: string;
  type: string;
  value: string;
  placeholder: string;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  toggleShowPassword?: () => void;
}
