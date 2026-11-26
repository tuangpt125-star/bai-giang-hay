import { arrow, line } from '../physics/lab-diagram';
import { atomTotals } from './chemistry-model';
import type { DiagramKind, Scenario } from './lesson';

type Pen = CanvasRenderingContext2D;
const ink = '#21364d';
const blue = '#1d699f';
const teal = '#137064';
const green = '#287345';
const amber = '#a3541f';
const red = '#b44357';
const light = '#e0edf3';
const muted = '#61778d';
const colors = [blue, teal, amber, red];

function label(pen: Pen, text: string, x: number, y: number, color = ink) {
  pen.fillStyle = color;
  pen.fillText(text, x, y);
}
function circle(pen: Pen, x: number, y: number, radius: number, fill: string) {
  pen.beginPath();
  pen.arc(x, y, radius, 0, Math.PI * 2);
  pen.fillStyle = fill;
  pen.fill();
}
function rect(pen: Pen, x: number, y: number, width: number, height: number, fill: string, radius = 8) {
  pen.beginPath();
  pen.roundRect(x, y, width, height, radius);
  pen.fillStyle = fill;
  pen.fill();
}
function multiLabel(pen: Pen, text: string, x: number, y: number, width: number, color = ink) {
  const rows: string[] = [];
  let row = '';
  for (const word of text.split(' ')) {
    if (row && pen.measureText(row + ' ' + word).width > width) {
      rows.push(row);
      row = word;
    } else row += (row ? ' ' : '') + word;
  }
  if (row) rows.push(row);
  rows.forEach((part, index) => label(pen, part, x, y - 10 * (rows.length - 1) + 21 * index, color));
}
function staged(progress: number, index: number, count: number) {
  return Math.max(0, Math.min(1, progress * count - index));
}

function bars(pen: Pen, scenario: Scenario, progress: number) {
  const { labels, values = [] } = scenario;
  const base = 216;
  const max = Math.max(1, ...values);
  const spacing = 450 / labels.length;
  line(pen, 44, base, 516, base, muted, 2);
  values.forEach((amount, index) => {
    const x = 55 + spacing * (index + .5);
    const height = amount / max * 146 * Math.min(1, progress * (1.17 - index * .035));
    if (height > 0) rect(pen, x - 29, base - height, 58, height, colors[index], 3);
    multiLabel(pen, labels[index], x, 249, spacing - 8);
    if (progress > .05) label(pen, (amount * Math.min(1, progress * 1.17)).toLocaleString('vi-VN', { maximumFractionDigits: 1 }), x, base - height - 11);
  });
}

function flow(pen: Pen, labels: string[], progress: number, y = 145, palette = colors) {
  const spacing = 517 / labels.length;
  const width = Math.min(222, spacing - 16);
  labels.forEach((name, index) => {
    const x = 22 + spacing * (index + .5);
    const active = index === 0 || staged(progress, index - 1, labels.length - 1) > .28;
    rect(pen, x - width / 2, y - 43, width, 86, active ? palette[index] : light);
    multiLabel(pen, name, x, y + 6, width - 10, active ? 'white' : ink);
    if (index < labels.length - 1) {
      const start = x + width / 2 + 2;
      const gap = spacing - width - 4;
      arrow(pen, start, y, gap, 0, progress * (labels.length - 1) > index ? amber : muted);
    }
  });
}

function cycle(pen: Pen, labels: string[], progress: number) {
  const nodes: [number, number][] = labels.length === 4
    ? [[143,75],[412,75],[412,204],[143,204]]
    : [[133,75],[428,75],[280,211]];
  nodes.slice(0, labels.length).forEach(([x,y], index) => {
    const active = index === 0 || staged(progress,index - 1,labels.length - 1) > .2;
    const [nextX,nextY] = nodes[(index + 1) % labels.length];
    const dx = nextX - x;
    const dy = nextY - y;
    const length = Math.hypot(dx,dy);
    if (index < labels.length - 1) arrow(pen, x + dx * .32, y + dy * .28, dx * .33, dy * .38, active ? amber : muted);
    rect(pen, x-83, y-34,166,68,active ? colors[index] : light);
    multiLabel(pen, labels[index], x, y + 5, 148, active ? 'white' : ink);
    if (length > 0) circle(pen,x - 71,y - 29,12,'#fff3d7');
    pen.font = '650 14px system-ui';
    label(pen,String(index + 1),x-71,y-24);
    pen.font = '650 20px system-ui';
  });
}

function atom(pen: Pen, scenario: Scenario, progress: number) {
  const [protons, neutrons, electrons] = scenario.values ?? [0,0,0];
  const cx = 164;
  const cy = 148;
  for (const radius of [55,102]) {
    pen.beginPath();
    pen.arc(cx,cy,radius,0,Math.PI * 2);
    pen.strokeStyle = '#8daac1';
    pen.lineWidth = 2;
    pen.stroke();
  }
  circle(pen,cx,cy,39,'#e9e7fa');
  const count = protons + neutrons;
  for (let index=0; index<count; index++) {
    const angle = index * 2.39;
    const r = Math.sqrt(index) * 8;
    circle(pen,cx+Math.cos(angle)*r,cy+Math.sin(angle)*r,5,index<protons?red:muted);
  }
  const visibleElectrons = Math.ceil(progress * electrons);
  for (let index=0; index<visibleElectrons; index++) {
    const n = index < 2 ? Math.min(2,electrons) : electrons-2;
    const radius = index < 2 ? 55 : 102;
    const a = 2 * Math.PI * (index < 2 ? index : index-2)/n;
    circle(pen,cx+Math.cos(a)*radius,cy+Math.sin(a)*radius,7,blue);
  }
  label(pen,scenario.labels[0],421,65);
  for (const [index, value] of [protons,neutrons,electrons].entries()) {
    const y = 102 + index * 51;
    circle(pen,322,y-6,7,[red,muted,blue][index]);
    label(pen,scenario.labels[index+1] + '  ' + (index < 2 || progress >= 1 ? value : visibleElectrons || '—'),415,y);
  }
}

function reaction(pen: Pen, scenario: Scenario, progress: number) {
  const particleColor: Record<string,string> = { H:'#436579', O:red, C:ink, N:blue, Cl:green, Na:amber };
  for (const [index, text] of scenario.labels.entries()) {
    const x = index ? 426 : 134;
    const active = index === 0 || progress > .35;
    rect(pen,x - 117,68,234,159,active?'#e5eff7':light);
    label(pen,index ? 'Kết quả' : 'Ban đầu',x,53);
    const counts = text.split(" + ").every(part => /^([0-9]+ )?[A-Z][A-Za-z0-9₀-₉()⁺⁻↓]*($| )/.test(part)) ? atomTotals(text) : [];
    if (active) counts.forEach(([name, count], item) => {
      const location = x + (item - (counts.length - 1) / 2) * 42;
      circle(pen,location,125,19,particleColor[name] ?? teal);
      pen.font = '650 15px system-ui';
      label(pen,name,location,130,'white');
      label(pen,String(count),location,157);
    });
    pen.font = '650 20px system-ui';
    multiLabel(pen,active ? text : 'Chờ quan sát',x,194,205,active ? ink : muted);
  }
  arrow(pen,257,142,46,0,progress>.35?amber:muted);
}

function periodTable(pen: Pen, variant: number, progress: number) {
  const selected = ['Na','Mg','Ne'][variant];
  const rows = [['H','','','','','','','He'],['Li','Be','B','C','N','O','F','Ne'],['Na','Mg','Al','Si','P','S','Cl','Ar']];
  for (const [index,row] of rows.entries()) {
    row.forEach((element, column) => {
      if (!element) return;
      const x = 53 + column * 62;
      const y = 63 + index * 67;
      const active = element === selected && progress > .15;
      rect(pen,x - 23,y - 26,49,51,active ? amber : light,6);
      label(pen,element,x,y + 6,active?'white':ink);
    });
  }
  label(pen,'Ba chu kì đầu · lược phần trống ở giữa',280,264);
}

function indicator(pen: Pen, variant: number, progress: number) {
  const liquids = ['#e7bdda','#e6e5fa','#b6d7ef'];
  const paper = ['#ad3b59','#754399','#22699b'];
  rect(pen,144,84,272,168,'#d9e7f6',16);
  rect(pen,156,151,248,92,liquids[variant],8);
  rect(pen,264,42 + progress * 102,32,103,'#754399',4);
  if (progress > .5) rect(pen,264,112 + progress * 102,32,33,paper[variant],4);
  label(pen,'Quỳ tím',332,62);
  label(pen,['Mẫu acid','Mẫu trung tính','Mẫu base'][variant],280,275);
}

function plant(pen: Pen, key: string, variant: number, labels: string[], progress: number) {
  const bend = key === '7-35' && variant === 1 ? 60 * progress : 0;
  const cx = 160;
  const leafColor = key === '7-24' && variant === 0 && progress > .45 ? '#503c8b'
    : key === '7-24' && variant === 1 && progress > .45 ? '#8d7836' : green;
  const isRong = key === '7-24' && variant === 2;
  rect(pen,54,220,217,45,isRong?'#b1d8ea':'#c3ab81');
  pen.beginPath();
  pen.moveTo(cx,245);
  pen.quadraticCurveTo(cx,159,cx+bend,98);
  pen.lineWidth = 7;
  pen.strokeStyle = green;
  pen.stroke();
  for (const [x,y] of [[cx - 36,147],[cx + 31 + bend*.55,119],[cx - 21 + bend*.8,90]]) {
    pen.beginPath();
    pen.ellipse(x,y,31,13,x<cx?.45:-.45,0,Math.PI*2);
    pen.fillStyle = leafColor;
    pen.fill();
  }
  for (const dx of [-35,38]) line(pen,cx,238,cx + dx,259,'#826646',3);
  if ((key === '7-22' && variant === 0) || (key === '7-35' && variant < 2)) {
    circle(pen,variant === 1 ? 238 : 120,47,23,'#e7ab2b');
    if (progress > .25) arrow(pen,variant===1 ? 224 : 124,72,variant===1 ? -7:22,25,amber);
  }
  if (isRong && progress > .3) {
    for (let index=0; index<5; index++) circle(pen,129+index%2*33,193-progress*112+index*10,7,'#91cce4');
  }
  if ((key === '7-30' && variant === 0) || (key === '7-32' && variant === 0)) {
    circle(pen,cx,223 - 118 * progress,9,blue);
  }
  if (key === '7-32' && variant > 0) {
    pen.strokeStyle = muted;
    pen.lineWidth = 3;
    pen.strokeRect(67,58,189,173);
    if (progress > .3) for (let j=0;j<(variant===1?7:1);j++) circle(pen,89+(j%3)*36,78+Math.floor(j/3)*25,5,blue);
  }
  const spacing = Math.min(61, 188 / labels.length);
  labels.forEach((part,index)=> {
    const y = 142 - spacing * (labels.length - 1) / 2 + spacing * index;
    const active = index === 0 || progress >= index / labels.length;
    rect(pen,289,y-21,233,43,active ? teal : light,6);
    pen.font = '650 21px system-ui';
    multiLabel(pen,part,405,y+4,217,active ? 'white' : ink);
  });
}

function ecology(pen: Pen, key: string, scenario: Scenario, progress: number) {
  if (key !== '8-42') {
    if (scenario.values) bars(pen,scenario,progress);
    else flow(pen, scenario.labels,progress,145,[green,teal,amber,red]);
    return;
  }
  const [count,area,density] = scenario.values!;
  const width = area === 5 ? 181 : 302;
  rect(pen,30,40,width,225,'#e1efdb',8);
  for (let i=0;i<Math.ceil(count*progress);i++) {
    const x=46 + ((i*71) % (width-32));
    const y=58 + ((i*43)%190);
    line(pen,x,y,x-4,y-9,green,3);
    line(pen,x,y,x+5,y-8,green,3);
  }
  label(pen,'Ô mẫu ' + area + ' m²',419,76);
  if (progress > .65) {
    label(pen,count + ' cây',419,130,teal);
    label(pen,density + ' cây/m²',419,187,blue);
  }
}

export function drawScience(pen: Pen, key: string, kind: DiagramKind, scenario: Scenario, variant: number, progress: number) {
  pen.clearRect(0,0,560,294);
  pen.textAlign = 'center';
  pen.font = '650 20px system-ui';
  pen.lineCap = 'round';
  if (key === '8-9') phScale(pen,scenario,progress);
  else if (key === '8-31') elbow(pen,variant,progress);
  else if (key === '8-34') lungs(pen,variant,progress);
  else if (key === '7-4') periodTable(pen,variant,progress);
  else if (key === '8-8') indicator(pen,variant,progress);
  else if (kind === 'bars') bars(pen,scenario,progress);
  else if (kind === 'atom') atom(pen,scenario,progress);
  else if (kind === 'reaction') reaction(pen,scenario,progress);
  else if (kind === 'plant') plant(pen,key,variant,scenario.labels,progress);
  else if (kind === 'cycle') cycle(pen,scenario.labels,progress);
  else if (kind === 'ecosystem') ecology(pen,key,scenario,progress);
  else flow(pen,scenario.labels,progress);
}

function phScale(pen: Pen, scenario: Scenario, progress: number) {
  const paint = ['#bb4651','#cc576d','#d66d42','#dc8056','#dc9d36','#cdb54d','#a6aa51','#4d8c66','#258a79','#268394','#23799c','#2f669e','#5b5a9f','#65488e','#5f367a'];
  const width = 33;
  paint.forEach((color,num) => {
    const x=49+num*width;
    rect(pen,x-16,121,32,51,color,1);
    pen.font='650 17px system-ui';
    label(pen,String(num),x,151,num >= 2 && num <= 7 ? '#1b2d3b' : 'white');
  });
  label(pen,'Acid',123,220);
  label(pen,'Trung tính',280,220);
  label(pen,'Base',437,220);
  if (progress < .25) return;
  scenario.values?.forEach((value,index) => {
    const x = 49 + value*width;
    multiLabel(pen,scenario.labels[index].replace(' pH',''),x,index ? 88 : 49,92);
    arrow(pen,x,index?99:66,0,index?19:50,index?teal:ink);
  });
}

function lungs(pen: Pen, variant: number, progress: number) {
  const expansion = variant === 0 ? progress*13 : variant === 1 ? (1-progress)*13 : 5;
  line(pen,280,45,280,108,muted,12);
  line(pen,280,99,247,129,muted,7);
  line(pen,280,99,313,129,muted,7);
  for (const side of [-1,1]) {
    const x = 280 + side*67;
    pen.beginPath();
    pen.ellipse(x,151,43+expansion,59+expansion,side*.22,0,Math.PI*2);
    pen.fillStyle='#e9adb4';
    pen.fill();
    line(pen,280 + side*33,129,x+side*10,159,red,4);
  }
  pen.beginPath();
  pen.moveTo(147,235);
  pen.quadraticCurveTo(280,191 + expansion*2,413,235);
  pen.strokeStyle=teal;
  pen.lineWidth=6;
  pen.stroke();
  label(pen,'Cơ hoành',280,273,teal);
  if (progress > .15) {
    if (variant===2) {
      arrow(pen,385,140,84,0,blue);
      label(pen,'O₂ vào máu',466,180,blue);
    } else {
      const direction = variant===0?1:-1;
      arrow(pen,302,direction===1?31:108,0,direction*53,blue);
      label(pen,direction===1?'Khí vào':'Khí ra',368,47,blue);
    }
  }
}

function elbow(pen: Pen, variant: number, progress: number) {
  const pivotX=266;
  const pivotY=211;
  const angle=variant===0?-.18-progress*1.02:variant===1?-1.2+progress*1.02:-.63;
  const handX=pivotX+154*Math.cos(angle);
  const handY=pivotY+154*Math.sin(angle);
  line(pen,230,51,pivotX,pivotY,'#c6ad92',21);
  line(pen,pivotX,pivotY,handX,handY,'#c6ad92',17);
  circle(pen,pivotX,pivotY,14,light);
  circle(pen,handX,handY,15,'#c6ad92');
  const contracting=variant===0 ? red : muted;
  line(pen,244,97,pivotX+26,pivotY-28,contracting,18);
  line(pen,pivotX+26,pivotY-28,handX*.35+pivotX*.65,handY*.35+pivotY*.65,contracting,4);
  label(pen,'Khớp khuỷu',275,259);
  label(pen,variant===0?'Cơ gấp co':variant===1?'Cơ duỗi co':'Cơ duy trì lực',119,117,variant===0?red:teal);
}
