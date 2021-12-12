import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
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

  isLoading = false;
  materias: materiaDTO[];
  columnasAMostrar = ['opciones', 'nombre', 'grupo', 'estado'];

  //Paginación
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  errores: string[] = [];

  ngOnInit(): void {
    this.cargarRegistrosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );
  }

  cargarRegistrosPaginacion(pagina: number, cantidadElementosAMostrar) {
    this.isLoading = true;
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
}
