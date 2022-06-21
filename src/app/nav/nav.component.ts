import { Component, OnInit } from '@angular/core';
import {ModalService} from "../services/modal.service";
import {AuthService} from "../services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public modalService: ModalService,
              public auth: AuthService) {}

  ngOnInit(): void {}

  openModal($event: MouseEvent) {
    // pour que le navigateur ne fasse pas le comportement par défaut,
    // comme une redirection (car la fonction est sûr une element <a>)
    $event.preventDefault();

    this.modalService.toggleModal('auth');
  }
}
