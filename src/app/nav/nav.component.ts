import { Component, OnInit } from '@angular/core';
import {ModalService} from "../services/modal.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

  openModal($event: MouseEvent) {
    // pour que le navigateur ne fasse pas le comportement par défaut,
    // comme une redirection (car la fonction est sûr une element <a>)
    $event.preventDefault();

    this.modalService.toggleModal('auth');
  }
}
