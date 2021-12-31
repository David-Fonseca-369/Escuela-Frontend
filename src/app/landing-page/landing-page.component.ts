import { Component, OnInit } from '@angular/core';
import { CarouselImagenesService } from '../configuracion-pagina/servicios/carousel-imagenes.service';
import { parsearErroresAPI } from '../helpers/helpers';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  errores: string[] = [];
  imagenesCarousel = [];
  isLoading = false;
  constructor(private carouselImagenesService: CarouselImagenesService) {}
  // imagesForSlider = [
  //   { path: '/assets/images/galeria/banner.jpg' },
  //   { path: 'https://pbs.twimg.com/media/Ebusw_HVAAE5L7g.jpg' },
  // ];

  ngOnInit(): void {
    this.obtenerImagenes();
  }

  obtenerImagenes() {
    this.isLoading = true;
    this.carouselImagenesService.obtenerTodos().subscribe(
      (imagenesCarousel) => {
        if (imagenesCarousel.length > 0) {
          imagenesCarousel.forEach((element) => {
            this.imagenesCarousel.push({ path: element.ruta });
          });
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
