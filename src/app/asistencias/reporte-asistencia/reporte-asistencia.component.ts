import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

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

  header = [['Nombre del Alumno', 'Asistencias', 'Retardos', 'Faltas']];
  contenidoPDF: any[] = [];

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
    this.isLoading = true;
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
          this.isLoading = false;
        },
        (errores) => {
          this.errores = parsearErroresAPI(errores);
          this.isLoading = false;
        }
      );
  }

  limpiarDatos() {
    this.asistenciasTabla = undefined;
  }

  generatePDF() {
   //imagen
   var img = new Image();
   img.src = './assets/images/logo_prepa.png';


   //Imagen estado de méxico
   var imgEstadoMexico = new Image();
   imgEstadoMexico.src = './assets/images/boleta/logo-estado.jpg';    
   

   //Imagen edomex
   var imgEdomex = new Image();
   imgEdomex.src = './assets/images/boleta/logo_edomex.png';
    //
    this.convertirArreglo();

    //Calcular fechas
    let desde: Date = this.range.value.desde;
    let hasta: Date = this.range.value.hasta;

    let strDesde = `${desde.getDate()}-${
      desde.getMonth() + 1
    }-${desde.getFullYear()}`;
    let strHasta = `${hasta.getDate()}-${
      hasta.getMonth() + 1
    }-${hasta.getFullYear()}`;

    var pdf = new jsPDF();

    pdf.addImage(imgEstadoMexico, 'jpg', 6, 6, 18, 12);
    pdf.addImage(img, 'png', 26, 6.2, 14, 10);
    pdf.addImage(imgEdomex, 'png', 174, 6.2, 30, 12);
    // pdf.addImage(img, 'png', 6, 1, 14, 10);
    // pdf.setFontSize(12);
    // pdf.text('Asistencias', 22, 8);
    // pdf.setFontSize(10);
    // pdf.text(`Materia: ${this.form.value.materia.nombre}`, 50, 8);
    // pdf.text(`Periodo: ${strDesde} al ${strHasta}`, 100, 8);
    // pdf.text(
    //   `Asistencias registradas: ${this.asistenciasTabla.totalAsistenciasFila}`,
    //   160,
    //   8
    // );
    // pdf.setFontSize(12);
    // pdf.setTextColor(99);
    pdf.setFontSize(10).text('"2022. Año del Quincentenario de la Fundación de Toluca de Lerdo, Capital dle Estado de México"', 24, 26);
  
    pdf.setFontSize(14).setFont(undefined, 'bold').text('Reporte de Asistencias', 74,40);


    pdf.setFontSize(10).setFont(undefined, 'bold').text('Materia:',12,50);
    pdf.setFontSize(10).setFont(undefined, 'normal').text(this.form.value.materia.nombre,28,50);

    pdf.setFontSize(10).setFont(undefined, 'bold').text('Grupo:',12,55);
    pdf.setFontSize(10).setFont(undefined, 'normal').text(this.form.value.materia.nombreGrupo,25,55);

    pdf.setFontSize(10).setFont(undefined, 'bold').text('Periodo:',12,60);
    pdf.setFontSize(10).setFont(undefined, 'normal').text(this.periodo.nombre,28,60);
  
    pdf.setFontSize(10).setFont(undefined, 'bold').text('Docente:',12,65);
    pdf.setFontSize(10).setFont(undefined, 'normal').text(this.seguridadService.obtenerNombreCompleto(),28,65);

    pdf.setFontSize(10).setFont(undefined, 'bold').text('Fecha:',12,70);
    pdf.setFontSize(10).setFont(undefined, 'normal').text(`${new Date().toLocaleString()}`,25,70);

    pdf.setFontSize(10).setFont(undefined, 'bold').text('Asistencias registradas:',12,75);
    pdf.setFontSize(10).setFont(undefined, 'normal').text(`${this.asistenciasTabla.totalAsistenciasFila}`,53.5,75);




    (pdf as any).autoTable({

      headStyles: { halign: 'left', fillColor: [0, 0, 0] },

      startY:90,
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
    pdf.save(`Asistencias_${dia}-${mes}-${anio}.pdf`);
  }

  convertirArreglo() {
    this.asistenciasTabla.asistencias.forEach((element) => {
      //'Nombre del Alumno', 'Asistencias', 'Retardos', 'Faltas'
      let arrTemp: any[] = [];
      arrTemp.push(element.nombre);
      arrTemp.push(element.asistenciasTotal);
      arrTemp.push(element.retardosTotal);
      arrTemp.push(element.faltasTotal);

      this.contenidoPDF.push(arrTemp);
    });
  }
}
