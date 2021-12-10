import { Component, OnInit } from '@angular/core';
import { errorMonitor } from 'events';
import { publicacionDetallesDTO } from '../publicacion';
import { PublicacionesService } from '../publicaciones.service';

@Component({
  selector: 'app-publicacion-dialogo',
  templateUrl: './publicacion-dialogo.component.html',
  styleUrls: ['./publicacion-dialogo.component.css'],
})
export class PublicacionDialogoComponent implements OnInit {
  constructor(private publicacionesService: PublicacionesService) {}

  private readonly llaveIdPublicacion = 'publicacion';
  isLoading = false;

  publicacion: publicacionDetallesDTO;
  ngOnInit(): void {
    this.obtenerPublicacion();
  }

  //obtener datos de la publicacion
  obtenerPublicacion() {
    this.isLoading = true;
    let idPublicacion = Number(sessionStorage.getItem(this.llaveIdPublicacion));
    this.publicacionesService.obtenerPorId(idPublicacion).subscribe(
      (publicacion) => {
        this.publicacion = publicacion;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }
}
