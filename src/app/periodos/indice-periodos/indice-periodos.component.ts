import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { periodoDTO } from '../periodo';
import { PeriodosService } from '../periodos.service';

@Component({
  selector: 'app-indice-periodos',
  templateUrl: './indice-periodos.component.html',
  styleUrls: ['./indice-periodos.component.css'],
})
export class IndicePeriodosComponent implements OnInit {
  constructor(private periodosService: PeriodosService) {}

  columnasAMostrar = ['nombre', 'fechaInicio', 'fechaFin'];
  periodos: periodoDTO[];

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
    this.periodosService
      .obtenerPaginado(pagina, cantidadElementosAMostrar)
      .subscribe(
        (respuesta: HttpResponse<periodoDTO[]>) => {
          this.periodos = respuesta.body;

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
  }
}
