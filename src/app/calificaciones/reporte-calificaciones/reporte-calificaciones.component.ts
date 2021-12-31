import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { SeguridadService } from 'src/app/login/seguridad.service';
import { materiaDTO } from 'src/app/materias/materia';
import { MateriasService } from 'src/app/materias/materias.service';
import { periodoDTO } from 'src/app/periodos/periodo';
import { PeriodosService } from 'src/app/periodos/periodos.service';
import { calificacionDTO, calificacionesMateriaDTO } from '../calificacion';
import { CalificacionesService } from '../calificaciones.service';

@Component({
  selector: 'app-reporte-calificaciones',
  templateUrl: './reporte-calificaciones.component.html',
  styleUrls: ['./reporte-calificaciones.component.css'],
})
export class ReporteCalificacionesComponent implements OnInit {
  constructor(
    private materiasService: MateriasService,
    private seguridadService: SeguridadService,
    private periodosService: PeriodosService,
    private calificacionesService: CalificacionesService,
    private formBuilder: FormBuilder
  ) {}
  isLoading = false;
  materias: materiaDTO[];
  errores: string[] = [];
  periodo: periodoDTO;

  calificaciones: calificacionDTO[];

  calificacionesMateria: calificacionesMateriaDTO[];

  form: FormGroup;

  errrores: string[] = [];
  ///PDF
  header = [
    [
      'Nombre del Alumno',
      'Matricula',
      'Primer Parcial',
      'Segundo Parcial',
      'Tercer Parcial',
      'Promedio',
    ],
  ];

  contenidoPDF: any[] = [];
  ///

  tipoSelected: number = 1;

  tipos = [
    { id: 1, nombre: 'Tabla' },
    { id: 2, nombre: 'Grafica' },
  ];

  evaluaciones = [
    { id: 1, nombre: 'Primera Evaluación' },
    { id: 2, nombre: 'Segunda Evaluación' },
    { id: 3, nombre: 'Tercera Evaluación' },
  ];

  view = [10, 10];

  //Options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Calificaciones';
  showYAxisLabel = true;
  yAxisLabel = 'Alumnos';

  colorScheme = {
    domain: ['#AA0000', '#D47800', '#FFCD42', '#FFDD81', '#55AF83', '#387457'],
  };

  //

  ngOnInit(): void {
    this.obtenerMateriasAsignadas();
    this.obtenerPeriodoActual();
    this.cargarFormulario();

    this.form.get('idTipo').setValue(1);
    this.form.get('idEvaluacion').setValue(1);
  }

  cargarFormulario() {
    this.form = this.formBuilder.group({
      materia: ['', { validators: [Validators.required] }],
      idTipo: '',
      idEvaluacion: '',
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

  obtenerCalificaciones() {
    this.isLoading = true;
    this.calificacionesService
      .calificaciones(this.form.value.materia.idMateria, this.periodo.idPeriodo)
      .subscribe(
        (calificaciones) => {
          if (calificaciones) {
            this.calificaciones = calificaciones;
          } else {
            this.calificaciones = [];
          }

          this.isLoading = false;
        },
        (error) => {
          this.errores = parsearErroresAPI(error);
          this.isLoading = false;
        }
      );
  }

  prueba() {
    console.log(this.form.value.idTipo);
  }

  onSelect(event: any) {
    console.log(event);
  }

  generatePDF() {
    //imagen
    var img = new Image();
    img.src = './assets/images/logo_prepa.png';

    //
    this.convertirArreglo();

    var pdf = new jsPDF();

    pdf.addImage(img, 'png', 6, 1, 14, 10);
    pdf.setFontSize(12);
    pdf.text('Calificaciones', 24, 8);
    pdf.setFontSize(10);
    pdf.text(`Materia: ${this.form.value.materia.nombre}`, 60, 8);
    pdf.text(`Periodo: ${this.periodo.nombre}`, 130, 8);
    // pdf.addImage()
    pdf.setFontSize(12);
    pdf.setTextColor(99);

    (pdf as any).autoTable({
      headStyles: { halign: 'left', fillColor: [0, 0, 0] },
      head: this.header,
      body: this.contenidoPDF,

      theme: 'grid',
      didDrawCell: (data) => {
        console.log(data.column.index);
      },
    });

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow');

    let date = new Date();
    let dia = date.getDate();
    let mes = date.getMonth() + 1;
    let anio = date.getFullYear();

    // Download PDF doc
    pdf.save(
      `Calificaciones_${this.form.value.materia.nombre}_${dia}-${mes}-${anio}.pdf`
    );
  }

  convertirArreglo() {
    this.calificaciones.forEach((element) => {
      //'Nombre del Alumno', 'Asistencias', 'Retardos', 'Faltas'
      let arrTemp: any[] = [];
      let sum: number =
        element.primerParcial + element.segundoParcial + element.tercerParcial;
      let promedio: number = sum / 3;

      arrTemp.push(element.nombre);
      arrTemp.push(element.matricula);
      arrTemp.push(element.primerParcial);
      arrTemp.push(element.segundoParcial);
      arrTemp.push(element.tercerParcial);
      arrTemp.push(promedio.toFixed(2));

      this.contenidoPDF.push(arrTemp);
    });
  }

  limpiarDatos() {
    this.calificaciones = undefined;
    this.calificacionesMateria = undefined;
  }

  calcularCalificacionesEvaluacion() {
    this.calificacionesService
      .calificacionesEvaluacion(
        this.form.value.materia.idMateria,
        this.periodo.idPeriodo,
        this.form.value.idEvaluacion
      )
      .subscribe(
        (calificacionesMateria) => {
          if (calificacionesMateria) {
            Object.assign(calificacionesMateria);
            this.calificacionesMateria = calificacionesMateria;
          } else {
            this.calificacionesMateria = [];
          }
        },
        (error) => {
          this.errores = parsearErroresAPI(error);
        }
      );
  }

  downloadGrafica() {
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
        const bufferX = 30;
        const bufferY = 30;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 1 * bufferX; //dejamos margen de 30 pt
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
          `${new Date().toISOString().slice(0, 10)}_Calificaciones.pdf`
        ); //nombre del pdf
      });
  }
}
