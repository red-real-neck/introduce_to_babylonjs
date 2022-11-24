import { useEffect, useRef } from "react";
import BasicScene from "../BasicScene";
import styles from "./styles.module.css";

interface FirstSceneProps {}

export const BabylonCanvas: React.FC<FirstSceneProps> = () => {
  const babylonCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = babylonCanvas.current!;
    new BasicScene(canvas);
  }, []);
  return (
    <>
      <canvas className={styles.canvas} ref={babylonCanvas}></canvas>
    </>
  );
};
