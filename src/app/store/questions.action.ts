import { Trivia } from './../model/trivia.model';
import { createAction, props } from '@ngrx/store';

export const GET_QUESTION = '[Get Question] Request Begin';
export const GET_QUESTION_SUCESS = '[Get Question] Request success';
export const GET_QUESTION_FAILURE = '[Get Question] Request failure';

export const getQuestion = createAction(GET_QUESTION);
export const getQuestionSuccess = createAction(GET_QUESTION_SUCESS,props<{ data: any }>());

export const getQuestionFailure = createAction(
  GET_QUESTION_FAILURE,
  props<{ error: any }>()
);
