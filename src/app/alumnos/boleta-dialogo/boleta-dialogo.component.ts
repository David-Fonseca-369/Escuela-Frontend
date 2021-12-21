import { Component, OnInit } from '@angular/core';
import { calificacionesBoletaDTO } from 'src/app/calificaciones/calificacion';
import { CalificacionesService } from 'src/app/calificaciones/calificaciones.service';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { SeguridadService } from 'src/app/login/seguridad.service';

@Component({
  selector: 'app-boleta-dialogo',
  templateUrl: './boleta-dialogo.component.html',
  styleUrls: ['./boleta-dialogo.component.css'],
})
export class BoletaDialogoComponent implements OnInit {
  errores: string[] = [];
  constructor(
    private calificacionesService: CalificacionesService,
    public seguridadService: SeguridadService
  ) {}

  calificacionesBoleta: calificacionesBoletaDTO[];

  ngOnInit(): void {
    this.obtenerCalificaciones();
  }

  obtenerCalificaciones() {
    let idAlumno = Number(this.seguridadService.obtenerCampoJWT('idAlumno'));

    this.calificacionesService.obtenerCalificacionesBoleta(idAlumno).subscribe(
      (calificacionesBoleta) => {
        this.calificacionesBoleta = calificacionesBoleta;
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }

  calcularPromedio(): number {
    let suma = 0;
    this.calificacionesBoleta.forEach((element) => {
      suma += element.calificacion;
    });

    return suma / this.calificacionesBoleta.length;
  }
}
