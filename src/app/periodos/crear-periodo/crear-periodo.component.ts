import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MensajeError,
  MensajeExistoso,
  parsearErroresAPI,
} from 'src/app/helpers/helpers';
import Swal from 'sweetalert2';
import { PeriodosService } from '../periodos.service';

@Component({
  selector: 'app-crear-periodo',
  templateUrl: './crear-periodo.component.html',
  styleUrls: ['./crear-periodo.component.css'],
})
export class CrearPeriodoComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private periodosService: PeriodosService,
    private router: Router
  ) {}

  form: FormGroup;

  errores: string[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', { validators: [Validators.required] }],
      fechaInicio: ['', { validators: [Validators.required] }],
      fechaFin: ['', { validators: [Validators.required] }],
    });
  }

  guardar() {
    if (
      this.validarFechas(this.form.value.fechaInicio, this.form.value.fechaFin)
    ) {
      Swal.fire({
        title: `Guardar nuevo periodo`,
        text: '¿Realmente desea guardar el periodo? verifique los datos, pues más tarde no se podrán editar o eliminar. Y se reiniciaran asistencias y calificaciones para los docentes, ya que por defecto tendrán el nuevo periodo.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#28A745',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.periodosService.crear(this.form.value).subscribe(
            () => {
              MensajeExistoso(
                `¡${this.form.value.nombre} se ha guardado correctamente!`
              );
              this.router.navigate(['/periodos']);
            },
            (error) => {
              console.log('error ' + error);
              this.errores = parsearErroresAPI(error);
            }
          );
        }
      });
    }
  }
  validarFechas(fechaInicio: Date, fechaFin: Date): boolean {
    if (fechaInicio > fechaFin) {
      MensajeError('La fecha de inicio debe ser menor a la fecha final.');
      return false;
    }

    return true;
  }
}
