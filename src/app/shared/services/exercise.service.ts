import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseService } from '../../core/services/base.service';
import { MultiLanguageService } from '../../core/services/mult-language.service';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService extends BaseService {
  private exercises: any[] = [];

  constructor(private multiLanguageService: MultiLanguageService) {
    super('api/exercise/');
  }

  getExercises(): Observable<any> {
    const language = this.multiLanguageService.languageSignal();

    return this.get(`?language=${language}`, this.authHeader()).pipe(
      map((p) => p.result)
    );
  }
}
