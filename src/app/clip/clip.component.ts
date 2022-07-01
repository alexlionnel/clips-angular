import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import videojs from "video.js";
import IClip from "../models/clip.model";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  encapsulation: ViewEncapsulation.None, // désactiver l'encapsulation, ainsi Angular ne va pas générer un id pour éviter les collisions css
  providers: [DatePipe]
})
export class ClipComponent implements OnInit {
  // ViewChild permet de sélectionner un élément dans le template. Normalement on a la valeur dans la fonction ngAfterInit
  // Mais dans le template, le composant videoPlayer est statique, il ne dépend de rien pour s'afficher (il ne dépend pas d'une variable par exemple)
  // Par conséquent, on ajoute la propriété static pour dire que le composant doit être fourni au moment du ngOnInit
  @ViewChild('videoPlayer', {static: true}) target?: ElementRef
  player?: videojs.Player
  clip?: IClip

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.player = videojs(this.target?.nativeElement)
    this.route.data.subscribe(data => {
      this.clip = data.clip as IClip
      this.player?.src({
        src: this.clip.url,
        type: 'video/mp4'
      })
    })
  }

}
