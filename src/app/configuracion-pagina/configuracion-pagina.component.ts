import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MensajeExistoso, parsearErroresAPI } from '../helpers/helpers';
import { carousel_ImagenDTO } from './models/carousel_imagen';
import { CarouselImagenesService } from './servicios/carousel-imagenes.service';

@Component({
  selector: 'app-configuracion-pagina',
  templateUrl: './configuracion-pagina.component.html',
  styleUrls: ['./configuracion-pagina.component.css'],
})
export class ConfiguracionPaginaComponent implements OnInit {
  constructor(private carouselImagenesService: CarouselImagenesService) {}
  images: File[] = [];

  carousel_imagenes: carousel_ImagenDTO[];
  columnasAMostrar = ['opciones', 'imagen', 'nombre'];

  errores: string[] = [];
  ngOnInit(): void {
    this.ObtenerImagenesCarousel();
  }

  onSelectImage(event) {
    // console.log("archivo recibido " + event.addedFiles[0].name);

    if (this.images.length >= 1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Solo puedes agregar una imagen.',
        confirmButtonColor: '#000',
      });
    } else {
      this.images.push(...event.addedFiles);
    }
  }

  ObtenerImagenesCarousel() {
    this.carouselImagenesService.obtenerTodos().subscribe(
      (imagenesCarousel) => {
        this.carousel_imagenes = imagenesCarousel;
        console.log(this.carousel_imagenes);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }

  onRemoveImage(event) {
    console.log(event);
    this.images.splice(this.images.indexOf(event), 1);
  }

  cargarImagenCarousel() {
    this.carouselImagenesService.crear(this.images[0]).subscribe(
      () => {
        MensajeExistoso('¡Imagen cargada!');
        this.images = [];
        this.ObtenerImagenesCarousel();
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }

  eliminarImagenCarousel(id: number) {
    Swal.fire({
      title: `Eliminar imagen`,
      text: '¿Estás seguro de que quieres eliminarla?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.carouselImagenesService.eliminar(id).subscribe(
          () => {
            MensajeExistoso('¡Imagen eliminada!');
            this.ObtenerImagenesCarousel();
          },
          (error) => (this.errores = parsearErroresAPI(error))
        );
      }
    });
  }
}
