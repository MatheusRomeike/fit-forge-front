export enum EDifficulty {
  Beginner = 1,
  Novice = 2,
  Intermediate = 3,
  Advanced = 4,
}

export const DifficultyLabels = {
  [EDifficulty.Beginner]: 'tags.difficulty.beginner',
  [EDifficulty.Novice]: 'tags.difficulty.novice',
  [EDifficulty.Intermediate]: 'tags.difficulty.intermediate',
  [EDifficulty.Advanced]: 'tags.difficulty.advanced',
};
