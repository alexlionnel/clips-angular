import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

if (environment.production) {
  enableProdMode();
}

// le but est d'initialiser firebase avant Angular, pour que Angular puisse
// démarrer immédiatement avec les informations de firebase (user, ...)

firebase.initializeApp(environment.firebase)

let appInit = false;

firebase.auth().onAuthStateChanged(() => { // émet un événement d'authentification (login, logout, ...)
  if (!appInit) {
    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.error(err));
  }
  appInit = true
})


