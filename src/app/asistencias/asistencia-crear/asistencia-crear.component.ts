import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { alumnoAsistenciaDTO } from 'src/app/alumnos/alumno';
import { AlumnosService } from 'src/app/alumnos/alumnos.service';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { SeguridadService } from 'src/app/login/seguridad.service';
import { materiaDTO } from 'src/app/materias/materia';
import { MateriasService } from 'src/app/materias/materias.service';
import { periodoDTO } from 'src/app/periodos/periodo';
import { PeriodosService } from 'src/app/periodos/periodos.service';
import { asistenciaCabecera } from '../asistencia';

@Component({
  selector: 'app-asistencia-crear',
  templateUrl: './asistencia-crear.component.html',
  styleUrls: ['./asistencia-crear.component.css'],
})
export class AsistenciaCrearComponent implements OnInit {
  constructor(
    private materiasService: MateriasService,
    private seguridadService: SeguridadService,
    private periodosService: PeriodosService,
    private alumnosService: AlumnosService,
    private formBuilder: FormBuilder
  ) {}

  form: FormGroup;
  isLoading = false;
  materias: materiaDTO[];
  periodo: periodoDTO;
  errores: string[] = [];
  alumnosAsistencia: alumnoAsistenciaDTO[];

  asistenciaCabecera: asistenciaCabecera;

  ngOnInit(): void {
    this.cargarFormulario();
    this.obtenerMateriasAsignadas();
    this.obtenerPeriodoActual();
  }

  cargarFormulario() {
    this.form = this.formBuilder.group({
      materia: ['', { validators: [Validators.required] }],
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
          console.log(error);
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

  obtenerAlumnosAsistencia() {
    this.isLoading = true;
    if (this.form.valid) {
      this.alumnosService
        .obtenerAlumnosAsistencia(this.form.value.materia.idGrupo)
        .subscribe(
          (alumnosAsistencia) => {
            this.alumnosAsistencia = alumnosAsistencia;
            this.isLoading = false;
          },
          (error) => {
            this.errores = parsearErroresAPI(error);
            this.isLoading = false;
          }
        );
    }

    //Mandar datos de asistencia cabecera
    this.cargarDatosAsistencia();
  }

  cargarDatosAsistencia() {
    let asistenciaCabecera: asistenciaCabecera = {
      idMateria: this.form.value.materia.idMateria,
      idPeriodo: this.periodo.idPeriodo,
    };

    this.asistenciaCabecera = asistenciaCabecera;
  }

  limpiarDatos() {
    this.alumnosAsistencia = undefined;
  }
}
