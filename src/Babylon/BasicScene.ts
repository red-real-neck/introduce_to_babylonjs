import {
  Scene,
  Engine,
  UniversalCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  GroundMesh,
  StandardMaterial,
} from "@babylonjs/core";

export default class BasicScene {
  private scene: Scene;
  private engine: Engine;

  constructor(canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, true);
    this.scene = this.createScene();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  createScene(): Scene {
    const scene: Scene = new Scene(this.engine);
    const camera: UniversalCamera = new UniversalCamera(
      "camera",
      new Vector3(0, 1, -3),
      this.scene
    );
    camera.attachControl();

    const light: HemisphericLight = new HemisphericLight(
      "light",
      new Vector3(0, 1, 0),
      this.scene
    );
    light.intensity = 0.7;

    const ground: GroundMesh = MeshBuilder.CreateGround(
      "ground",
      {
        width: 6,
        height: 6,
      },
      this.scene
    );

    const ball = MeshBuilder.CreateSphere(
      "ball",
      {
        diameter: 2,
      },
      this.scene
    );
    ball.position.y = 1;

    return scene;
  }
}
