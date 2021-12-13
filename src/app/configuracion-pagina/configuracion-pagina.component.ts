import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {
  MensajeExistoso,
  parsearErroresAPI,
  toBase64,
} from '../helpers/helpers';
import { carousel_ImagenDTO } from './models/carousel_imagen';
import { galeriaDTO } from './models/galeria';
import { organigramaDTO } from './models/organigrama';
import { CarouselImagenesService } from './servicios/carousel-imagenes.service';
import { GaleriasService } from './servicios/galerias.service';
import { OrganigramasService } from './servicios/organigramas.service';

@Component({
  selector: 'app-configuracion-pagina',
  templateUrl: './configuracion-pagina.component.html',
  styleUrls: ['./configuracion-pagina.component.css'],
})
export class ConfiguracionPaginaComponent implements OnInit {
  constructor(
    private carouselImagenesService: CarouselImagenesService,
    private galeriasService: GaleriasService,
    private organigramasService: OrganigramasService
  ) {}
  images: File[] = [];
  images_galeria: File[] = [];

  carousel_imagenes: carousel_ImagenDTO[];
  columnasAMostrar = ['opciones', 'imagen', 'nombre'];

  galeria_imagenes: galeriaDTO[];

  errores: string[] = [];

  //imagen planta docente
  imagenBase64: string;

  archivoSeleccionado: File;
  //imagen

  //Manera temporal
  organigrama: organigramaDTO;
  urlImagenActual: string;

  ngOnInit(): void {
    this.ObtenerImagenesCarousel();
    this.ObtenerImagenesGaleria();
    this.obtenerImagenPlantaDocente();
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

  onRemoveImage(event) {
    console.log(event);
    this.images.splice(this.images.indexOf(event), 1);
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

  ObtenerImagenesGaleria() {
    this.galeriasService.obtenerTodos().subscribe(
      (galeria_imagenes) => {
        this.galeria_imagenes = galeria_imagenes;
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
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

  cargarImagenGaleria() {
    this.galeriasService.crear(this.images_galeria[0]).subscribe(
      () => {
        MensajeExistoso('¡Imagen cargada!');
        this.images_galeria = [];
        this.ObtenerImagenesGaleria();
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

  eliminarImagenGaleria(id: number) {
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
        this.galeriasService.eliminar(id).subscribe(
          () => {
            MensajeExistoso('¡Imagen eliminada!');
            this.ObtenerImagenesGaleria();
          },
          (error) => (this.errores = parsearErroresAPI(error))
        );
      }
    });
  }

  onSelectImageGaleria(event) {
    // console.log("archivo recibido " + event.addedFiles[0].name);

    if (this.images.length >= 1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Solo puedes agregar una imagen.',
        confirmButtonColor: '#000',
      });
    } else {
      this.images_galeria.push(...event.addedFiles);
    }
  }

  onRemoveImageGaleria(event) {
    console.log(event);
    this.images_galeria.splice(this.images.indexOf(event), 1);
  }

  cambiarImagen(event) {
    //Verifica que se haya seleccionado algo
    if (event.target.files.length > 0) {
      console.log(event.target.files.length);
      const file: File = event.target.files[0];

      //Pasamos el archivo y pasamos el valor.
      toBase64(file)
        .then((value: string) => (this.imagenBase64 = value))
        .catch((error) => (this.errores = parsearErroresAPI(error)));

      this.urlImagenActual = null;
      this.archivoSeleccionado = file;
    }
  }

  limpiarImagenPlantaDocente() {
    //será igual a imagen que se reciba del servidor
    this.urlImagenActual = this.organigrama.ruta;
    this.imagenBase64 = null;
  }

  editarPlantaDocente() {
    this.organigramasService.editar(this.archivoSeleccionado).subscribe(
      () => {
        MensajeExistoso('¡Imagen Actualizada!');
        this.obtenerImagenPlantaDocente();
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }

  obtenerImagenPlantaDocente() {
    this.organigramasService.obtenerImagen().subscribe(
      (organigrama) => {
        this.organigrama = organigrama;
        if (organigrama) {
          this.urlImagenActual = this.organigrama.ruta;
        }
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
