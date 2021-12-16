import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { alumnoAsistenciaDTO } from 'src/app/alumnos/alumno';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import Swal from 'sweetalert2';
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

  columnasAMostrar = ['nombre', 'matricula', 'asistencia'];

  errores: string[] = [];

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
      (error) => {
        this.errores = parsearErroresAPI(error);
      }
    );
  }

  guardar() {
    Swal.fire({
      title: `Guardar asistencias`,
      text: '¿Realmente desea guardar las asistencias?, verifique los datos, pues más tarde no se podrán editar o eliminar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.guardarAsistencias();
      }
    });
  }
}
