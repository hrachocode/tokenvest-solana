import { useCallback } from "react";
import type { Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

interface IParticlesCanvasProps {
  width?: string;
  height?: string;
  right?: string;
  top?: string;
  left?: string;
  bottom?: string;
  linksWidth?: string;
  id: string;
}

const ParticlesCanvas = (props: IParticlesCanvasProps) => {
  const { width, height = "100%", top, right = "unset", left = "unset", linksWidth = "1", id } = props;
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);
  return (
    <Particles
      id={id}
      init={particlesInit}
      options={{
        style: {
          width: width,
          height: height,
          position: "absolute",
          right: right,
          top: top,
          left: left,
        },
        fpsLimit: 120,
        interactivity: {
          detectsOn: "canvas",
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "grab",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            grab: {
              distance: 200,
            }
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#2B4A79",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: linksWidth,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 600,
            },
            value: 150,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesCanvas;
