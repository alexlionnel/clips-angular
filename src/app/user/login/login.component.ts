import { Component } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  }

  showAlert = false
  alertMsg = 'Please wait! We are logging you in.'
  alertColor = 'blue'
  inSubmission = false

  constructor(private auth: AngularFireAuth) { }

  async login() {
    this.showAlert = true
    this.alertMsg = 'Please wait! We are logging you in.'
    this.alertColor = 'Please wait! We are logging you in.'
    this.inSubmission = true
    try {
      await this.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.password)
    } catch (e) {
      this.alertMsg = 'An unexpected error occurred. Please try again later'
      this.alertColor = 'red'
      console.error(e)
      return
    } finally {
      this.inSubmission = false
    }

    this.alertMsg = 'Success! You are now loggeg in.'
    this.alertColor = 'green'
  }
}
