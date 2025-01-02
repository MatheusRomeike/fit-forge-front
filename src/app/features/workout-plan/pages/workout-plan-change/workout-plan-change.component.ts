import { Component } from '@angular/core';
import { Breadcrumb } from '../../../../core/models/breadcrumb.model';
import { WorkoutCard } from '../../shared/models/workout-card.model';

@Component({
  selector: 'app-workout-plan-Change',
  templateUrl: './workout-plan-Change.component.html',
  styleUrl: './workout-plan-Change.component.scss',
  standalone: false,
})
export class WorkoutPlanChangeComponent {
  breadcrumb: Breadcrumb[] = [
    {
      name: 'Workout',
    },
    {
      name: 'Change Workout',
    },
  ];

  savedPrograms: WorkoutCard[] = [
    {
      id: 1,
      title: '4 Day Hypertrophy Program (Upper Body Focus)',
      description:
        'This is a program for a lifter who has 4 days to dedicate to the gym, and wants to focus on upper body development. You will still grow everywhere, the volume has just been shifted toward upper body. Please read the full program guide I’ve  written. If you have any more question after you’ve read through you can DM on Instagram @ thedamianzepeda. \n To start the program I would highly recommend you take 1 set off each exercise for the first 1-2 weeks, otherwise you’ll likely be really sore. \nThis program uses a basic double progression. The way I run a double progression you have a set and rep range, and you progress the weight when you hit the top of rep range for all sets. For example you have 3 sets of 5-8 reps (3x5-8) each week you add reps until 3x8 with that weight. Then you increase the weight and start back at the bottom and do it over again. It’s that simple DO NOT OVER THINK THIS !  \nAlso don’t worry too much about the RPE Ranges. If you are progressing over time even if you start off training too easy over time you will be training hard enough.  If you go into a session feeling super beat up you can reduce the sets by 1-2 and the weight by 15-20 % and go back to regular training the next workout. Just make sure you’re being honest with your self and not abusing it because you don’t like training hard. Also once this program is completed I would recommend you go to a more balanced program rather than continuing to run an upper body focused program. Best of luck !',
      author: 'Damian Zepeda',
      editable: true,
    },
  ];

  userPrograms: WorkoutCard[] = [
    {
      id: 1,
      title: '4 Day Hypertrophy Program (Upper Body Focus)',
      description:
        'This is a program for a lifter who has 4 days to dedicate to the gym, and wants to focus on upper body development. You will still grow everywhere, the volume has just been shifted toward upper body. Please read the full program guide I’ve  written. If you have any more question after you’ve read through you can DM on Instagram @ thedamianzepeda. \n To start the program I would highly recommend you take 1 set off each exercise for the first 1-2 weeks, otherwise you’ll likely be really sore. \nThis program uses a basic double progression. The way I run a double progression you have a set and rep range, and you progress the weight when you hit the top of rep range for all sets. For example you have 3 sets of 5-8 reps (3x5-8) each week you add reps until 3x8 with that weight. Then you increase the weight and start back at the bottom and do it over again. It’s that simple DO NOT OVER THINK THIS !  \nAlso don’t worry too much about the RPE Ranges. If you are progressing over time even if you start off training too easy over time you will be training hard enough.  If you go into a session feeling super beat up you can reduce the sets by 1-2 and the weight by 15-20 % and go back to regular training the next workout. Just make sure you’re being honest with your self and not abusing it because you don’t like training hard. Also once this program is completed I would recommend you go to a more balanced program rather than continuing to run an upper body focused program. Best of luck !',
      author: 'Damian Zepeda',
      editable: true,
    },
  ];
}
