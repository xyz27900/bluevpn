import { Sprite, SpriteMaterial, TextureLoader, Vector3 } from 'three';
import { AnimationManager } from '@/3d/animation.manager';
import { AnimationStage } from '@/3d/animation.stage';

interface LensflareObjectOptions {
  position: Vector3;
}

export class LensflareObject {
  private readonly animationManager: AnimationManager = new AnimationManager(.5);
  private readonly stage: AnimationStage;
  private readonly object: Sprite;

  constructor(stage: AnimationStage, options: LensflareObjectOptions) {
    this.stage = stage;
    const material = LensflareObject.createMaterial();
    this.object = LensflareObject.createObject(material);
    this.object.position.set(options.position.x, options.position.y, options.position.z);
    this.stage.scene.add(this.object);
  }

  private static createMaterial(): SpriteMaterial {
    const loader = new TextureLoader();
    const map = loader.load('/textures/lensflare.png');
    return new SpriteMaterial({ map });
  }

  private static createObject(material: SpriteMaterial): Sprite {
    return new Sprite(material);
  }

  public render(): void {
    this.animationManager.animate(value => {
      this.object.scale.setScalar(3 * value);
    }, 'ease-out');
  }
}
