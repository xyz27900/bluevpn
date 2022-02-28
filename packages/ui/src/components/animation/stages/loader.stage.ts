import { Light, PerspectiveCamera, PointLight } from 'three';
import { AnimationStage } from '@/3d/animation.stage';

export class LoaderStage extends AnimationStage {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  protected createCamera(aspect: number): PerspectiveCamera {
    const camera = new PerspectiveCamera(10, aspect, 1, 10000);
    camera.position.z = 10;
    return camera;
  }

  protected createLight(): Light[] {
    const light1 = new PointLight(0xffffff, .25);
    light1.position.set(50, 50, 50);
    light1.castShadow = true;

    const light2 = new PointLight(0xffffff, .5);
    light2.position.set(-50, 50, 50);
    light2.castShadow = true;

    return [light1, light2];
  }

  public update(): void {
    // pass
  }

  public render(): void {
    this.renderer.render(this.scene, this.camera);
  }
}
