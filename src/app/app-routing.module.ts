import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionsResolver } from './resolvers/questions.resolver';

const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
    resolve: {
      routeResolver: QuestionsResolver,
    },
  },
  {
    path: 'questions',
    component: QuestionsComponent,
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [QuestionsResolver],
})
export class AppRoutingModule {}
