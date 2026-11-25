export function line(pen: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, width: number) {
  pen.strokeStyle = color;
  pen.lineWidth = width;
  pen.beginPath();
  pen.moveTo(x1, y1);
  pen.lineTo(x2, y2);
  pen.stroke();
}

export function arrow(pen: CanvasRenderingContext2D, x: number, y: number, dx: number, dy: number, color: string) {
  const magnitude = Math.hypot(dx, dy);
  if (!magnitude) return;
  const ux = dx / magnitude;
  const uy = dy / magnitude;
  const tipX = x + dx;
  const tipY = y + dy;
  line(pen, x, y, tipX, tipY, color, 5);
  line(pen, tipX, tipY, tipX - 13 * ux + 8 * uy, tipY - 13 * uy - 8 * ux, color, 5);
  line(pen, tipX, tipY, tipX - 13 * ux - 8 * uy, tipY - 13 * uy + 8 * ux, color, 5);
}

export function positionHandle(handle: HTMLButtonElement, canvas: HTMLCanvasElement, x: number, y: number) {
  handle.style.left = x / canvas.width * 100 + '%';
  handle.style.top = y / canvas.height * 100 + '%';
}

export function dragHandle(handle: HTMLButtonElement, canvas: HTMLCanvasElement, move: (x: number, y: number) => void) {
  handle.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    handle.focus({ preventScroll: true });
    handle.setPointerCapture(event.pointerId);
    event.preventDefault();
  });
  handle.addEventListener('pointermove', (event) => {
    if (!handle.hasPointerCapture(event.pointerId)) return;
    const bounds = canvas.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width * canvas.width;
    const y = (event.clientY - bounds.top) / bounds.height * canvas.height;
    move(x, y);
  });
}

export function deflection(netMoment: number, render: (radians: number) => void) {
  const target = Math.sign(netMoment) * Math.min(.31, .12 + Math.abs(netMoment) * .055);
  if (!target || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    render(target);
    return () => {};
  }
  const start = performance.now();
  let frame = requestAnimationFrame(step);
  function step(time: number) {
    const progress = Math.min(1, (time - start) / 460);
    render(target * (1 - (1 - progress) ** 3));
    if (progress < 1) frame = requestAnimationFrame(step);
  }
  return () => cancelAnimationFrame(frame);
}
