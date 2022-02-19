import { Light, PerspectiveCamera, Scene, Vector2, WebGLRenderer } from 'three';

export abstract class AnimationStage {
  protected readonly renderer: WebGLRenderer;
  protected readonly camera: PerspectiveCamera;
  public readonly scene: Scene;

  protected constructor(canvas: HTMLCanvasElement) {
    this.renderer = AnimationStage.createRenderer(canvas);
    this.camera = this.createCamera(canvas.offsetWidth / canvas.offsetHeight);
    this.scene = AnimationStage.createScene();
    this.scene.add(this.camera, ...this.createLight());
  }

  private static createRenderer(canvas: HTMLCanvasElement): WebGLRenderer {
    const renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    return renderer;
  }

  private static createScene(): Scene {
    return new Scene();
  }

  protected abstract createCamera(aspect: number): PerspectiveCamera;

  protected abstract createLight(): Light[];

  public visibleSizeAt(z: number): Vector2 {
    const cameraOffset = this.camera.position.z;
    const depth = z + cameraOffset * (z < cameraOffset ? -1 : 1);
    const vFOV = this.camera.fov * Math.PI / 180;
    const height = 2 * Math.tan( vFOV / 2 ) * Math.abs(depth);
    const width = height * this.camera.aspect;
    return new Vector2(width, height);
  }

  public abstract update(width: number, height: number): void;

  public abstract render(): void;
}
