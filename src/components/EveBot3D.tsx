import { Suspense, useRef, useEffect, useState, useMemo, createContext, useContext } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = import.meta.env.BASE_URL + "eve_ah.glb";

type Phase = "hidden" | "visible" | "leaving";
const PhaseContext = createContext<Phase>("hidden");
const ReadyContext = createContext<(() => void) | null>(null);

function EveModel({ inverted = false }: { inverted?: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const { scene: gltfScene, animations } = useGLTF(MODEL_PATH);
  const clonedScene = useMemo(() => gltfScene.clone(true), [gltfScene]);
  const { actions } = useAnimations(animations, group);
  const [ready, setReady] = useState(false);
  const baseY = useRef(0);
  const phase = useContext(PhaseContext);
  const signalReady = useContext(ReadyContext);

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
    signalReady?.();
  }, [gltfScene, inverted, signalReady]);

  // Play embedded animations
  useEffect(() => {
    if (actions) {
      Object.keys(actions).forEach((name) => {
        const action = actions[name];
        if (action) action.reset().fadeIn(0.5).play();
      });
    }
  }, [actions]);

  // Animate — delta-time lerp, R3F clock
  useFrame((state, delta) => {
    if (!group.current || !ready) return;
    const m = group.current;
    const t = state.clock.elapsedTime * 2;
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

function EveCanvas({ inverted = false }: { inverted?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
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

function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    setMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return mobile;
}

export default function EveBot3D() {
  const isMobile = useIsMobile();
  const [phase, setPhase] = useState<Phase>("hidden");
  const readyCount = useRef(0);
  const cycleStarted = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const signalReady = useMemo(() => () => {
    readyCount.current += 1;
    if (readyCount.current >= 2 && !cycleStarted.current) {
      cycleStarted.current = true;
      startCycle();
    }
  }, []);

  function startCycle() {
    const cycle = () => {
      setPhase("visible");
      const t1 = setTimeout(() => {
        setPhase("leaving");
        const t2 = setTimeout(() => {
          setPhase("hidden");
          const t3 = setTimeout(cycle, 3000);
          timers.current.push(t3);
        }, 1200);
        timers.current.push(t2);
      }, 5000);
      timers.current.push(t1);
    };
    const t0 = setTimeout(cycle, 800);
    timers.current.push(t0);
  }

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      readyCount.current = 0;
      cycleStarted.current = false;
    };
  }, []);

  // Don't render anything on mobile — no Canvas, no GLB download
  if (isMobile) return null;

  return (
    <ReadyContext.Provider value={signalReady}>
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
    </ReadyContext.Provider>
  );
}
