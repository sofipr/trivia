import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, filter, of, Subject, take, takeUntil, tap } from 'rxjs';
import * as fromStore from './../store';
import { Store } from '@ngrx/store';

@Injectable()
export class QuestionsResolver implements Resolve<any> {
  constructor(private store: Store<fromStore.Questions>) {} //public usersListService: UsersListService
  destroy$: Subject<void> = new Subject<void>();

  resolve() {
    this.store.dispatch(fromStore.getQuestion());

    this.store
      .select(fromStore.selectQuestionsCompleted)
      .pipe(
        tap((loaded) => {
          if (loaded) {
            this.store
              .select(fromStore.selectQuestionsState)
              .pipe(takeUntil(this.destroy$));
          } else {
          }
        }),
        filter((loaded: boolean) => loaded),
        take(1)
      )
      .subscribe();
  }
}
