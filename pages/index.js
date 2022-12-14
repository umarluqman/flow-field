import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";
const Multi = dynamic(
  () => import("../aliran/multi").then((mod) => mod.Sketch),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <div className={styles.container}>
      <Multi />
    </div>
  );
}
