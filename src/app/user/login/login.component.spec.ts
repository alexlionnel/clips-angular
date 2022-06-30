import {render, screen} from "@testing-library/angular";
import { TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {audit} from "rxjs";

describe('LoginComponent', () => {

  beforeEach(() => {
    const auth = TestBed.inject(AngularFireAuth);
    auth.signInWithEmailAndPassword = jest.fn();
  });

  it('should create', async () => {
    await render(LoginComponent, {
      componentProviders: [
        {
          provide: AngularFireAuth,
          useValue: {
            signInWithEmailAndPassword: jest.fn()
          }
        }
      ]
    });
    expect(screen.getByRole('textbox', {name: 'Email'})).toBeDefined();
  });
});
