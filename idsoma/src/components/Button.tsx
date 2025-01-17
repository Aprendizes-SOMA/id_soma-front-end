import Link from "next/link";
import styles from "../styles/components/Button.module.css"

export default function Button({ content, href, type = "button" }: ButtonProps) {
	return (
		<Link href={href} passHref>
			<button className={styles.button} type={type}>{content}</button>
		</Link>
	)
}