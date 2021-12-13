import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { SeguridadService } from 'src/app/login/seguridad.service';
import { periodoDTO } from 'src/app/periodos/periodo';
import { PeriodosService } from 'src/app/periodos/periodos.service';
import { publicacionDetallesDTO } from 'src/app/publicaciones/publicacion';
import { PublicacionesService } from 'src/app/publicaciones/publicaciones.service';

@Component({
  selector: 'app-publicaciones-materia',
  templateUrl: './publicaciones-materia.component.html',
  styleUrls: ['./publicaciones-materia.component.css'],
})
export class PublicacionesMateriaComponent implements OnInit {
  constructor(
    private publicacionesService: PublicacionesService,
    private activatedRoute: ActivatedRoute,
    private periodosService: PeriodosService
  ) {}

  publicaciones: publicacionDetallesDTO[];

  isLoading = false;
  errores: string[] = [];

  periodo: periodoDTO;

  ngOnInit(): void {
    this.obtenerPeriodoActual();
  }

  obtenerPublicaciones() {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      this.publicacionesService
        .obtenerPublicacionesMateria(params.id, this.periodo.idPeriodo)
        .subscribe(
          (publicaciones) => {
            this.publicaciones = publicaciones;
            this.isLoading = false;
          },
          (error) => {
            this.errores = parsearErroresAPI(error);
            this.isLoading = false;
          }
        );
    });
  }

  obtenerPeriodoActual() {
    this.isLoading = true;
    this.periodosService.obtenerPeriodoActual().subscribe(
      (periodo) => {
        if (periodo !== null) {
          this.periodo = periodo;
          this.isLoading = false;
          this.obtenerPublicaciones();
        }
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
        this.isLoading = false;
      }
    );
  }
}
