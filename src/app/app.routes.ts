import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookList } from './components/book-list/book-list';
import { BookDetails } from './components/book-details/book-details';

export const routes: Routes = [
  { path: '', component: BookList },
  { path: 'book/:id', component: BookDetails },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
