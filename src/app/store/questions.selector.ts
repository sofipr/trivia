import { createSelector } from '@ngrx/store';

import * as fromReducer from './questions.reducer';

export const selectQuestionsState = createSelector(
  fromReducer.selectQuestionsFeatureState,
  (state) => state.questions
);

export const selectQuestionsStarted = createSelector(
  selectQuestionsState,
  (state) => state.loading
);
export const selectQuestionsCompleted = createSelector(
  selectQuestionsState,
  (state) => state.loaded
);
export const selectQuestions = createSelector(
    selectQuestionsState,
    (state) => state.allQuestions
  );

