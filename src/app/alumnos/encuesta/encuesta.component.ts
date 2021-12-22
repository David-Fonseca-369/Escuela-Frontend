import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { stringify } from 'querystring';
import { encuestaCreacionDTO } from 'src/app/configuracion-pagina/models/encuesta';
import { EncuestasService } from 'src/app/configuracion-pagina/servicios/encuestas.service';
import { GruposService } from 'src/app/grupos/grupos.service';
import { grupoDTO } from 'src/app/grupos/indice-grupos/grupo';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { SeguridadService } from 'src/app/login/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css'],
})
export class EncuestaComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  files: File[] = [];
  isEditable = true;

  errores: string[] = [];
  estadosCiviles = [
    'SOLTERO',
    'DIVORCIADO',
    'CASADO',
    'UNION LIBRE',
    'VIUDO',
    'OTRO',
  ];

  grados = ['PRIMERO', 'SEGUNDO', 'TERCERO'];
  semestres = ['PRIMERO', 'SEGUNDO', 'TERCERO', 'CUARTO', 'QUINTO', 'SEXTO'];

  parentescos = ['MADRE', 'PADRE', 'TIO', 'TIA', 'ABUELA', 'ABUELO', 'HERMANO'];

  generos = ['FEMENINO', 'MASCULINO', 'OTRO'];

  estudiosTutor = [
    'SIN ESTUDIOS',
    'PRIMARIA',
    'SECUNDARIA',
    'PREPARATORIA',
    'UNIVERSIDAD',
    'MAESTRIA',
    'DOCTORADO',
  ];
  grupos: grupoDTO[];

  constructor(
    private formBuilder: FormBuilder,
    private gruposService: GruposService,
    private encuestasService: EncuestasService,
    private seguridadService: SeguridadService
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      estadoCivil: ['', { validators: [Validators.required] }],
      nacionalidad: ['', { validators: [Validators.required] }],
      idiomas: '',
      tipoSangre: ['', { validators: [Validators.required] }],
      seguroSocial: ['', { validators: [Validators.required] }],
      grado: ['', { validators: [Validators.required] }],
      grupo: ['', { validators: [Validators.required] }],
      semestre: ['', { validators: [Validators.required] }],
      facebook: '',
      twitter: '',
    });

    this.secondFormGroup = this.formBuilder.group({
      nombreTutor: ['', { validators: [Validators.required] }],
      parentesco: ['', { validators: [Validators.required] }],
      fechaNacimiento: ['', { validators: [Validators.required] }],
      ine: ['', { validators: [Validators.required] }],
      curp: ['', { validators: [Validators.required] }],
      genero: ['', { validators: [Validators.required] }],
      estadoCivilTutor: ['', { validators: [Validators.required] }],
      ocupacion: ['', { validators: [Validators.required] }],
      estudios: ['', { validators: [Validators.required] }],
      telefono: '',
      celular: '',
      correo: '',
      domicilio: ['', { validators: [Validators.required] }],
    });

    this.obtenerGrupos();
  }

  onSelect(event) {
    if (this.files.length < 1) {
      this.files.push(...event.addedFiles);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Solo puedes agregar 1 documento.',
        confirmButtonColor: '#000',
      });
    }
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  obtenerGrupos() {
    this.gruposService.obtenerTodos().subscribe(
      (grupos) => {
        this.grupos = grupos;
      },
      (error) => console.log(error)
    );
  }
  GuardarEncuesta(stepper: MatStepper) {
    let idAlumno = Number(this.seguridadService.obtenerCampoJWT('idAlumno'));

    const encuesta: encuestaCreacionDTO = {
      idAlumno: idAlumno,
      estadoCivil: this.firstFormGroup.value.estadoCivil,
      nacionalidad: this.firstFormGroup.value.nacionalidad,
      idiomas: this.firstFormGroup.value.idiomas,
      tipoSangre: this.firstFormGroup.value.tipoSangre,
      seguroSocial: this.firstFormGroup.value.seguroSocial,
      grado: this.firstFormGroup.value.grado,
      grupo: this.firstFormGroup.value.grupo,
      semestre: this.firstFormGroup.value.semestre,
      facebook: this.firstFormGroup.value.facebook,
      twitter: this.firstFormGroup.value.twitter,

      nombreTutor: this.secondFormGroup.value.nombreTutor,
      parentesco: this.secondFormGroup.value.parentesco,
      fechaNacimiento: this.secondFormGroup.value.fechaNacimiento,
      ine: this.secondFormGroup.value.ine,
      curp: this.secondFormGroup.value.curp,
      genero: this.secondFormGroup.value.genero,
      estadoCivilTutor: this.secondFormGroup.value.estadoCivilTutor,
      ocupacion: this.secondFormGroup.value.ocupacion,
      estudios: this.secondFormGroup.value.estudios,
      telefono: this.secondFormGroup.value.telefono,
      celular: this.secondFormGroup.value.celular,
      correo: this.secondFormGroup.value.correo,
      domicilio: this.secondFormGroup.value.domicilio,
      archivo: this.files[0],
    };

    this.encuestasService.Crear(encuesta).subscribe(
      (encuestaRespuesta) => {
        console.log(encuestaRespuesta);
        stepper.next();
        this.isEditable = false;
        this.errores = [];
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }

  goFordward(stepper: MatStepper) {
    stepper.next();
  }
}
