import { Actions } from '@ngrx/effects';
import {
  Action,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  MemoizedSelector,
  on,
} from '@ngrx/store';
import { Trivia } from '../model/trivia.model';
import * as fromActions from './questions.action';

export interface Questions {
  isGameActive: boolean;
  timeRemaining: number;
  strikes: number;
  currentQuestion: Trivia | null;
  allQuestions: any[];
  currentAnswer?: {};
  loaded: boolean;
  loading: boolean;
  error: any;
}
const questionsInitialState: Questions = {
  isGameActive: false,
  timeRemaining: 0,
  strikes: 0,
  currentQuestion: null,
  allQuestions: [],
  currentAnswer: undefined,
  loaded: false,
  loading: false,
  error: null,
};
export const QUESTIONS_FEATURE_KEY = 'questions';

const uploadReducer = createReducer(
  questionsInitialState,
  on(fromActions.getQuestion, (state, {}) => ({
    ...state,
    loading: true,
    loaded: false,

  })),
  on(fromActions.getQuestionSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    loaded: true,
    currentQuestion: data,
  })),
  on(fromActions.getQuestionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: error.url,
      name: error.name,
      message: error.message,
    },
  }))
);

export function reducer(state: Questions | undefined, action: Action) {
  return uploadReducer(state, action);
}
export const reducers: ActionReducerMap<QuestionsFeatureState> = {
  questions: reducer,
};

export interface QuestionsFeatureState {
  questions: Questions;
}
export const selectQuestionsFeatureState: MemoizedSelector<
  object,
  QuestionsFeatureState
> = createFeatureSelector<QuestionsFeatureState>(QUESTIONS_FEATURE_KEY);
