import type { Inputs } from './models';

export function playSound(context: AudioContext, model: string, values: Inputs) {
  if (model === 'echo') {
    const sampleLength = Math.ceil(context.sampleRate * .06);
    const clap = context.createBuffer(1, sampleLength, context.sampleRate);
    const samples = clap.getChannelData(0);
    for (let i = 0; i < samples.length; i++) {
      samples[i] = (Math.random() * 2 - 1) * Math.exp(-i / (sampleLength * .15));
    }
    const direct = context.createBufferSource();
    const reflection = context.createBufferSource();
    const volume = context.createGain();
    const reflectedVolume = context.createGain();
    const start = context.currentTime + .015;
    volume.gain.value = .17;
    reflectedVolume.gain.value = values.surface ? .018 : .095;
    direct.buffer = reflection.buffer = clap;
    direct.connect(volume).connect(context.destination);
    reflection.connect(reflectedVolume).connect(context.destination);
    direct.start(start);
    reflection.start(start + 2 * values.distance / 340);
    return;
  }

  if (model === 'sound' && values.medium) return;
  const start = context.currentTime + .015;
  const tone = context.createOscillator();
  const volume = context.createGain();
  tone.frequency.value = values.frequency;
  volume.gain.setValueAtTime(.0001, start);
  volume.gain.linearRampToValueAtTime(model === 'pitch' ? values.amplitude * .028 : .1, start + .035);
  volume.gain.exponentialRampToValueAtTime(.0001, start + .45);
  tone.connect(volume).connect(context.destination);
  tone.start(start);
  tone.stop(start + .46);
}
