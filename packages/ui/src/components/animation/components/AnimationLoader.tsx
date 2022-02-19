import React, { useCallback, useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { SphereObject } from '@/components/animation/objects/sphere.object';
import { LoaderStage } from '@/components/animation/stages/loader.stage';

export const AnimationLoader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stage = useRef<LoaderStage | null>(null);
  const sphere = useRef<SphereObject | null>(null);

  const createSphere = useCallback((stageObject: LoaderStage): SphereObject => {
    return new SphereObject(stageObject, {
      position: new Vector3(0, 0, 0),
      axis: new Vector3(-1, 3, 2),
      size: 0.6,
      anglePerFrame: 1e-2,
      color: '#19D5FD',
      emissive: '#1D61EF',
      clockwise: false,
      animate: false,
    });
  }, []);

  const renderSpace = (): void => {
    const render = (): void => {
      window.requestAnimationFrame(render);
      stage.current?.render();
      sphere.current?.render();
    };

    render();
  };

  useEffect(() => {
    if (stage.current) {
      sphere.current = createSphere(stage.current);
      renderSpace();
    }
  }, [stage.current]);

  useEffect(() => {
    if (canvasRef.current) {
      stage.current = new LoaderStage(canvasRef.current);
    }
  }, [canvasRef]);

  return <div className="w-full h-full flex flex-col items-center justify-center">
    <div className="relative flex items-center justify-center">
      {
        Array.from({ length: 4 }).map((_, index) => {
          return <div
            key={`bg-${index}`}
            className="absolute w-40 h-40 rounded-full z-index-0"
            style={{
              background: '#19D5FD',
              filter: `blur(${10 / (index + 1)}rem)`,
            }}
          />;
        })
      }
      <canvas ref={canvasRef} className="relative w-40 h-40" />
    </div>
  </div>;
};
