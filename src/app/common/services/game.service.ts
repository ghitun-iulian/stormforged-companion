import { Injectable } from '@angular/core';
import { AppLanguages } from '@common/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  language$ = new BehaviorSubject<AppLanguages>(AppLanguages.RO);
  set language(lang: AppLanguages) {
    this.language$.next(lang);
  }
}
