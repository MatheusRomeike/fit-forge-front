import { Component } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { LoadingService } from '../../services/loading.service';

const PrimaryWhite = '#ffffff';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  standalone: false,
})
export class LoadingComponent {
  animationType = ngxLoadingAnimationTypes.cubeGrid;
  public primaryColour = PrimaryWhite;

  constructor(public loadingService: LoadingService) {}
}
