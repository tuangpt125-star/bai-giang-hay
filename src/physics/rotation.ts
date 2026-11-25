export interface Rotation {
  angle: number;
  speed: number;
}

export const stopAngle = .3;

export function stepRotation(state: Rotation, torque: number, inertia: number, seconds: number): Rotation {
  const drag = 1.2;
  const speed = state.speed + (torque - drag * state.speed) / inertia * seconds;
  const angle = state.angle + speed * seconds;
  if (angle >= stopAngle && speed > 0) return { angle: stopAngle, speed: 0 };
  if (angle <= -stopAngle && speed < 0) return { angle: -stopAngle, speed: 0 };
  return { angle, speed };
}

export function rotationLab(
  torque: (angle: number) => number,
  inertia: () => number,
  render: (state: Rotation) => void,
) {
  let state: Rotation = { angle: 0, speed: 0 };
  let frame = 0;
  let previous = 0;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  function needsMotion() {
    const force = torque(state.angle);
    const pushesStop = (state.angle >= stopAngle && force >= 0) || (state.angle <= -stopAngle && force <= 0);
    return !pushesStop && (Math.abs(state.speed) >= .012 || Math.abs(force) >= .01);
  }

  function tick(now: number) {
    frame = 0;
    const elapsed = previous ? Math.min(.045, (now - previous) / 1000) : 1 / 60;
    previous = now;
    const steps = Math.max(1, Math.ceil(elapsed * 120));
    for (let i = 0; i < steps; i++) {
      state = stepRotation(state, torque(state.angle), inertia(), elapsed / steps);
    }
    if (needsMotion()) {
      frame = requestAnimationFrame(tick);
    } else {
      state.speed = 0;
      previous = 0;
    }
    render(state);
  }

  return {
    get state() { return state; },
    wake() {
      if (reducedMotion.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        previous = 0;
        const force = torque(state.angle);
        if (Math.abs(force) >= .01) state.angle = Math.sign(force) * stopAngle;
        state.speed = 0;
      } else if (!frame && needsMotion()) {
        frame = requestAnimationFrame(tick);
      }
      render(state);
    },
    reset() {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      state = { angle: 0, speed: 0 };
      render(state);
    },
  };
}
