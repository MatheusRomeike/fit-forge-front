export enum EGoal {
  Athletics = 1,
  Bodybuilding = 2,
  Powerlifting = 3,
  Powerbuilding = 4,
  MuscleScuplting = 5,
  BodyweightFitness = 6,
  OlympicWeightlifting = 7,
}

export const GoalLabels = {
  [EGoal.Athletics]: 'tags.goal.athletics',
  [EGoal.Bodybuilding]: 'tags.goal.bodybuilding',
  [EGoal.Powerlifting]: 'tags.goal.powerlifting',
  [EGoal.Powerbuilding]: 'tags.goal.powerbuilding',
  [EGoal.MuscleScuplting]: 'tags.goal.musclesculpting',
  [EGoal.BodyweightFitness]: 'tags.goal.bodyweightfitness',
  [EGoal.OlympicWeightlifting]: 'tags.goal.olympicweightlifting',
};
