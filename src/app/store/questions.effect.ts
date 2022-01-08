import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, mergeMap, map, catchError, of, switchMap } from 'rxjs';
import { HttpService } from '../services/http.service';
import * as fromActions from './questions.action';

@Injectable()
export class QuestionsEffect {
  constructor(
    private actions$: Actions,
    private questionsService: HttpService
  ) {}

  getQuestionEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GET_QUESTION),
      switchMap(() => {
        return this.questionsService.getData().pipe(
          map((data) => fromActions.getQuestionSuccess({ data: data })),
          catchError((error) =>
            of(fromActions.getQuestionFailure({ error: error }))
          )
        );
      })
    )
  );
}

//   this.actions$.pipe(
//       ofType(fromActions.GET_QUESTION),
//       switchMap(() => {
//         return this.questionsService.getData().pipe(
//             map(data => fromActions.getQuestionSuccess ()),
//             catchError((err) => of(fromActions.getQuestionFailure({ error: err }))),
//       })
//   )
// this.actions$.pipe(
//   ofType(fromActions.GET_QUESTION),
//   tap((data) => console.log('effect tap', data)),

//   mergeMap(({ fileBase64, fileNewName, id }) =>
//     this.uploadService.uploadFile({ fileBase64, fileNewName, id }).pipe(
//       map((file) =>
//         fromActions.uploadCompleted({ fileBase64, fileNewName, id })
//       ),
//       catchError((err) => of(fromActions.uploadFailure({ error: err })))
//     )
//   )
// )
//   );
