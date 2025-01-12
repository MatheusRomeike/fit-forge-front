export class UserData {
  name: string;
  email: string;
  weight?: number;
  height?: number;
  startedAtGym?: string;
  exerciseDuration?: number;
  goals?: string;
  avatarBase64?: string;
  avatarExtension?: string;

  constructor(data: any) {
    this.name = data.name;
    this.email = data.email;
    this.weight = data.weight;
    this.height = data.height;
    this.startedAtGym = data.startedAtGym;
    this.exerciseDuration = data.exerciseDuration;
    this.goals = data.goals;
    this.avatarBase64 = data.avatar;
  }
}
