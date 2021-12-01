import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SeguridadService } from 'src/app/login/seguridad.service';
import { materiaDTO } from '../materia';
import { MateriasService } from '../materias.service';

@Component({
  selector: 'app-indice-materias-docente',
  templateUrl: './indice-materias-docente.component.html',
  styleUrls: ['./indice-materias-docente.component.css'],
})
export class IndiceMateriasDocenteComponent implements OnInit {
  constructor(
    private materiasService: MateriasService,
    private seguridadService: SeguridadService
  ) {}

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
      .materiasAsignadasPaginacion(
        pagina,
        cantidadElementosAMostrar,
        Number(this.seguridadService.obtenerCampoJWT('idUsuario'))
      )
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
  }
}
