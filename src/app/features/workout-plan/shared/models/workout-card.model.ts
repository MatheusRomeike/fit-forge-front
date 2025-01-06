import { EDifficulty } from '../enums/EDifficulty';
import { EGoal } from '../enums/EGoal';
import { EStatus } from '../enums/EStatus';

export class WorkoutCard {
  id: number;
  title: string;
  description: string;
  author: string;
  editable: boolean;
  goal: EGoal;
  difficulty: EDifficulty[];
  status: EStatus;
}
