import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MensajeExistoso } from 'src/app/helpers/helpers';
import { usuarioDTO } from 'src/app/usuarios/usuario';
import Swal from 'sweetalert2';
import { alumnoDTO } from '../alumno';
import { AlumnosService } from '../alumnos.service';

@Component({
  selector: 'app-indice-alumnos',
  templateUrl: './indice-alumnos.component.html',
  styleUrls: ['./indice-alumnos.component.css'],
})
export class IndiceAlumnosComponent implements OnInit {
  constructor(private alumnosService: AlumnosService) {}

  columnasAMostrar = [
    'opciones',
    'nombre',
    'grupo',
    'matricula',
    'curp',
    'correo',
    'estado',
  ];
  alumnos: alumnoDTO[];

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
    this.alumnosService
      .obtenerPaginado(pagina, cantidadElementosAMostrar)
      .subscribe(
        (respuesta: HttpResponse<alumnoDTO[]>) => {
          this.alumnos = respuesta.body;

          this.cantidadTotalRegistros = respuesta.headers.get(
            'cantidadTotalRegistros'
          );
        },
        (error) => console.log(error)
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
  activar(alumno: alumnoDTO) {
    Swal.fire({
      title: `Activar a ${alumno.nombre}`,
      text: '¿Seguro que deseas activarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnosService.activar(alumno.idAlumno).subscribe(
          () => {
            MensajeExistoso(`¡Alumno activado!`);
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

  desactivar(alumno: alumnoDTO) {
    Swal.fire({
      title: `Desactivar a ${alumno.nombre}`,
      text: '¿Seguro que deseas desactivarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnosService.desactivar(alumno.idAlumno).subscribe(
          () => {
            MensajeExistoso(`¡Alumno desactivado!`);
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
