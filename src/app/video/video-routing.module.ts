import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageComponent} from "./manage/manage.component";

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // la fonction forRoot ne va pas register le service Router
  exports: [RouterModule]
})
export class VideoRoutingModule { }
