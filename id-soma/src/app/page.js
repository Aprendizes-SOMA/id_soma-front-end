import Image from "next/image";
import styles from "./page.module.css";
import HomePage from "./pages/Index";
import CollaboratorsPage from "./pages/colaboradores";
import LoginAdmin from "./pages/admin/login";
import ListCollaborators from "../app/pages/admin/listColaboradores";

export default function Home() {
  return (
    <HomePage/>
  );
}
// teste de commit