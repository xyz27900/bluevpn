import React, { useCallback, useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { LensflareObject } from '@/components/animation/objects/lensflare.object';
import { SphereObject } from '@/components/animation/objects/sphere.object';
import { StarsObject } from '@/components/animation/objects/stars.object';
import { SpaceStage } from '@/components/animation/stages/space.stage';
import { useResizeObserver } from '@/hooks/resize.hooks';

export const AnimationSpace: React.FC = () => {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const size = useResizeObserver(canvasContainerRef);

  const stage = useRef<SpaceStage | null>(null);
  const sphereFirst = useRef<SphereObject | null>(null);
  const sphereSecond = useRef<SphereObject | null>(null);
  const lensflare = useRef<LensflareObject | null>(null);
  const stars = useRef<StarsObject | null>(null);

  const createFirstSphere = useCallback((spaceStage: SpaceStage): SphereObject => {
    return new SphereObject(spaceStage, {
      position: new Vector3(-5, -2, 0),
      axis: new Vector3(1, 3, 0),
      size: 4,
      anglePerFrame: 2e-3,
      color: '#19D5FD',
      emissive: '#1D61EF',
    });
  }, []);

  const createSecondSphere = useCallback((spaceStage: SpaceStage): SphereObject => {
    return new SphereObject(spaceStage, {
      position: new Vector3(7, 3, -20),
      axis: new Vector3(-1, 3, 0),
      size: 2,
      anglePerFrame: 1e-3,
      clockwise: false,
      color: '#19D5FD',
      emissive: '#1D61EF',
    });
  }, []);

  const createStars = useCallback((spaceStage: SpaceStage): StarsObject => {
    return new StarsObject(spaceStage, {
      distance: -22,
    });
  }, []);

  const createLensflare = useCallback((spaceStage: SpaceStage): LensflareObject => {
    return new LensflareObject(spaceStage, {
      position: new Vector3(-8, 6, -10),
    });
  }, []);

  const renderSpace = (): void => {
    const render = (): void => {
      window.requestAnimationFrame(render);
      stage.current?.render();
      sphereFirst.current?.render();
      sphereSecond.current?.render();
      lensflare.current?.render();
      stars.current?.render();
    };

    render();
  };

  useEffect(() => {
    if (stage.current) {
      sphereFirst.current = createFirstSphere(stage.current);
      sphereSecond.current = createSecondSphere(stage.current);
      lensflare.current = createLensflare(stage.current);
      stars.current = createStars(stage.current);
      renderSpace();
    }
  }, [stage.current]);

  useEffect(() => {
    stage.current?.update(size.width, size.height);
    stars.current?.update();
  }, [size]);

  useEffect(() => {
    if (canvasRef.current) {
      stage.current = new SpaceStage(canvasRef.current);
    }
  }, [canvasRef]);

  return <div ref={canvasContainerRef} className="absolute top-0 w-full h-full z-index-0">
    <canvas ref={canvasRef} className="relative w-full h-full" />
  </div> ;
};
