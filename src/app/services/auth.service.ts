import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import IUser from "../models/user.models";
import {Observable, of} from "rxjs";
import {map, delay, filter, switchMap} from "rxjs/operators";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection: AngularFirestoreCollection<IUser>
  public isAuthenticated$: Observable<boolean>
  public isAuthenticatedWithDelay$: Observable<boolean>
  private redirect = false

  constructor(private auth: AngularFireAuth,
              private db: AngularFirestore,
              private router: Router,
              private route: ActivatedRoute) {
    this.usersCollection = db.collection('users')
    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user)
    )
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    )
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => this.route.firstChild),
      switchMap(rout => rout?.data ?? of({}))
    )
      .subscribe(data => {
        this.redirect = data.authOnly ?? false
      })
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

    if (this.redirect) {
      await this.router.navigateByUrl('/')
    }

  }
}
