import { arrow, line, spring } from '../lab-diagram';
import { observe, carSettings, expansion, fieldAngles, format, hookArms, isClosed, jouleTime, scaleForce, temperatureRise, weightMoment, type Inputs } from './models';

type Pen = CanvasRenderingContext2D;
const ink = '#24364e';
const blue = '#25669d';
const red = '#ac4053';
const amber = '#ad5b1d';
const green = '#167656';
const muted = '#69819b';
const pale = '#dce9f4';
const twoPi = 2 * Math.PI;

function text(p: Pen, value: string, x: number, y: number, color = ink) {
  p.fillStyle = color;
  p.fillText(value, x, y);
}
function disk(p: Pen, x: number, y: number, radius: number, color: string) {
  p.fillStyle = color;
  p.beginPath();
  p.arc(x, y, radius, 0, twoPi);
  p.fill();
}
function box(p: Pen, x: number, y: number, w: number, h: number, color: string, radius = 5) {
  p.fillStyle = color;
  p.beginPath();
  p.roundRect(x, y, w, h, radius);
  p.fill();
}
function clear(p: Pen) {
  p.clearRect(0, 0, 560, 300);
  p.lineCap = 'round';
  p.font = '650 19px system-ui';
}
function car(p: Pen, x: number, y: number, color: string) {
  box(p, x - 24, y - 14, 49, 17, color);
  box(p, x - 16, y - 24, 29, 17, color);
  disk(p, x - 13, y + 2, 5, ink);
  disk(p, x + 14, y + 2, 5, ink);
}
function dash(p: Pen, x: number, y: number, x2: number, y2: number) {
  p.setLineDash([7, 6]);
  line(p, x, y, x2, y2, muted, 2);
  p.setLineDash([]);
}

function motion(p: Pen, model: string, v: Inputs, t: number) {
  if (model === 'graph') {
    const elapsed = t * 10;
    const metres = v.speed * Math.min(elapsed, 4) + v.other * Math.max(0, elapsed - 6);
    const total = 4 * (v.speed + v.other);
    const x = (s: number) => 70 + s * 43;
    const y = (m: number) => 247 - m * 140 / total;
    line(p, 60, 247, 515, 247, ink, 2);
    line(p, 70, 255, 70, 82, ink, 2);
    text(p, 's (m)', 38, 71);
    text(p, 't (s)', 508, 267);
    for (const sec of [0, 4, 6, 10]) text(p, String(sec), x(sec) - 6, 273);
    for (const distance of [total / 2, total]) {
      const py = y(distance);
      dash(p, 70, py, 510, py);
      text(p, String(distance), 39, py + 6);
    }
    line(p, 54, 51, 503, 51, muted, 3);
    car(p, 54 + 449 * metres / total, 46, blue);
    line(p, x(0), y(0), x(Math.min(elapsed, 4)), y(Math.min(elapsed, 4) * v.speed), blue, 4);
    if (elapsed > 4) line(p, x(4), y(4 * v.speed), x(Math.min(elapsed, 6)), y(4 * v.speed), amber, 4);
    if (elapsed > 6) line(p, x(6), y(4 * v.speed), x(elapsed), y(metres), blue, 4);
    disk(p, x(elapsed), y(metres), 6, blue);
    return;
  }
  if (model === 'braking') {
    const { reaction, braking } = carSettings(v);
    const position = t <= .32 ? reaction * t / .32 : reaction + braking * (1 - ((1 - t) / .68) ** 2);
    const sx = (metres: number) => 50 + metres * 8;
    line(p, 33, 182, 528, 182, muted, 5);
    line(p, sx(40), 111, sx(40), 189, red, 5);
    text(p, 'Vạch 40 m', sx(40) - 48, 97, red);
    dash(p, sx(reaction), 165, sx(reaction), 213);
    text(p, 'Bắt đầu phanh', sx(reaction) - 54, 243);
    car(p, sx(position), 171, blue);
    return;
  }
  const twoCars = model === 'speed';
  const elapsed = t * v.distance / (twoCars ? Math.min(v.speed, v.other) : v.speed);
  const x = (metres: number) => 65 + Math.min(1, metres / v.distance) * 423;
  const lane = twoCars ? 116 : 163;
  line(p, 45, lane + 9, 518, lane + 9, muted, 4);
  if (twoCars) line(p, 45, 214, 518, 214, muted, 4);
  for (const gate of [0, v.distance]) {
    const passed = gate ? elapsed >= v.distance / v.speed : t > 0;
    const xx = x(gate);
    line(p, xx, 83, xx, twoCars ? 224 : 181, passed ? green : muted, 3);
    text(p, twoCars ? (gate ? 'Đích' : 'Xuất phát') : (gate ? 'Cổng 2' : 'Cổng 1'), xx - 29, 67);
  }
  text(p, 'Khoảng cách ' + format(v.distance, 'm'), 176, 267);
  car(p, x(elapsed * v.speed), lane, blue);
  if (twoCars) car(p, x(elapsed * v.other), 205, amber);
  else text(p, 'Đồng hồ ' + format(elapsed, 's'), 199, 224, blue);
}

function waves(p: Pen, model: string, v: Inputs, t: number) {
  if (model === 'pitch') {
    line(p, 50, 145, 525, 145, muted, 2);
    line(p, 51, 240, 51, 45, muted, 2);
    text(p, '0', 46, 270);
    text(p, '10 ms', 465, 270);
    const limit = Math.floor(455 * t);
    p.beginPath();
    for (let i = 0; i <= limit; i++) {
      const y = 145 - v.amplitude * 15 * Math.sin(i / 455 * twoPi * v.frequency / 100);
      if (i) p.lineTo(52 + i, y);
      else p.moveTo(52, y);
    }
    p.lineWidth = 4;
    p.strokeStyle = blue;
    p.stroke();
    return;
  }
  if (model === 'echo') {
    const wall = 230 + v.distance * 7;
    box(p, wall, 64, 19, 172, v.surface ? amber : muted);
    text(p, v.surface ? 'Rèm' : 'Tường', wall - 13, 51);
    text(p, 'Người nghe', 33, 241);
    const returning = t > .53;
    const fraction = returning ? (1 - t) / .47 : t / .53;
    const x = 82 + (wall - 83) * fraction;
    if (t > 0) {
      const half = returning && v.surface ? 11 : 31;
      arrow(p, x, 143, returning ? -48 : 48, 0, returning ? amber : blue);
      line(p, x, 151 - half, x, 151 + half, returning ? amber : blue, 4);
      text(p, returning ? 'Âm phản xạ' : 'Âm tới', 43, 75);
    }
    return;
  }
  box(p, 31, 87, 21, 102, ink);
  const movement = t > 0 ? Math.sin(t * twoPi * 8) * 8 : 0;
  line(p, 55 + movement, 89, 55 + movement, 187, blue, 6);
  text(p, 'Loa', 28, 234);
  text(p, 'Tai', 486, 234);
  box(p, 491, 94, 32, 96, amber, 16);
  if (v.medium) {
    text(p, 'Chân không', 204, 62);
    return;
  }
  text(p, 'Không khí', 231, 56);
  for (let x = 93; x < 481; x+= 15.5) {
    const arrival = (x - 82) / 421;
    const phase = t - arrival;
    const shift = phase > 0 && phase < .43 ? 5.7 * Math.sin(phase * twoPi * (v.frequency / 65)) * Math.sin(phase / .43 * Math.PI) : 0;
    for (const y of [99, 125, 151, 178]) disk(p, x + shift, y, x === 248 ? 5 : 3, x === 248 ? amber : blue);
  }
}

function optics(p: Pen, model: string, v: Inputs, t: number) {
  if (model === 'reflection') {
    const a = v.angle * Math.PI / 180;
    line(p, 92, 227, 468, 227, blue, 8);
    text(p, 'Gương', 249, 270);
    dash(p, 280, 46, 280, 226);
    text(p, 'Pháp tuyến', 285, 42);
    const r = 166;
    const dx = r * Math.sin(a);
    const dy = -r * Math.cos(a);
    disk(p, 280 - dx, 227 + dy, 9, amber);
    if (t > 0) {
      arrow(p, 280 - dx, 227 + dy, dx, -dy, amber);
      arrow(p, 280, 227, dx, dy, green);
      if (v.angle) {
        p.beginPath();
        p.arc(280, 227, 44, -Math.PI / 2 - a, -Math.PI / 2 + a);
        p.strokeStyle = muted;
        p.lineWidth = 2;
        p.stroke();
      }
    }
    return;
  }
  if (model === 'mirror') {
    const distance = v.distance * 5;
    const size = v.height * 6;
    const base = 222;
    line(p, 280, 41, 280, 245, blue, 7);
    text(p, 'Gương', 247, 270, blue);
    dash(p, 280 - distance, base, 280 + distance, base);
    arrow(p, 280 - distance, base, 0, -size, amber);
    text(p, 'Vật', 262 - distance, base + 32, amber);
    if (t > 0) {
      p.setLineDash([5, 5]);
      arrow(p, 280 + distance, base, 0, -size, green);
      p.setLineDash([]);
      text(p, 'Ảnh ảo', 250 + distance, base + 31, green);
    }
    return;
  }
  const screen = 482;
  const obstacle = 61 + v.distance / 90 * (screen - 61);
  const centre = 149;
  const obj = 17;
  const source = v.source ? 10 : 0;
  const scale = (screen - 61) / (obstacle - 61);
  const umbraHalf = Math.max(0, obj * scale - source * (scale - 1));
  const penumbraHalf = obj * scale + source * (scale - 1);
  box(p, 52, centre - 11 - source, 21, 22 + 2 * source, amber, 8);
  line(p, obstacle, centre - obj, obstacle, centre + obj, ink, 9);
  line(p, screen, 30, screen, 274, muted, 10);
  text(p, 'Vật cản', obstacle - 32, 199);
  text(p, 'Màn', 508, 159);
  if (t > 0) {
    line(p, 64, centre - source, screen - 7, centre - penumbraHalf, amber, 2);
    line(p, 64, centre + source, screen - 7, centre + penumbraHalf, amber, 2);
    line(p, screen, centre - penumbraHalf, screen, centre + penumbraHalf, '#8292a7', 12);
    line(p, screen, centre - umbraHalf, screen, centre + umbraHalf, ink, 14);
  }
}

function barMagnet(p: Pen, x: number, y: number, reverse: boolean, w = 134) {
  box(p, x, y, w, 43, reverse ? red : blue);
  box(p, x + w / 2, y, w / 2, 43, reverse ? blue : red);
  text(p, reverse ? 'N' : 'S', x + w / 4 - 7, y + 28, '#ffffff');
  text(p, reverse ? 'S' : 'N', x + 3 * w / 4 - 7, y + 28, '#ffffff');
}

const probePositions = [[484,150],[270,72],[58,150],[425,59]];
function magnetism(p: Pen, model: string, v: Inputs, t: number) {
  if (model === 'coil') {
    box(p, 116, 100, 326, 49, muted, 13);
    for (let i = 0; i < v.turns / 4; i++) {
      p.beginPath();
      p.ellipse(176 + i * 17, 126, 12, 42, -.12, 0, twoPi);
      p.strokeStyle = amber;
      p.lineWidth = 4;
      p.stroke();
    }
    const lift = v.closed ? t * (56 + v.turns) : 0;
    for (let i = 0; i < 4; i++) {
      p.beginPath();
      p.ellipse(332 + i * 21, 230 - lift, 5, 19, .45, 0, twoPi);
      p.lineWidth = 3;
      p.strokeStyle = blue;
      p.stroke();
    }
    line(p, 148, 257, 470, 257, muted, 4);
    text(p, v.closed ? 'Mạch kín' : 'Mạch hở', 47, 42);
    return;
  }
  if (model === 'compass') {
    barMagnet(p, 153, 127, false, 240);
    const [x, y] = probePositions[v.place];
    const theta = (90 + (fieldAngles[v.place] - 90) * t) * Math.PI / 180;
    disk(p, x, y, 31, pale);
    disk(p, x, y, 4, ink);
    const dx = Math.cos(theta) * 25;
    const dy = Math.sin(theta) * 25;
    arrow(p, x, y, dx, dy, red);
    line(p, x, y, x - dx, y - dy, blue, 4);
    text(p, 'N', x + dx + 5, y + dy - 6, red);
    return;
  }
  if (model === 'static') {
    box(p, 55, 123, 152, 34, blue);
    text(p, '−  −  −', 98, 148, '#ffffff');
  } else barMagnet(p, 78, 119, false);
  const approach = Math.min(1, t * 2.8);
  const repulsion = v.sample === 0;
  const attraction = model === 'static' || v.sample < 3;
  const response = t > .36 && (repulsion || attraction) ? (t - .36) / .64 : 0;
  const x = 420 - 151 * approach + (repulsion ? 63 : -34) * response;
  if (model === 'static') {
    box(p, x, 122, 112, 37, v.sample === 2 ? pale : amber);
    text(p, ['−  −  −', '+  +  +', 'Giấy'][v.sample], x + 16, 147, v.sample === 2 ? ink : '#ffffff');
  } else if (v.sample < 2) {
    barMagnet(p, x, 119, v.sample === 0, 105);
  } else {
    box(p, x, 121, 89, 42, v.sample === 4 ? amber : muted);
    text(p, ['Sắt','Nhôm','Gỗ'][v.sample - 2], x + 17, 149, '#ffffff');
  }
  if (response && (repulsion || attraction)) arrow(p, 253, 200, repulsion ? 73 : -73, 0, repulsion ? red : green);
}

const pivot = 248;
const beamY = 127;
export const hookX = (cm: number) => pivot + cm * 4;
const floor = 271;
function mechanics(p: Pen, model: string, v: Inputs, t: number) {
  const measuring = model === 'scale';
  p.font = '700 23px system-ui';
  const moment = measuring ? 0 : weightMoment(v);
  const angle = measuring ? -.18 * (1 - t) : Math.sign(moment) * Math.min(.21, Math.abs(moment) * 1.15 * t ** 2);
  const point = (cm: number): [number, number] => [pivot + cm * 4 * Math.cos(angle), beamY + cm * 4 * Math.sin(angle)];
  const [leftX,leftY] = point(-47);
  const [rightX,rightY] = point(68);
  p.beginPath();
  p.moveTo(pivot, beamY + 4);
  p.lineTo(pivot - 48, floor);
  p.lineTo(pivot + 48, floor);
  p.closePath();
  p.fillStyle = ink;
  p.fill();
  line(p, 50, floor, 536, floor, muted, 4);
  if (!measuring && t === 0) {
    for (const cm of [-35, 35]) box(p, hookX(cm) - 13, beamY + 9, 26, floor - beamY - 12, '#8e9fb2');
    text(p, 'Giá giữ thanh', 54, 246);
  }
  line(p, leftX, leftY, rightX, rightY, blue, 16);
  const locations = measuring ? [['−20', -20], ['O',0], ['20',20], ['40',40], ['60',60]] as const : Object.entries(hookArms);
  for (const [label, cm] of locations) {
    const [x,y] = point(cm);
    disk(p, x, y, measuring && cm === v.arm ? 8 : 5, measuring && cm === v.arm ? '#ffd46a' : '#ffffff');
    text(p, label, x - 10, y - 17);
    const n = measuring ? (cm === -20 ? 1 : 0) : v[label];
    for (let i = 0; i < n; i++) {
      const weight = y + 11 + i * 32;
      line(p, x, weight - 5, x, weight + 6, ink, 3);
      box(p, x - 17, weight + 4, 34, 23, red, 4);
    }
  }
  if (measuring) {
    const [x,y] = point(v.arm);
    const extend = t * scaleForce(v.arm) * 2.5;
    spring(p, x, y + 8, 0, 64 + extend);
    if (t > 0) {
      const left = x > 420;
      text(p, format(scaleForce(v.arm) * t, 'N', 1), x + (left ? -83 : 15), Math.min(271, y + 59 + extend), green);
      text(p, '18 N', hookX(-20) - 24, beamY + 64, red);
    }
  } else text(p, 'Mỗi quả 2 N', 38, 37);
}

function circuit(p: Pen, model: string, v: Inputs, t: number) {
  const active = t > 0 && isClosed(model, v);
  const diagramColor = active ? blue : muted;
  const meters = model === 'meters' || model === 'meterlab';
  const meter = model === 'meters' ? v.meter : 0;
  line(p, 79, 221, 181, 221, diagramColor, 5);
  line(p, 211, 221, 477, 221, diagramColor, 5);
  line(p, 79, 221, 79, 98, diagramColor, 5);
  line(p, 477, 221, 477, 98, diagramColor, 5);
  line(p, 181, 199, 181, 244, ink, 5);
  line(p, 211, 208, 211, 237, ink, 5);
  text(p, '+', 159, 252);
  text(p, '−', 222, 252);
  text(p, 'Nguồn', 171, 275);
  const sampleX = meters ? 365 : 389;
  line(p, 79, 98, 174, 98, diagramColor, 4);
  line(p, 216, 98, sampleX - 32, 98, diagramColor, 4);
  line(p, sampleX + 33, 98, 477, 98, diagramColor, 4);
  disk(p, 174, 98, 5, ink);
  disk(p, 216, 98, 5, ink);
  const switchClosed = meters || v.closed;
  line(p, 174, 98, 216, switchClosed ? 98 : 74, diagramColor, 4);

  if (model === 'conductors') {
    line(p, 268, 213, 268, 229, ink, 3);
    line(p, 345, 213, 345, 229, ink, 3);
    box(p, 271, 211, 71, 20, v.sample < 2 ? '#366f86' : amber);
  }
  if (model === 'circuit' && !v.wire) {
    box(p, 279, 212, 54, 17, '#edf5fc', 2);
    disk(p, 279, 221, 4, ink);
    disk(p, 333, 221, 4, ink);
    text(p, 'Khe dây', 270, 260);
  }
  if (meters) {
    const dial = (x: number, y: number, label: string) => {
      disk(p, x, y, 19, '#fff');
      p.strokeStyle = ink;
      p.lineWidth = 2;
      p.stroke();
      text(p, label, x - 6, y + 6);
    };
    box(p, sampleX - 32, 87, 65, 22, ink, 3);
    const parallelA = meter === 1;
    const seriesV = meter === 2;
    if (seriesV) dial(262, 98, 'V');
    else {
      line(p, 307, 98, 307, 46, diagramColor, 3);
      line(p, 307, 46, 429, 46, diagramColor, 3);
      line(p, 429, 46, 429, 98, diagramColor, 3);
      disk(p, 307, 98, 4, ink);
      disk(p, 429, 98, 4, ink);
      dial(368, 46, parallelA ? 'A' : 'V');
    }
    if (!parallelA && !seriesV) dial(260, 98, 'A');
    if (active) {
      text(p, format(v.voltage / 10 * (v.polarity ? -1 : 1), 'A'), 117, 161, blue);
      text(p, format(v.voltage, 'V'), 307, 161, green);
    }
  } else if (model === 'effects' && v.sample === 2) {
    box(p, sampleX - 48, 86, 96, 77, pale);
    line(p, sampleX - 27, 72, sampleX - 27, 146, amber, 7);
    line(p, sampleX + 26, 72, sampleX + 26, 146, active ? amber : muted, active ? 7 + 7 * t : 7);
    text(p, '+', sampleX - 35, 196);
    text(p, '−', sampleX + 21, 196);
  } else if (model === 'effects' && v.sample === 0) {
    spring(p, sampleX - 31, 98, 62, 0);
    if (active) for (const x of [-17, 0, 17]) arrow(p, sampleX + x, 75, 0, -23 * t, red);
  } else {
    disk(p, sampleX, 98, 31, active ? '#ffd876' : pale);
    line(p, sampleX - 13, 86, sampleX + 13, 110, ink, 3);
    line(p, sampleX - 13, 110, sampleX + 13, 86, ink, 3);
  }
  if (active) {
    arrow(p, 108, 97, 39, 0, green);
    const across = (t * 3) % 1;
    disk(p, 477, 106 + across * 104, 4, green);
  }
}

function thermal(p: Pen, model: string, v: Inputs, t: number) {
  if (model === 'particles') {
    box(p, 78, 60, 403, 184, pale, 16);
    for (let i = 0; i < 32; i++) {
      const x = 104 + i % 8 * 49;
      const y = 88 + Math.floor(i / 8) * 42;
      const phase = t * (12 + v.temp / 7) * (.8 + i % 4 * .1);
      disk(p, x + Math.sin(phase + i * 1.4) * 12 * Math.min(1, t * 5),
        y + Math.cos(phase * 1.22 + i) * 12 * Math.min(1, t * 5), i % 7 ? 5 : 8, i % 7 ? blue : amber);
    }
    text(p, format(v.temp, '°C'), 246, 37);
    return;
  }
  if (model === 'joule') {
    box(p, 135, 87, 177, 154, pale, 14);
    box(p, 145, 223 - v.mass / 2.65, 157, v.mass / 2.65 + 8,
      t > .45 ? '#79c7e2' : '#91d5e8');
    spring(p, 148, 207, 109, 0);
    line(p, 265, 79, 265, 208, ink, 7);
    disk(p, 265, 205, 10, red);
    box(p, 358, 108, 153, 81, ink, 8);
    text(p, 'Joulemeter', 371, 135, '#ffffff');
    text(p, format(jouleTime(v) * t, 'J', 0), 372, 168, '#acefca');
    text(p, format(22 + temperatureRise(v) * t, '°C'), 183, 65, red);
    return;
  }
  if (model === 'expansion') {
    const delta = expansion(v) * t;
    if (v.sample === 0) {
      box(p, 94, 137, 302 + delta * 510, 35, t ? amber : muted);
      dash(p, 396, 108, 396, 201);
    } else {
      const height = Math.min(140, delta * (v.sample === 1 ? 8 : 5));
      box(p, 217, 48, 119, 198, pale, 9);
      box(p, 231, 169 - height, 92, 65 + height, v.sample === 1 ? blue : '#9cd5e6');
      if (v.sample === 2) box(p, 225, 160 - height, 104, 9, ink, 0);
      dash(p, 200, 169, 358, 169);
    }
    text(p, 'Vạch ban đầu', 220, 273);
    return;
  }
  const active = v.power && t > 0;
  if (v.mode === 0) {
    box(p, 101, 124, 356, 49, muted, 12);
    if (active) {
      const grad = p.createLinearGradient(101, 122, 101 + t * 356, 122);
      grad.addColorStop(0, red);
      grad.addColorStop(1, muted);
      p.fillStyle = grad;
      p.fillRect(104, 132, 351, 32);
      arrow(p, 137, 212, t * 256, 0, amber);
    }
  } else if (v.mode === 1) {
    box(p, 160, 82, 240, 170, pale, 14);
    box(p, 170, 103, 220, 138, '#8bc5e4', 5);
    if (active) {
      line(p, 190, 239, 268, 239, red, 6);
      arrow(p, 207, 216, 0, -95, red);
      arrow(p, 224, 121, 128, 0, amber);
      arrow(p, 356, 126, 0, 90, blue);
      const phase = t * twoPi * 2;
      disk(p, 279 + Math.cos(phase) * 70, 172 + Math.sin(phase) * 41, 6, '#ffffff');
    }
  } else {
    disk(p, 100, 153, 42, active ? '#ffd167' : pale);
    box(p, 435, 76, 33, 158, active ? amber : muted, 7);
    if (active) for (const y of [112, 154, 196]) arrow(p, 151, y, t * 255, 0, red);
  }
}

export function drawExperiment(p: Pen, model: string, values: Inputs, progress: number) {
  clear(p);
  if (['speed','gates','graph','braking'].includes(model)) motion(p,model,values,progress);
  else if (['sound','pitch','echo'].includes(model)) waves(p,model,values,progress);
  else if (['shadow','reflection','mirror'].includes(model)) optics(p,model,values,progress);
  else if (['magnet','static','compass','coil'].includes(model)) magnetism(p,model,values,progress);
  else if (['weights','scale'].includes(model)) mechanics(p,model,values,progress);
  else if (['conductors','circuit','effects','meters','meterlab'].includes(model)) circuit(p,model,values,progress);
  else if (model === 'density' || model === 'densitypractice') densityScene(p,model,values,progress);
  else thermal(p,model,values,progress);
}

function densityScene(p: Pen, model: string, v: Inputs, t: number) {
  const density = model === 'density';
  if (!density && v.sample > 0) {
    const water = v.sample === 1 ? 50 : v.level + 20 * t;
    const y = 226 - water * 2.35;
    box(p, 220, 45, 167, 187, pale, 8);
    box(p, 225, y, 157, 226 - y, '#82c8e6', 2);
    for (let ml = 20; ml <= 70; ml += 10) {
      const mark = 226 - ml * 2.35;
      line(p, 353, mark, 380, mark, blue, 2);
      text(p, String(ml), 395, mark + 6, blue);
    }
    text(p, 'mL', 434, 64);
    if (v.sample === 2) {
      disk(p, 292, 72 + 124 * t, 25, '#5d7186');
      dash(p, 219, 226 - v.level * 2.35, 177, 226 - v.level * 2.35);
      text(p, 'Mực ban đầu', 49, 230 - v.level * 2.35);
    }
    text(p, t ? observe(model,v).measures[2][1] : 'Bình chia độ', 247, 265);
    return;
  }
  const height = density ? 35 + v.volume * 1.3 : 49;
  box(p, 121, 169, 323, 89, ink, 12);
  box(p, 210, 196, 126, 39, '#d3f1e5', 5);
  box(p, 190, 169 - height - (1 - t) * 30, 155, height,
    density ? ['#637d94','#85a5bc','#a3674d'][v.material] : amber, 6);
  text(p, t ? (density ? observe(model,v).measures[0][1] : '26 g') : '0 g', 225, 222);
  if (!density) {
    line(p, 186, 109, 348, 109, amber, 4);
    for (let x = 189; x <= 344; x += 23) line(p, x, 99, x, 109, amber, 2);
    text(p, 'Thước', 352, 110);
  }
}
