import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MountainListComponent } from './components/mountain-list/mountain-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MountainLoadedGuard } from './guards/mountain-loaded.guard';


const routes: Routes = [{
  path:'',
  pathMatch:'full',
  component: DashboardComponent  ,
  canActivate: [MountainLoadedGuard]
  },
  // {
  // path:'movies/:id',
  // component: MovieDetailComponent,
  // resolve:{movie: MovieResolver}
  // },
  // {
  //   path:'**',
  //   component:NotFoundComponent
  // }
  
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
