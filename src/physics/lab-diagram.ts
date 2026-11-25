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

type DragAction = (x: number, y: number) => void;

interface DragActions {
  move: DragAction;
  start?: DragAction;
  end?: (cancelled: boolean) => void;
  tap?: () => void;
}

export function dragHandle(handle: HTMLButtonElement, canvas: HTMLCanvasElement, actions: DragActions) {
  let press: { id: number; x: number; y: number } | null = null;
  let dragging = false;
  const point = (clientX: number, clientY: number): [number, number] => {
    const bounds = canvas.getBoundingClientRect();
    return [
      (clientX - bounds.left) / bounds.width * canvas.width,
      (clientY - bounds.top) / bounds.height * canvas.height,
    ];
  };

  handle.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0 || press) return;
    press = { id: event.pointerId, x: event.clientX, y: event.clientY };
    dragging = false;
    handle.focus({ preventScroll: true });
    handle.setPointerCapture(event.pointerId);
    event.preventDefault();
  });
  handle.addEventListener('pointermove', (event) => {
    if (!press || event.pointerId !== press.id) return;
    if (!dragging) {
      if (Math.hypot(event.clientX - press.x, event.clientY - press.y) < 5) return;
      dragging = true;
      actions.start?.(...point(press.x, press.y));
    }
    actions.move(...point(event.clientX, event.clientY));
  });
  for (const name of ['pointerup', 'pointercancel', 'lostpointercapture'] as const) {
    handle.addEventListener(name, (event) => {
      if (event.pointerId !== press?.id) return;
      press = null;
      if (dragging) actions.end?.(name !== 'pointerup');
      else if (name === 'pointerup') actions.tap?.();
    });
  }
  handle.addEventListener('click', (event) => {
    if (event.detail === 0) actions.tap?.();
  });
}

export function spring(pen: CanvasRenderingContext2D, x: number, y: number, dx: number, dy: number) {
  const length = Math.hypot(dx, dy);
  if (length < 1) return;
  const ux = dx / length;
  const uy = dy / length;
  const bodyStart = length * .31;
  const bodyEnd = length * .84;

  line(pen, x, y, x + dx, y + dy, '#384963', 2.5);
  line(pen, x + ux * bodyStart, y + uy * bodyStart, x + ux * bodyEnd, y + uy * bodyEnd, '#f4cd74', 16);
  pen.beginPath();
  pen.moveTo(x + ux * bodyStart, y + uy * bodyStart);
  for (let i = 1; i <= 12; i++) {
    const along = bodyStart + (bodyEnd - bodyStart) * i / 13;
    const across = i % 2 === 0 ? 4 : -4;
    pen.lineTo(x + ux * along - uy * across, y + uy * along + ux * across);
  }
  pen.lineTo(x + ux * bodyEnd, y + uy * bodyEnd);
  pen.strokeStyle = '#594628';
  pen.lineWidth = 1.8;
  pen.stroke();
}

export function keepLabControlVisible(controls: HTMLElement, stage: HTMLElement) {
  controls.addEventListener('focusin', (event) => {
    const control = event.target;
    if (!(control instanceof HTMLElement) || getComputedStyle(stage).position !== 'sticky') return;
    requestAnimationFrame(() => {
      if (document.activeElement !== control) return;
      const panel = stage.getBoundingClientRect();
      const bounds = control.getBoundingClientRect();
      const overlaps = bounds.left < panel.right && bounds.right > panel.left
        && bounds.top < panel.bottom && bounds.bottom > panel.top;
      if (overlaps) window.scrollBy(0, bounds.top - panel.bottom - 8);
    });
  });
}

export function revealLabResult(stage: HTMLElement) {
  const bounds = stage.getBoundingClientRect();
  const availableHeight = window.innerHeight;
  if (bounds.bottom > availableHeight && bounds.height < availableHeight - 84) {
    window.scrollBy(0, bounds.bottom - availableHeight + 12);
  }
}
