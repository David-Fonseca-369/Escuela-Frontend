import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import { materiaDTO } from 'src/app/materias/materia';
import { MateriasService } from 'src/app/materias/materias.service';
import { usuarioDTO } from '../usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-materias-docentes',
  templateUrl: './materias-docentes.component.html',
  styleUrls: ['./materias-docentes.component.css'],
})
export class MateriasDocentesComponent implements OnInit {
  docentes: usuarioDTO[];

  errores: string[] = [];

  materiasDisponibles: materiaDTO[];
  materiasAsignadas: materiaDTO[];
  selectedDocenteId: number;

  constructor(
    private usuariosService: UsuariosService,
    private materiasService: MateriasService
  ) {}

  //Paginación
  cantidadTotalRegistrosDisponibles;
  paginaActualDisponibles = 1;
  cantidadRegistrosAMostrarDisponibles = 10;

  cantidadTotalRegistrosAsignadas;
  paginaActualAsignadas = 1;
  cantidadRegistrosAMostrarAsignadas = 10;

  ngOnInit(): void {
    this.cargarMateriasDisponiblesPaginacion(
      this.paginaActualDisponibles,
      this.cantidadRegistrosAMostrarDisponibles
    );

    this.obtenerDocentes();
  }

  obtenerDocentes() {
    this.usuariosService.obtenerDocentes().subscribe(
      (docentes) => {
        this.docentes = docentes;
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }

  cargarMateriasDisponiblesPaginacion(
    pagina: number,
    cantidadElementosAMostrar
  ) {
    this.materiasService
      .materiasDisponiblesPaginacion(pagina, cantidadElementosAMostrar)
      .subscribe(
        (respuesta: HttpResponse<materiaDTO[]>) => {
          this.materiasDisponibles = respuesta.body;

          this.cantidadTotalRegistrosDisponibles = respuesta.headers.get(
            'cantidadTotalRegistros'
          );
        },
        (error) => (this.errores = parsearErroresAPI(error))
      );
  }

  cargarMateriasAsignadasPaginacion(
    pagina: number,
    cantidadElementosAMostrar,
    idDocente: number
  ) {
    this.materiasService
      .materiasAsignadasPaginacion(pagina, cantidadElementosAMostrar, idDocente)
      .subscribe(
        (respuesta: HttpResponse<materiaDTO[]>) => {
          this.materiasAsignadas = respuesta.body;

          this.cantidadTotalRegistrosAsignadas = respuesta.headers.get(
            'cantidadTotalRegistros'
          );
        },
        (error) => (this.errores = parsearErroresAPI(error))
      );
  }

  actualizarPaginacionDisponibles(datos: PageEvent) {
    this.paginaActualDisponibles = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrarDisponibles = datos.pageSize;
  }

  actualizarPaginacionAsignadas(datos: PageEvent) {
    this.paginaActualAsignadas = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrarAsignadas = datos.pageSize;
  }

  cargarAsignadas() {
    this.cargarMateriasAsignadasPaginacion(
      this.paginaActualAsignadas,
      this.cantidadRegistrosAMostrarAsignadas,
      this.selectedDocenteId
    );
  }

  agregarMateria(idMateria: number) {
    this.materiasService.asignar(this.selectedDocenteId, idMateria).subscribe(
      () => {
        MensajeExistoso('¡Materia asignada!');
        this.cargarAsignadas();
        this.cargarMateriasDisponiblesPaginacion(
          this.paginaActualDisponibles,
          this.cantidadRegistrosAMostrarDisponibles
        );
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }

  quitarMateria(idMateria) {
    this.materiasService.quitar(idMateria).subscribe(
      () => {
        MensajeExistoso('¡Materia liberada!');
        this.cargarAsignadas();
        this.cargarMateriasDisponiblesPaginacion(
          this.paginaActualDisponibles,
          this.cantidadRegistrosAMostrarDisponibles
        );
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
