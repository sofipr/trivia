import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
import { filter, Subject, take, takeUntil, tap } from 'rxjs';
import * as fromStore from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  data: any;
  constructor(
    private primengConfig: PrimeNGConfig,
    private store: Store<fromStore.Questions>
  ) {}
  destroy$: Subject<void> = new Subject<void>();
  ngOnInit() {
    this.primengConfig.ripple = true;

    // this.store.dispatch(fromStore.getQuestion());

    // this.store
    //   .select(fromStore.selectQuestionsCompleted)
    //   .pipe(
    //     tap((loaded) => {
    //       if (loaded) {
    //         this.store
    //           .select(fromStore.selectQuestionsState)
    //           .pipe(takeUntil(this.destroy$))

    //           .subscribe(({ allQuestions }) => {
    //             this.data = allQuestions;
    //             console.log(this.data);
    //           });
    //       } else {
    //       }
    //     }),
    //     // wait here
    //     filter((loaded: boolean) => loaded),
    //     take(1)
    //   )
    //   .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  title = 'opentd';
}
