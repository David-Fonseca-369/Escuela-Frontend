import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { alumnoAsistenciaDTO } from 'src/app/alumnos/alumno';
import { MensajeExistoso } from 'src/app/helpers/helpers';
import { asistenciaCabecera, asistenciasCreacionDTO } from '../asistencia';
import { AsistenciasService } from '../asistencias.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css'],
})
export class ListaAlumnosComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private asistenciasService: AsistenciasService,
    private router: Router
  ) {}

  form: FormGroup;

  @Input()
  alumnosAsistencia: alumnoAsistenciaDTO[];

  @Input()
  asistenciaCabecera: asistenciaCabecera;

  columnasAMostrar = ['nombre', 'matricula', 'estado'];
  opciones = [];

  ngOnInit(): void {
    this.cargarFormularioDetalles();
  }

  cargarFormularioDetalles() {
    this.form = this.formBuilder.group({
      fecha: ['', { validators: [Validators.required] }],
    });
  }

  mostrar() {
    console.log(this.alumnosAsistencia);
  }

  guardarAsistencias() {
    const asistenciasCreacion: asistenciasCreacionDTO = {
      idMateria: this.asistenciaCabecera.idMateria,
      idPeriodo: this.asistenciaCabecera.idPeriodo,
      fecha: this.form.value.fecha,
      detalles: this.alumnosAsistencia,
    };
    this.asistenciasService.crear(asistenciasCreacion).subscribe(
      () => {
        MensajeExistoso('¡Asistencia guardada!');
        this.router.navigate(['/landingPage-docente']);
      },
      (error) => console.log(error)
    );
  }
}
