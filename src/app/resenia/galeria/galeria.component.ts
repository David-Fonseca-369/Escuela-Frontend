import { Component, OnInit } from '@angular/core';
import {
  galeriaDTO,
  imagenesGaleriaDTO,
} from 'src/app/configuracion-pagina/models/galeria';
import { GaleriasService } from 'src/app/configuracion-pagina/servicios/galerias.service';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { Image } from '../../models';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css'],
})
export class GaleriaComponent implements OnInit {
  public selectedImage?: number = null;

  // public images = [
  //   // { url: './assets/images/galeria/alum.jpg', row: '1/3' },
  //   { url: './assets/images/galeria/banner.jpg' },
  //   { url: './assets/images/galeria/alumn.jpg' },
  //   { url: './assets/images/galeria/cafe_literario.jpg' },
  //   { url: './assets/images/galeria/Escolta.jpg' },
  //   { url: './assets/images/galeria/primera_escolta.jpg' },
  //   { url: './assets/images/galeria/planta.jpg' },
  //   { url: './assets/images/galeria/jornada.jpg' },
  //   { url: './assets/images/galeria/escuela.png' },
  //   { url: './assets/images/galeria/microempresas.jpg' },
  //   { url: './assets/images/galeria/alumnos.jpg' },
  // ] as Array<Image>;

  imagenesGaleria: imagenesGaleriaDTO[];

  isLoading = false;
  errores: string[] = [];

  constructor(private galeriasService: GaleriasService) {}

  ngOnInit(): void {
    this.obtenerImagenesGaleria();
  }

  obtenerImagenesGaleria() {
    this.isLoading = true;
    this.galeriasService.obtenerImagenesTodas().subscribe(
      (imagenesGaleria) => {
        this.imagenesGaleria = imagenesGaleria;
        this.isLoading = false;
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
        this.isLoading = false;
      }
    );
  }
}
