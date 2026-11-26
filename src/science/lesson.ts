export type DiagramKind = 'atom' | 'reaction' | 'bars' | 'plant' | 'flow' | 'cycle' | 'ecosystem';

export type Scenario = {
  condition: string;
  observation: string;
  labels: string[];
  values?: number[];
};

export interface ScienceLesson {
  goal: string;
  sections: [string, string][];
  task: string;
  kind: DiagramKind;
  scenarios: Scenario[];
  question: string;
  answer: string;
}

export function lesson(
  goal: string,
  sections: [string, string][],
  kind: DiagramKind,
  task: string,
  cases: [condition: string, observation: string, labels: string, values?: number[]][],
  question: string,
  answer: string,
): ScienceLesson {
  return {
    goal, sections, kind, task,
    scenarios: cases.map(([condition, observation, labels, values]) => ({ condition, observation, labels: labels.split('|'), values })),
    question, answer,
  };
}
