import { IcosahedronGeometry, Mesh, MeshPhongMaterial, Vector3 } from 'three';
import { AnimationManager } from '@/3d/animation.manager';
import { AnimationStage } from '@/3d/animation.stage';

interface SphereObjectOptions {
  position: Vector3;
  axis: Vector3;
  size: number;
  anglePerFrame: number;
  color: string;
  emissive: string;
  clockwise?: boolean;
  animate?: boolean;
}

export class SphereObject {
  private readonly animationManager: AnimationManager = new AnimationManager(.5);
  private readonly stage: AnimationStage;
  private readonly object: Mesh;
  private readonly axis: Vector3;
  private readonly anglePerFrame: number;
  private readonly clockwise: boolean;
  private readonly animate: boolean;

  constructor(stage: AnimationStage, options: SphereObjectOptions) {
    this.stage = stage;
    this.axis = options.axis.normalize();
    this.anglePerFrame = options.anglePerFrame;
    this.clockwise = options?.clockwise ?? true;
    this.animate = options?.animate ?? true;
    const geometry = SphereObject.createGeometry(options.size);
    const material = SphereObject.createMaterial(options.color, options.emissive);
    this.object = SphereObject.createObject(geometry, material);
    this.object.position.set(options.position.x, options.position.y, options.position.z);
    this.object.scale.setScalar(this.animate ? 0 : 1);
    this.stage.scene.add(this.object);
  }

  private static createObject(geometry: IcosahedronGeometry, material: MeshPhongMaterial): Mesh {
    return new Mesh(geometry, material);
  }

  private static createGeometry(radius: number): IcosahedronGeometry {
    return new IcosahedronGeometry(radius, 4);
  }

  private static createMaterial(color: string, emissive: string): MeshPhongMaterial {
    return new MeshPhongMaterial({
      color,
      emissive,
      flatShading: true,
    });
  }

  public render(): void {
    const angle = this.anglePerFrame * (this.clockwise ? -1 : 1);
    this.object.rotateOnAxis(this.axis, angle);

    if (this.animate) {
      this.animationManager.animate(value => {
        this.object.scale.setScalar( value);
      }, 'ease-out');
    }
  }
}
