import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { alumnoCalificacionDTO } from 'src/app/alumnos/alumno';
import { AlumnosService } from 'src/app/alumnos/alumnos.service';
import { evaluacionDTO } from 'src/app/evaluaciones/evaluacion';
import { EvaluacionesService } from 'src/app/evaluaciones/evaluaciones.service';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { SeguridadService } from 'src/app/login/seguridad.service';
import { materiaDTO } from 'src/app/materias/materia';
import { MateriasService } from 'src/app/materias/materias.service';
import { periodoDTO } from 'src/app/periodos/periodo';
import { PeriodosService } from 'src/app/periodos/periodos.service';
import { calificacionCabecera } from '../calificacion';

@Component({
  selector: 'app-calificacion-crear',
  templateUrl: './calificacion-crear.component.html',
  styleUrls: ['./calificacion-crear.component.css'],
})
export class CalificacionCrearComponent implements OnInit {
  constructor(
    private materiasService: MateriasService,
    private seguridadService: SeguridadService,
    private periodosService: PeriodosService,
    private evaluacionesService: EvaluacionesService,
    private formBuilder: FormBuilder,
    private alumnosService: AlumnosService
  ) {}

  form: FormGroup;
  isLoading = false;
  materias: materiaDTO[];
  errores: string[] = [];
  periodo: periodoDTO;
  evaluacion: evaluacionDTO;

  alumnosCalificacion: alumnoCalificacionDTO[];

  datosCabecera: calificacionCabecera;
  registrosCompletos = false;

  ngOnInit(): void {
    this.cargarFormulario();
    this.obtenerMateriasAsignadas();
    this.obtenerPeriodoActual();
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

  obtenerEvaluaciones() {
    this.isLoading = true;
    this.evaluacionesService
      .obtenerEvaluaciones(
        this.form.value.materia.idMateria,
        this.periodo.idPeriodo
      )
      .subscribe(
        (evaluacion) => {
          this.evaluacion = evaluacion;
          this.isLoading = false;

          if (evaluacion === null) {
            this.registrosCompletos = true;
          }
        },
        (error) => {
          this.errores = parsearErroresAPI(error);
          this.isLoading = false;
        }
      );
  }

  cargarFormulario() {
    this.form = this.formBuilder.group({
      materia: ['', { validators: [Validators.required] }],
      idEvaluacion: ['', { validators: [Validators.required] }],
    });
  }

  obtenerAlumnosCalificacion() {
    this.isLoading = true;
    if (this.form.valid) {
      this.alumnosService
        .obtenerAlumnosCalificacion(this.form.value.materia.idGrupo)
        .subscribe(
          (alumnosCalificacion) => {
            this.alumnosCalificacion = alumnosCalificacion;
            this.isLoading = false;
          },
          (error) => {
            this.errores = parsearErroresAPI(error);
            this.isLoading = false;
          }
        );
    }

    //Mandar datos de asistencia cabecera
    this.cargarDatosCabecera();
  }

  cargarDatosCabecera() {
    let datosCabecera: calificacionCabecera = {
      idMateria: this.form.value.materia.idMateria,
      idEvaluacion: this.form.value.idEvaluacion,
      idPeriodo: this.periodo.idPeriodo,
    };

    this.datosCabecera = datosCabecera;
  }

  limpiarDatos() {
    this.obtenerEvaluaciones();
    this.alumnosCalificacion = undefined;
    this.registrosCompletos = false;
  }
}
