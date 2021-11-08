import { Component, OnInit } from '@angular/core';
import { Image } from '../../models';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css'],
})
export class GaleriaComponent implements OnInit {
  public selectedImage?: number = null;
  public images = [
    // { url: './assets/images/galeria/alum.jpg', row: '1/3' },
    { url: './assets/images/galeria/banner.jpg' },
    { url: './assets/images/galeria/alumn.jpg' },
    { url: './assets/images/galeria/cafe_literario.jpg' },
    { url: './assets/images/galeria/Escolta.jpg' },
    { url: './assets/images/galeria/primera_escolta.jpg' },
    { url: './assets/images/galeria/planta.jpg' },
    { url: './assets/images/galeria/jornada.jpg' },
    { url: './assets/images/galeria/escuela.png' },
    { url: './assets/images/galeria/microempresas.jpg' },
    { url: './assets/images/galeria/alumnos.jpg' },
  ] as Array<Image>;

  constructor() {}

  ngOnInit(): void {}
}
