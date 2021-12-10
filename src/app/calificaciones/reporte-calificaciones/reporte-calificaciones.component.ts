import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { SeguridadService } from 'src/app/login/seguridad.service';
import { materiaDTO } from 'src/app/materias/materia';
import { MateriasService } from 'src/app/materias/materias.service';
import { periodoDTO } from 'src/app/periodos/periodo';
import { PeriodosService } from 'src/app/periodos/periodos.service';
import { calificacionDTO } from '../calificacion';
import { CalificacionesService } from '../calificaciones.service';

@Component({
  selector: 'app-reporte-calificaciones',
  templateUrl: './reporte-calificaciones.component.html',
  styleUrls: ['./reporte-calificaciones.component.css'],
})
export class ReporteCalificacionesComponent implements OnInit {
  constructor(
    private materiasService: MateriasService,
    private seguridadService: SeguridadService,
    private periodosService: PeriodosService,
    private calificacionesService: CalificacionesService,
    private formBuilder: FormBuilder
  ) {}
  isLoading = false;
  materias: materiaDTO[];
  errores: string[] = [];
  periodo: periodoDTO;

  calificaciones: calificacionDTO[];

  form: FormGroup;

  errrores: string[] = [];

  tipos = [
    { id: 1, nombre: 'Tabla' },
    { id: 2, nombre: 'Grafica' },
  ];

  ngOnInit(): void {
    this.obtenerMateriasAsignadas();
    this.obtenerPeriodoActual();
    this.cargarFormulario();
  }

  cargarFormulario() {
    this.form = this.formBuilder.group({
      idMateria: ['', { validators: [Validators.required] }],
    });
  }

  obtenerMateriasAsignadas() {
    this.isLoading = true;
    this.materiasService
      .materiasAsignadasTodas(
        Number(this.seguridadService.obtenerCampoJWT('idUsuario'))
      )
      .subscribe(
        (materias) => {
          this.materias = materias;
          this.isLoading = false;
        },
        (error) => {
          this.errores = parsearErroresAPI(error);
          this.isLoading = false;
        }
      );
  }

  obtenerPeriodoActual() {
    this.isLoading = true;
    this.periodosService.obtenerPeriodoActual().subscribe(
      (periodo) => {
        if (periodo !== null) {
          this.periodo = periodo;
          this.isLoading = false;
        }
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
        this.isLoading = false;
      }
    );
  }

  obtenerCalificaciones() {
    this.calificacionesService
      .calificaciones(this.form.value.idMateria, this.periodo.idPeriodo)
      .subscribe(
        (calificaciones) => {
          this.calificaciones = calificaciones;

          console.log(this.calificaciones);
        },
        (error) => (this.errores = parsearErroresAPI(error))
      );
  }

  prueba() {
    this.obtenerCalificaciones();
  }
}
