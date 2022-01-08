import { Component, OnInit, ViewChild } from '@angular/core';
import * as fromStore from './../../store';
import { Store } from '@ngrx/store';
import { tap, map } from 'rxjs';
import { Answer, Trivia } from 'src/app/model/trivia.model';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  data: any;
  triviaQuestions: Trivia[] = [];

  trivia: any;
  // score
  correctCount: number = 0;
  incorrectCount: number = 0;
  totalCount: number = 0;
  // timer
  timeLeft: number = 20;
  interval: any;
  timeoutCounter = 20;
  displayDialog: boolean = false;

  @ViewChild(Carousel) carousel: Carousel | undefined;
  score: number = 0;

  constructor(private store: Store<fromStore.Questions>) {
    this.store
      .select(fromStore.selectQuestionsState)
      .pipe(
        tap((data) => {
          this.data = this.getData(data.currentQuestion);
        })
      )
      .subscribe();
  }

  getData(currentQuestions: any): any {
    currentQuestions.forEach((element: any) => {
      this.triviaQuestions.push(element[1]);
    });

    return this.triviaQuestions;
  }

  stopCounter() {
    clearInterval(this.interval);
  }

  resetTimer() {
    this.timeoutCounter = this.timeoutCounter;
    this.timeLeft = this.timeoutCounter;
  }

  start() {
    this.startTimer();
    this.correctCount = 0;
    this.totalCount = 0;
    this.nextQuestion(true);
  }

  nextQuestion(correctAnswer: Boolean) {
    if (this.totalCount == this.triviaQuestions.length - 1) {
      this.score = Math.round((100 / this.totalCount) * this.correctCount);
      this.displayDialog = true;
      this.stopCounter();
      return;
    }
    this.totalCount++;
    this.resetTimer();
    correctAnswer ? this.correctCount++ : this.incorrectCount++;
    if (this.carousel !== undefined) this.carousel.navForward(1);
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.nextQuestion(false);
      }
    }, 1000);
  }

  ngOnInit(): void {
    this.start();
  }
}
