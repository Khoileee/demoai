import { Suspense, useRef, useEffect, useState, useMemo, createContext, useContext, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = import.meta.env.BASE_URL + "eve_ah.glb";

// Shared phase context so both EVEs sync
type Phase = "hidden" | "visible" | "leaving";
const PhaseContext = createContext<Phase>("hidden");

// Global ready counter — both models must be ready before cycle starts
let globalReadyCount = 0;
let onAllReady: (() => void) | null = null;

function EveModel({ inverted = false }: { inverted?: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const { scene: gltfScene, animations } = useGLTF(MODEL_PATH);
  const clonedScene = useMemo(() => gltfScene.clone(true), [gltfScene]);
  const { actions } = useAnimations(animations, group);
  const [ready, setReady] = useState(false);
  const baseY = useRef(0);
  const phase = useContext(PhaseContext);

  // Auto-fit: scale + center, start hidden
  useEffect(() => {
    if (!group.current) return;

    const box = new THREE.Box3().setFromObject(group.current);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    if (maxDim > 0) {
      const s = 2.1 / maxDim;
      group.current.scale.set(s, inverted ? -s : s, s);

      const newBox = new THREE.Box3().setFromObject(group.current);
      const newCenter = newBox.getCenter(new THREE.Vector3());
      group.current.position.x = -newCenter.x;
      group.current.position.y = -newCenter.y + (inverted ? 6 : -4);
      group.current.position.z = -newCenter.z;
      baseY.current = -newCenter.y;
    }

    setReady(true);
    // Signal this model is ready
    globalReadyCount += 1;
    if (globalReadyCount >= 2 && onAllReady) {
      onAllReady();
      onAllReady = null;
    }
  }, [gltfScene, inverted]);

  // Play embedded animations
  useEffect(() => {
    if (actions) {
      Object.keys(actions).forEach((name) => {
        const action = actions[name];
        if (action) action.reset().fadeIn(0.5).play();
      });
    }
  }, [actions]);

  // Animate — delta-time based lerp for smooth motion
  useFrame((_, delta) => {
    if (!group.current || !ready) return;
    const m = group.current;
    const t = Date.now() * 0.002;
    const lerpF = 1 - Math.pow(0.02, Math.min(delta, 0.1));

    const hiddenY = baseY.current + (inverted ? 6 : -4);
    const visibleY = baseY.current;

    if (phase === "visible") {
      m.position.y = THREE.MathUtils.lerp(m.position.y, visibleY + Math.sin(t) * 0.06, lerpF);
      m.rotation.z = Math.sin(t + (inverted ? Math.PI : 0)) * 0.04;
      m.rotation.y = THREE.MathUtils.lerp(m.rotation.y, inverted ? -0.5 : 0.5, lerpF);
      m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, 0.05, lerpF);
    } else {
      m.position.y = THREE.MathUtils.lerp(m.position.y, hiddenY, lerpF);
      m.rotation.z = THREE.MathUtils.lerp(m.rotation.z, 0, lerpF);
      m.rotation.y = THREE.MathUtils.lerp(m.rotation.y, inverted ? -0.5 : 0.5, lerpF);
      m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, 0, lerpF);
    }
  });

  return (
    <group ref={group} visible={ready}>
      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

/** Shared Canvas wrapper */
function EveCanvas({ inverted = false }: { inverted?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ alpha: true, antialias: true }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(0x000000, 0);
        scene.background = null;
      }}
      dpr={[1, 1.5]}
    >
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <EveModel inverted={inverted} />
      </Suspense>
    </Canvas>
  );
}

export default function EveBot3D() {
  const [phase, setPhase] = useState<Phase>("hidden");

  // Wait for both models to be ready before starting cycle
  useEffect(() => {
    globalReadyCount = 0;

    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let t3: ReturnType<typeof setTimeout>;

    const cycle = () => {
      setPhase("visible");
      t1 = setTimeout(() => {
        setPhase("leaving");
        t2 = setTimeout(() => {
          setPhase("hidden");
          t3 = setTimeout(cycle, 3000);
        }, 1200);
      }, 5000);
    };

    // Start cycle only when both models signal ready
    onAllReady = () => {
      t3 = setTimeout(cycle, 800);
    };

    // Fallback: if models somehow loaded before effect ran
    if (globalReadyCount >= 2) {
      onAllReady();
      onAllReady = null;
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      onAllReady = null;
    };
  }, []);

  return (
    <PhaseContext.Provider value={phase}>
      {/* Bottom-left: EVE peeks up */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 320,
          height: 350,
          zIndex: 50,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <EveCanvas />
      </div>

      {/* Top-right: EVE hangs upside-down like Spider-Man */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 320,
          height: 350,
          zIndex: 50,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <EveCanvas inverted />
      </div>
    </PhaseContext.Provider>
  );
}
