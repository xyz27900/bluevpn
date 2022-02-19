import { Light, PerspectiveCamera, PointLight } from 'three';
import { AnimationStage } from '@/3d/animation.stage';

export class SpaceStage extends AnimationStage {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  protected createCamera(aspect: number): PerspectiveCamera {
    const camera = new PerspectiveCamera(20, aspect, 1, 10000);
    camera.position.z = 40;
    return camera;
  }

  protected createLight(): Light[] {
    const light1 = new PointLight(0xffffff, .25);
    light1.position.set(100, 100, 100);

    const light2 = new PointLight(0xffffff, .5);
    light2.position.set(-100, 50, 300);

    const light3 = new PointLight(0xffffff, 1, 20);
    light3.position.set(-8, 6, -10);

    return [light1, light2, light3];
  }

  public update(width: number, height: number): void {
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  public render(): void {
    this.renderer.render(this.scene, this.camera);
  }
}
