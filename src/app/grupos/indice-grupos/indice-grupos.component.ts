import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import Swal from 'sweetalert2';
import { GruposService } from '../grupos.service';
import { grupoDTO } from './grupo';

@Component({
  selector: 'app-indice-grupos',
  templateUrl: './indice-grupos.component.html',
  styleUrls: ['./indice-grupos.component.css'],
})
export class IndiceGruposComponent implements OnInit {
  constructor(private gruposService: GruposService) {}

  columnasAMostrar = ['opciones', 'nombre', 'estado'];
  grupos: grupoDTO[];

  //Paginación
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;
  isLoading = false;
  errores: string[] = [];

  ngOnInit(): void {
    this.cargarRegistrosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );
  }

  //Todos paginacion
  cargarRegistrosPaginacion(pagina: number, cantidadElementosAMostrar) {
    this.isLoading = true;
    this.gruposService
      .obtenerPaginado(pagina, cantidadElementosAMostrar)
      .subscribe(
        (respuesta: HttpResponse<grupoDTO[]>) => {
          this.grupos = respuesta.body;

          this.cantidadTotalRegistros = respuesta.headers.get(
            'cantidadTotalRegistros'
          );

          this.isLoading = false;
        },
        (error) => {
          this.errores = parsearErroresAPI(error);
          this.isLoading = false;
        }
      );
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;

    this.cargarRegistrosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );
  }

  //Todos consulta normal
  obTenerTodos() {
    this.gruposService.obtenerTodos().subscribe(
      (grupos) => {
        this.grupos = grupos;
      },
      (error) => console.log(error)
    );
  }

  activar(grupo: grupoDTO) {
    Swal.fire({
      title: `Activar ${grupo.nombre}`,
      text: '¿Seguro que deseas activarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.gruposService.activar(grupo.idGrupo).subscribe(
          () => {
            MensajeExistoso(`¡${grupo.nombre} activado!`);
            this.cargarRegistrosPaginacion(
              this.paginaActual,
              this.cantidadRegistrosAMostrar
            );
          },
          (error) => console.log(error)
        );
      }
    });
  }

  desactivar(grupo: grupoDTO) {
    Swal.fire({
      title: `Desactivar ${grupo.nombre}`,
      text: '¿Seguro que deseas desactivarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.gruposService.desactivar(grupo.idGrupo).subscribe(
          () => {
            MensajeExistoso(`¡${grupo.nombre} desactivado!`);
            this.cargarRegistrosPaginacion(
              this.paginaActual,
              this.cantidadRegistrosAMostrar
            );
          },
          (error) => console.log(error)
        );
      }
    });
  }
}
