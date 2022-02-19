export class AnimationManager {
  private readonly animationSpeed: number;
  private animationState: number;

  /**
   * @param animationSpeed From 0 to 100
   */
  constructor(animationSpeed = 1) {
    this.animationSpeed = animationSpeed;
    this.animationState = 0;
  }

  private static easeIn(x: number): number {
    return x * x * x;
  }

  private static easeOut(x: number): number {
    return 1 - Math.pow(1 - x, 3);
  }

  private static linear(x: number): number {
    return x;
  }

  public animate(fn: (value: number) => void, easingFn: 'ease-in' | 'ease-out' | 'linear'): void {
    if (this.animationState <= 100) {
      const step = this.animationState / 100;
      const currentValue = easingFn === 'ease-in'
        ? AnimationManager.easeIn(step)
        : easingFn === 'ease-out'
          ? AnimationManager.easeOut(step)
          : AnimationManager.linear(step);
      this.animationState += this.animationSpeed;
      fn(currentValue);
    }
  }
}
