import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { materiaDTO } from 'src/app/materias/materia';
import { MateriasService } from 'src/app/materias/materias.service';
import { alumnoDTO } from '../alumno';
import { AlumnosService } from '../alumnos.service';

@Component({
  selector: 'app-indice-alumnos-docente',
  templateUrl: './indice-alumnos-docente.component.html',
  styleUrls: ['./indice-alumnos-docente.component.css'],
})
export class IndiceAlumnosDocenteComponent implements OnInit {
  constructor(
    private alumnosService: AlumnosService,
    private activatedRoute: ActivatedRoute,
    private materiasService: MateriasService
  ) {}

  columnasAMostrar = ['nombre', 'matricula', 'curp', 'correo', 'estado'];
  alumnos: alumnoDTO[];

  materia: materiaDTO;

  //Paginación
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  ngOnInit(): void {
    this.obtenerDatosMateria();
  }

  cargarRegistrosPaginacion(pagina: number, cantidadElementosAMostrar) {
    this.alumnosService
      .grupoPaginacion(pagina, cantidadElementosAMostrar, this.materia.idGrupo)
      .subscribe(
        (respuesta: HttpResponse<alumnoDTO[]>) => {
          this.alumnos = respuesta.body;

          this.cantidadTotalRegistros = respuesta.headers.get(
            'cantidadTotalRegistros'
          );
          console.log(this.materia.idGrupo);
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

  obtenerDatosMateria() {
    this.activatedRoute.params.subscribe((params) => {
      this.materiasService.obtenerPorId(params.id).subscribe(
        (materia) => {
          this.materia = materia;
          this.cargarRegistrosPaginacion(
            this.paginaActual,
            this.cantidadRegistrosAMostrar
          );
        },
        (error) => console.log(error)
      );
    });
  }
}
