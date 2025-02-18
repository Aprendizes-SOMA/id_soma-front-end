import "../../styles/globals.css";
import { metadata } from "./metadada"

export { metadata };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}
