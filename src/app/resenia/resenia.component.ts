import { Component, OnInit } from '@angular/core';
import { imagenesGaleriaDTO } from '../configuracion-pagina/models/galeria';
import { GaleriasService } from '../configuracion-pagina/servicios/galerias.service';
import { parsearErroresAPI } from '../helpers/helpers';

@Component({
  selector: 'app-resenia',
  templateUrl: './resenia.component.html',
  styleUrls: ['./resenia.component.css'],
})
export class ReseniaComponent implements OnInit {
  imagenesGaleria: imagenesGaleriaDTO[];
  isLoading = false;
  errores: string[] = [];

  constructor(private galeriasService: GaleriasService) {}

  // images = [
  //   {
  //     path: 'https://localhost:44340/imagenes_galeria/442e7576-36c1-49af-8bc9-9bea5a7294d0.png',
  //   },
  // ];
  imagenesCarousel = [];
  ngOnInit(): void {
    this.obtenerImagenesGaleria();
  }

  obtenerImagenesGaleria() {
    this.isLoading = true;
    this.galeriasService.obtenerImagenesTodas().subscribe(
      (imagenesGaleria) => {
        this.imagenesGaleria = imagenesGaleria;

        if (imagenesGaleria.length > 0) {
          imagenesGaleria.forEach((element) => {
            this.imagenesCarousel.push({ path: element.ruta });
          });

          // console.log(this.imagenesCarousel);
        }

        this.isLoading = false;
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
        this.isLoading = false;
      }
    );
  }
}
