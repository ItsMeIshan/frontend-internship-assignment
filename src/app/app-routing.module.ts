import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { TrendingSubjectsComponent } from '../app/components/trending-subjects/trending-subjects.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Open Books Library',
  },
  {
    path: 'search-result',
    component: SearchResultComponent,
    title: 'search result',
  },
  {
    path: 'trending-subject/:name',
    component: TrendingSubjectsComponent,
    title: 'Trending Subjects',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
