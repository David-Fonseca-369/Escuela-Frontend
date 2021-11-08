import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resenia',
  templateUrl: './resenia.component.html',
  styleUrls: ['./resenia.component.css']
})
export class ReseniaComponent implements OnInit {

  constructor() { }

  images = [
    {path: '/assets/images/resenia/alum.jpg'},
    {path: '/assets/images/resenia/alumn.jpg'},
    {path: '/assets/images/resenia/Escolta.jpg'},
    {path: '/assets/images/resenia/estudiantes.jpg'},
    {path: '/assets/images/resenia/escuela.png'},
    {path: '/assets/images/resenia/primera_escolta.jpg'},
  ];

  ngOnInit(): void {
  }

}
