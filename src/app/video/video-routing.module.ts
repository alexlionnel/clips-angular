import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageComponent} from "./manage/manage.component";
import {UploadComponent} from "./upload/upload.component";
import {AngularFireAuthGuard, redirectUnauthorizedTo} from "@angular/fire/compat/auth-guard";

const redirectUnauthorizedToToHome = () => redirectUnauthorizedTo('/')

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectUnauthorizedToToHome
    },
    canActivate: [AngularFireAuthGuard]
  }, {
    path: 'upload',
    component: UploadComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectUnauthorizedToToHome
    },
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'manage-clips',
    redirectTo: 'manage'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // la fonction forRoot ne va pas register le service Router
  exports: [RouterModule]
})
export class VideoRoutingModule { }
