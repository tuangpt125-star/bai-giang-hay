import { biology7 } from './biology-7';
import { biology8 } from './biology-8';
import { chemistry } from './chemistry';
import type { ScienceLesson } from './lesson';

export const scienceLessons: Record<string, ScienceLesson> = { ...chemistry, ...biology7, ...biology8 };

export function scienceLesson(grade: number, number: number) {
  return scienceLessons[grade + '-' + number];
}
