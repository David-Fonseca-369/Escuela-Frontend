import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { alumnoCalificacionDTO } from 'src/app/alumnos/alumno';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import Swal from 'sweetalert2';
import { calificacionCabecera, calificacionCreacionDTO } from '../calificacion';
import { CalificacionesService } from '../calificaciones.service';

@Component({
  selector: 'app-lista-alumnos-calificaciones',
  templateUrl: './lista-alumnos-calificaciones.component.html',
  styleUrls: ['./lista-alumnos-calificaciones.component.css'],
})
export class ListaAlumnosCalificacionesComponent implements OnInit {
  constructor(
    private calificacionesService: CalificacionesService,
    private router: Router
  ) {}

  calificacion: number;

  @Input()
  alumnosCalificacion: alumnoCalificacionDTO[];

  @Input()
  calificacionCabecera: calificacionCabecera;

  columnasAMostrar = ['nombre', 'matricula', 'asistencia'];

  errores: string[] = [];

  ngOnInit(): void {}

  mostrar() {
    console.log(this.alumnosCalificacion);
  }

  calificacionActualizar(index: number, calificacion: number) {
    let calificacionLocal = 0;

    if (calificacion != null && calificacion != undefined) {
      calificacionLocal = calificacion;
    }

    this.alumnosCalificacion[index].calificacion = calificacionLocal;
  }

  asignarCalificacion(calificacion, index: number) {
    this.alumnosCalificacion[index].calificacion = Number(calificacion);
  }

  guardarCalificaciones() {
    const califiacionCreacion: calificacionCreacionDTO = {
      idMateria: this.calificacionCabecera.idMateria,
      idPeriodo: this.calificacionCabecera.idPeriodo,
      idEvaluacion: this.calificacionCabecera.idEvaluacion,
      detalles: this.alumnosCalificacion,
    };

    this.calificacionesService.crear(califiacionCreacion).subscribe(
      () => {
        MensajeExistoso('¡Calificaciones guardadas correctamente!');
        this.router.navigate(['/landingPage-docente']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }

  guardar() {
    Swal.fire({
      title: `Guardar calificaciones`,
      text: '¿Realmente desea guardar las calificaciones?, verifique los datos, pues más tarde no se podrán editar o eliminar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.guardarCalificaciones();
      }
    });
  }
}
