import { useEffect, useRef, useState } from "react";
import BasicScene from "../BasicScene";
import styles from "./styles.module.css";

interface FirstSceneProps {}

export const BabylonCanvas: React.FC<FirstSceneProps> = () => {
  const babylonCanvas = useRef<HTMLCanvasElement>(null);
  const [basicScene] = useState<BasicScene>(new BasicScene());

  useEffect(() => {
    const canvas = babylonCanvas.current!;
    basicScene.start(canvas);
  }, []);
  return (
    <>
      <canvas className={styles.canvas} ref={babylonCanvas}></canvas>
    </>
  );
};
