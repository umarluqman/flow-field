import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";
const Single = dynamic(
  () => import("../aliran/single").then((mod) => mod.Sketch),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <div className={styles.container}>
      <Single />
    </div>
  );
}
