import { Component, OnInit } from '@angular/core';
import { calificacionesBoletaDTO } from 'src/app/calificaciones/calificacion';
import { CalificacionesService } from 'src/app/calificaciones/calificaciones.service';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { SeguridadService } from 'src/app/login/seguridad.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  isLoading = false;
  calificacionesBoleta: calificacionesBoletaDTO[];
  fechaHoy: Date = new Date();

  ngOnInit(): void {
    this.obtenerCalificaciones();
  }

  obtenerCalificaciones() {
    this.isLoading = true;
    let idAlumno = Number(this.seguridadService.obtenerCampoJWT('idAlumno'));

    this.calificacionesService.obtenerCalificacionesBoleta(idAlumno).subscribe(
      (calificacionesBoleta) => {
        this.calificacionesBoleta = calificacionesBoleta;
        this.isLoading = false;
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
        this.isLoading = false;
      }
    );
  }

  calcularPromedio(): number {
    let suma = 0;
    this.calificacionesBoleta.forEach((element) => {
      suma += element.calificacion;
    });

    let promedio = (suma / this.calificacionesBoleta.length).toFixed(1);

    return Number(promedio);
  }

  downloadPDF() {
    // Extraemos el
    const DATA: any = document.getElementById('htmlData'); //tomtamos todo lo que esta en el htmldata
    const doc = new jsPDF('p', 'pt', 'a4'); //configuración del pdf parametros = orientacion |unidades | formato
    const options = {
      background: 'white', //color fondo
      scale: 3, //escala
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG'); //crear una imagen en png

        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX; //dejamos margen de 30 pt
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST' //comresión rápida
        );
        return doc;
      })
      .then((docResult) => {
        docResult.save(
          `${new Date().toISOString().slice(0, 10)}_Boleta_Calificaciones.pdf`
        ); //nombre del pdf
      });
  }
}
