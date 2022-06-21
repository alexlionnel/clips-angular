import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import IUser from "../models/user.models";
import {Observable} from "rxjs";
import {map, delay} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection: AngularFirestoreCollection<IUser>
  public isAuthenticated$: Observable<boolean>
  public isAuthenticatedWithDelay$: Observable<boolean>

  constructor(private auth: AngularFireAuth,
              private db: AngularFirestore,
              private router: Router) {
    this.usersCollection = db.collection('users')
    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user)
    )
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    )
  }

  public async createUser(userData: IUser) {
    const {email, password, name, phoneNumber, age} = userData;

    if (!password) {
      throw new Error("Passord not provided");
    }
    const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
    console.log(userCredential)

    if(!userCredential.user) {
      throw new Error("User can't be found")
    }
    await this.usersCollection.doc(userCredential.user.uid).set({
      name: name,
      email: email,
      age :age,
      phoneNumber: phoneNumber
    })

    await userCredential.user.updateProfile({
      displayName: name
    })
  }

  public async logout($event?: Event) {
    if($event) {
      $event.preventDefault();
    }

    await this.auth.signOut()

    await this.router.navigateByUrl('/')
  }
}
