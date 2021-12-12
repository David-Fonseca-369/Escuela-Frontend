import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MensajeExistoso } from 'src/app/helpers/helpers';
import Swal from 'sweetalert2';
import { materiaDTO } from '../materia';
import { MateriasService } from '../materias.service';

@Component({
  selector: 'app-indice-materias',
  templateUrl: './indice-materias.component.html',
  styleUrls: ['./indice-materias.component.css'],
})
export class IndiceMateriasComponent implements OnInit {
  constructor(private materiasService: MateriasService) {}

  materias: materiaDTO[];
  columnasAMostrar = ['opciones', 'nombre', 'grupo', 'estado'];

  //Paginación
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  ngOnInit(): void {
    this.cargarRegistrosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );
  }

  cargarRegistrosPaginacion(pagina: number, cantidadElementosAMostrar) {
    this.materiasService
      .obtenerPaginado(pagina, cantidadElementosAMostrar)
      .subscribe(
        (respuesta: HttpResponse<materiaDTO[]>) => {
          this.materias = respuesta.body;

          this.cantidadTotalRegistros = respuesta.headers.get(
            'cantidadTotalRegistros'
          );
        },
        (error) => console.error(error)
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

  activar(materia: materiaDTO) {
    Swal.fire({
      title: `Activar ${materia.nombre}`,
      text: '¿Seguro que deseas activarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.materiasService.activar(materia.idMateria).subscribe(
          () => {
            MensajeExistoso(`¡${materia.nombre} activado!`);
            this.cargarRegistrosPaginacion(
              this.paginaActual,
              this.cantidadRegistrosAMostrar
            ); //ver si hay paginación
          },
          (error) => console.log(error)
        );
      }
    });
  }

  desactivar(materia: materiaDTO) {
    Swal.fire({
      title: `Desactivar ${materia.nombre}`,
      text: '¿Seguro que deseas desactivarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.materiasService.desactivar(materia.idMateria).subscribe(
          () => {
            MensajeExistoso(`¡${materia.nombre} desactivado!`);
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
