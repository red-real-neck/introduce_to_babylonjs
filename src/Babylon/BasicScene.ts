import {
  Scene,
  Engine,
  UniversalCamera,
  Vector3,
  DirectionalLight,
  MeshBuilder,
  GroundMesh,
  StandardMaterial,
  Texture,
  HemisphericLight,
  Vector2,
} from "@babylonjs/core";

export default class BasicScene {
  private scene: Scene | undefined;
  private engine: Engine | undefined;
  private uvScale: number = 2;

  start(canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, true);
    this.scene = new Scene(this.engine);
    this.createScene();

    this.engine.runRenderLoop(() => {
      this.scene?.render();
    });
  }

  createScene() {
    if (!this.scene) return;
    const camera: UniversalCamera = new UniversalCamera(
      "camera",
      new Vector3(0, 1, -3),
      this.scene
    );
    camera.attachControl();

    camera.speed = 0.025;

    const light: DirectionalLight = new DirectionalLight(
      "light",
      new Vector3(1, -1, 0),
      this.scene
    );

    light.intensity = 0.5;

    const hemiLight: HemisphericLight = new HemisphericLight(
      "hemiLight",
      new Vector3(3, 5, 4),
      this.scene
    );

    hemiLight.intensity = 0.5;

    const ground: GroundMesh = MeshBuilder.CreateGround(
      "ground",
      {
        width: 6,
        height: 6,
        subdivisions: 1000,
        updatable: true,
      },
      this.scene
    );

    ground.applyDisplacementMap(
      "/textures/ground/ground_disp.jpg",
      0,
      0.15,
      undefined,
      undefined,
      new Vector2(this.uvScale, this.uvScale)
    );

    const ball = MeshBuilder.CreateSphere(
      "ball",
      {
        diameter: 2,
        segments: 500,
        updatable: true,
      },
      this.scene
    );
    ball.position.y = 1;

    ball.applyDisplacementMap(
      "/textures/ball/ball_displacement.jpg",
      0,
      0.015,
      undefined,
      undefined,
      new Vector2(this.uvScale, this.uvScale)
    );

    ground.material = this.createGroundMaterial();
    ball.material = this.createBallMaterial();
  }

  createGroundMaterial(): StandardMaterial {
    const groundMat = new StandardMaterial("groundMat", this.scene);
    const texturesArray: Array<Texture> = [];

    const diffuseTex = new Texture(
      "/textures/ground/ground_diff.jpg",
      this.scene,
      undefined,
      undefined,
      undefined,
      undefined,
      (err) => {
        console.log(err);
      }
    );
    groundMat.diffuseTexture = diffuseTex;
    texturesArray.push(diffuseTex);

    const AOTex = new Texture(
      "/textures/ground/ground_ao.jpg",
      this.scene,
      undefined,
      undefined,
      undefined,
      undefined,
      (err) => {
        console.log(err);
      }
    );
    groundMat.ambientTexture = AOTex;
    texturesArray.push(AOTex);

    const normalTex = new Texture(
      "/textures/ground/ground_nor.jpg",
      this.scene,
      undefined,
      undefined,
      undefined,
      undefined,
      (err) => {
        console.log(err);
      }
    );
    groundMat.bumpTexture = normalTex;
    groundMat.invertNormalMapX = true;
    groundMat.invertNormalMapY = true;
    texturesArray.push(normalTex);

    const roughTex = new Texture(
      "/textures/ground/ground_rough.jpg",
      this.scene,
      undefined,
      undefined,
      undefined,
      undefined,
      (err) => {
        console.log(err);
      }
    );
    groundMat.useGlossinessFromSpecularMapAlpha = true;
    groundMat.specularTexture = roughTex;
    groundMat.specularPower = 1000;
    texturesArray.push(roughTex);

    for (let i = 0; i < texturesArray.length; i++) {
      texturesArray[i].uScale = this.uvScale;
      texturesArray[i].vScale = this.uvScale;
    }

    return groundMat;
  }

  createBallMaterial(): StandardMaterial {
    const ballMat = new StandardMaterial("ballMat", this.scene);
    const texturesArray: Array<Texture> = [];

    const diffuseTex = new Texture(
      "/textures/ball/ball_diffuse.jpg",
      this.scene,
      undefined,
      undefined,
      undefined,
      undefined,
      (err) => {
        console.log(err);
      }
    );
    ballMat.diffuseTexture = diffuseTex;
    texturesArray.push(diffuseTex);

    const AOTex = new Texture(
      "/textures/ball/ball_AO.jpg",
      this.scene,
      undefined,
      undefined,
      undefined,
      undefined,
      (err) => {
        console.log(err);
      }
    );
    ballMat.ambientTexture = AOTex;
    texturesArray.push(AOTex);

    const normalTex = new Texture(
      "/textures/ball/ball_normal.jpg",
      this.scene,
      undefined,
      undefined,
      undefined,
      undefined,
      (err) => {
        console.log(err);
      }
    );
    ballMat.bumpTexture = normalTex;
    ballMat.invertNormalMapX = true;
    ballMat.invertNormalMapY = true;
    texturesArray.push(normalTex);

    const roughTex = new Texture(
      "/textures/ball/ball_rough.jpg",
      this.scene,
      undefined,
      undefined,
      undefined,
      undefined,
      (err) => {
        console.log(err);
      }
    );
    ballMat.useGlossinessFromSpecularMapAlpha = true;
    ballMat.specularTexture = roughTex;
    ballMat.specularPower = 1000;
    texturesArray.push(roughTex);

    for (let i = 0; i < texturesArray.length; i++) {
      texturesArray[i].uScale = this.uvScale;
      texturesArray[i].vScale = this.uvScale;
    }

    return ballMat;
  }
}
