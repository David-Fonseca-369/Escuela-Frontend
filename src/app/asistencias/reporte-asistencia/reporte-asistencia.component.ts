import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { formatearFecha, parsearErroresAPI } from 'src/app/helpers/helpers';
import { SeguridadService } from 'src/app/login/seguridad.service';
import { materiaDTO } from 'src/app/materias/materia';
import { MateriasService } from 'src/app/materias/materias.service';
import { periodoDTO } from 'src/app/periodos/periodo';
import { PeriodosService } from 'src/app/periodos/periodos.service';
import { asistenciasDTO, asistenciasTablaDTO } from '../asistencia';
import { AsistenciasService } from '../asistencias.service';

@Component({
  selector: 'app-reporte-asistencia',
  templateUrl: './reporte-asistencia.component.html',
  styleUrls: ['./reporte-asistencia.component.css'],
})
export class ReporteAsistenciaComponent implements OnInit {
  constructor(
    private materiasService: MateriasService,
    private seguridadService: SeguridadService,
    private periodosService: PeriodosService,
    private formBuilder: FormBuilder,
    private asistenciasService: AsistenciasService
  ) {}

  form: FormGroup;

  materias: materiaDTO[];
  isLoading = false;
  errores: string[] = [];
  periodo: periodoDTO;

  asistenciasTabla: asistenciasTablaDTO;

  ngOnInit(): void {
    this.obtenerMateriasAsignadas();
    this.obtenerPeriodoActual();
    this.cargarFormulario();
  }

  range = new FormGroup({
    desde: new FormControl(Validators.required),
    hasta: new FormControl(Validators.required),
  });

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

  obtenerAsistencias() {
    console.log(
      'idMateria: ' +
        this.form.value.materia.idMateria +
        ' idGrupo: ' +
        this.form.value.materia.idGrupo
    );

    this.asistenciasService
      .obtenerAsistencias(
        this.form.value.materia.idMateria,
        this.periodo.idPeriodo,
        this.form.value.materia.idGrupo,
        formatearFecha(this.range.value.desde),
        formatearFecha(this.range.value.hasta)
      )
      .subscribe(
        (asistencias) => {
          this.asistenciasTabla = asistencias;
          console.log(asistencias);
        },
        (errores) => (this.errores = parsearErroresAPI(errores))
      );
  }

  limpiarDatos() {
    this.asistenciasTabla = undefined;
  }
}
