import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ForumComponent } from './forum/forum.component';






const routes: Routes = [
  {
    path: 'forum',
    component: HomeComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', component: ForumComponent }
        ]
      },

    ]
  },
/*  { path: '**', redirectTo: '' },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
