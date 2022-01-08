import { tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { getLocaleDateFormat } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStore from './../../store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: any;
  constructor(
    private primengConfig: PrimeNGConfig,
    private route: Router,
    private store: Store<fromStore.Questions>
  ) {
    this.store
      .select(fromStore.selectQuestionsCompleted)
      .pipe(
        tap((data) => {
          this.data = data;
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
  start() {
    this.route.navigate(['/questions']);
  }
}
