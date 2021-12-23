import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { EncuestasService } from 'src/app/configuracion-pagina/servicios/encuestas.service';
import { encuestaDTO } from 'src/app/configuracion-pagina/models/encuesta';
import { parsearErroresAPI } from 'src/app/helpers/helpers';

@Component({
  selector: 'app-comprobante-dialog',
  templateUrl: './comprobante-dialog.component.html',
  styleUrls: ['./comprobante-dialog.component.css'],
})
export class ComprobanteDialogComponent implements OnInit {
  constructor(private encuestasService: EncuestasService) {}
  encuestaDTO: encuestaDTO;
  errores: string[] = [];
  isLoading = false;
  idEncuesta: number;

  ngOnInit(): void {
    this.obtenerComprobante();
    this.idEncuesta = Number(sessionStorage.getItem('idEncuesta'));
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
          `${new Date().toISOString().slice(0, 10)}_Comprobante.pdf`
        ); //nombre del pdf
      });
  }

  obtenerComprobante() {
    this.isLoading = true;
    let idEncuesta = Number(sessionStorage.getItem('idEncuesta'));
    this.encuestasService.obtenerComprobante(idEncuesta).subscribe(
      (encuesta) => {
        this.encuestaDTO = encuesta;
        this.isLoading = false;
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
        this.isLoading = false;
      }
    );
  }
}
