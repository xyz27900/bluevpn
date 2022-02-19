import { BufferAttribute, BufferGeometry, Points, PointsMaterial } from 'three';
import { AnimationManager } from '@/3d/animation.manager';
import { SpaceStage } from '@/components/animation/stages/space.stage';

interface StarsObjectOptions {
  distance: number;
}

export class StarsObject {
  private readonly animationManager: AnimationManager = new AnimationManager(2);
  private readonly stage: SpaceStage;
  private readonly object: Points;
  private readonly distance: number;

  constructor(stage: SpaceStage, options: StarsObjectOptions) {
    this.stage = stage;
    this.distance = options.distance;
    const { width, height } = this.stage.visibleSizeAt(this.distance);
    const size = Math.sqrt(width ** 2 + height ** 2);
    const geometry = StarsObject.createGeometry();
    const material = StarsObject.createMaterial();
    this.object = StarsObject.createObject(geometry, material);
    this.object.position.set(0, 0, this.distance);
    this.object.scale.set(size, size, 1);
    this.stage.scene.add(this.object);
  }

  private static getRandomPositions(count = 100): Float32Array {
    const array = new Float32Array(count * 3);
    return array.map((_, i) => {
      return (i + 1) % 3 === 0 ? 0 : Math.random() - .5;
    });
  }

  private static createObject(geometry: BufferGeometry, material: PointsMaterial): Points {
    geometry.attributes.position = new BufferAttribute(StarsObject.getRandomPositions(1000), 3);
    return new Points(geometry, material);
  }

  private static createGeometry(): BufferGeometry {
    return new BufferGeometry();
  }

  private static createMaterial(): PointsMaterial {
    return new PointsMaterial({
      size: 0.15,
      color: 0xffffff,
      transparent: true,
    });
  }

  public update(): void {
    const { width, height } = this.stage.visibleSizeAt(this.distance);
    const size = Math.sqrt(width ** 2 + height ** 2);
    this.object.scale.set(size, size, 1);
  }

  public render(): void {
    this.object.rotation.z += 1e-4;
    this.animationManager.animate(value => {
      if (!Array.isArray(this.object.material)) {
        this.object.material.opacity = value;
      }
    }, 'ease-in');
  }
}
