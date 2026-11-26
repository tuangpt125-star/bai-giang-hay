const subscripts = '₀₁₂₃₄₅₆₇₈₉';
const supported = new Set(['H','O','C','N','Cl','Na','Ca','Mg','Al','K','S','Cu','P','Fe','Zn']);

export function atomTotals(label: string) {
  const counts = new Map<string, number>();
  for (const term of label.split(' + ')) {
    const match = term.replace(/[₀-₉]/g, char => String(subscripts.indexOf(char)))
      .match(/^(?:(\d+)\s+)?([A-Z][A-Za-z0-9()]*)/);
    if (!match) return [];
    const coefficient = Number(match[1] ?? '1');
    const expanded = match[2].replace(/\(([A-Za-z0-9]+)\)(\d*)/g,
      (_, group: string, times: string) => group.repeat(Number(times || '1')));
    const elements = [...expanded.matchAll(/([A-Z][a-z]?)(\d*)/g)];
    if (elements.some((item) => !supported.has(item[1])) || elements.map(item=>item[0]).join('') !== expanded) return [];
    for (const [,symbol,multiplier] of elements) {
      counts.set(symbol,(counts.get(symbol) ?? 0) + coefficient * Number(multiplier || '1'));
    }
  }
  return [...counts];
}

export function checkWaterEquation(hydrogen: number, oxygen: number, water: number) {
  const left = hydrogen + ' H₂ + ' + oxygen + ' O₂';
  const right = water + ' H₂O';
  const balanced = 2 * hydrogen === 2 * water && 2 * oxygen === water;
  return {
    condition: left + ' → ' + right,
    observation: `Vế trái có ${2 * hydrogen} H và ${2 * oxygen} O. Vế phải có ${2 * water} H và ${water} O. `
      + (balanced ? 'Hai vế cân bằng.' : 'Hai vế chưa cân bằng. Hãy đổi hệ số.'),
    labels: [left,right],
  };
}
