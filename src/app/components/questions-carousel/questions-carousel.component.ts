import { Answer, Trivia } from './../../model/trivia.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-questions-carousel',
  templateUrl: './questions-carousel.component.html',
  styleUrls: ['./questions-carousel.component.scss'],
})
export class QuestionsCarouselComponent implements OnInit {
  @Input() triviaQuestion: any;
  @Input() timer: any;
  @Output() gameOver = new EventEmitter<any>();

  counter = 0;
  counterFalse = 0;
  counterFalseFinish = 3;

  ans: any[] = [];
  trivia: Trivia = new Trivia();

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.parseTreeResult(this.triviaQuestion);
  }

  parseTreeResult(questionsList: any) {
    this.trivia = new Trivia();
    this.trivia.category = questionsList.category;
    this.trivia.difficulty = questionsList.difficulty;
    this.trivia.question = questionsList.question;
    this.trivia.type = questionsList.type;

    let answers = [];

    let correctAnswer = new Answer();
    correctAnswer.answer = questionsList.correct_answer;
    correctAnswer.correctAnswer = true;
    answers.push(correctAnswer);
    questionsList.incorrect_answers.forEach((answer: any) => {
      let wrongAnswer = new Answer();
      wrongAnswer.answer = answer;
      wrongAnswer.correctAnswer = false;
      answers.push(wrongAnswer);
    });
    this.ans = this.shuffle(answers);
  }
  shuffle(a: any) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  answerSelected(answer: any) {
    const correctAnswer = this.triviaQuestion.correct_answer;
    if (correctAnswer == answer.answer) {
      this.gameOver.emit(false);
      this.counterFalse = 0;
    }

    if (correctAnswer != answer.answer) {
      this.counterFalse++;

      if (this.counterFalse == this.counterFalseFinish) {
        this.gameOver.emit(true);
        this.counterFalse = 0;
      }
    }
  }
}
