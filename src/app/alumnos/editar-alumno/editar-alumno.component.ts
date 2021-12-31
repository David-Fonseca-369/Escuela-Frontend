import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GruposService } from 'src/app/grupos/grupos.service';
import { grupoDTO } from 'src/app/grupos/indice-grupos/grupo';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import { alumnoCreacionDTO, alumnoDTO } from '../alumno';
import { AlumnosService } from '../alumnos.service';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.css'],
})
export class EditarAlumnoComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alumnosService: AlumnosService,
    private activatedRoute: ActivatedRoute,
    private gruposService: GruposService
  ) {}

  form: FormGroup;
  modelo: alumnoDTO;
  grupos: grupoDTO[];

  errores: string[] = [];
  checked = false;

  generos = [
    { id: 1, nombre: 'Femenino' },
    { id: 2, nombre: 'Masculino' },
    { id: 3, nombre: 'Indefinido' },
  ];
  selectedGrupoId: number;
  isLoading = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idGrupo: ['', { validators: [Validators.required] }],
      nombre: ['', { validators: [Validators.required] }],
      apellidoPaterno: ['', { validators: [Validators.required] }],
      apellidoMaterno: ['', { validators: [Validators.required] }],
      curp: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(18),
            Validators.maxLength(20),
          ],
        },
      ],
      matricula: [
        '',
        { validators: [Validators.required, Validators.maxLength(20)] },
      ],
      correo: [
        '',
        {
          validators: [
            Validators.required,
            Validators.email,
            Validators.maxLength(50),
          ],
        },
      ],
      telefono: '',
      fechaNacimiento: ['', { validators: [Validators.required] }],
      genero: ['', { validators: [Validators.required] }],
      direccion: ['', { validators: [Validators.required] }],
      nombreTutor: '',
      numeroTutor: '',
      password: ['', { validators: [Validators.minLength(8)] }],
    });

    this.obtenerAlumno();
    this.obtenerGrupos();
  }

  obtenerGrupos() {
    this.isLoading = true;
    this.gruposService.obtenerTodos().subscribe(
      (grupos) => {
        this.grupos = grupos;
        this.isLoading = false;
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
        this.isLoading = false;
      }
    );
  }

  obtenerAlumno() {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      this.alumnosService.obtenerPorId(params.id).subscribe(
        (alumno) => {
          this.modelo = alumno;
          this.form.patchValue(this.modelo);
        },
        () => this.router.navigate(['/alumnos'])
      );
      this.isLoading = false;
    });
  }

  guardar() {
    const formValue = this.form.value;

    const alumno: alumnoCreacionDTO = {
      idGrupo: formValue.idGrupo,
      nombre: formValue.nombre,
      apellidoPaterno: formValue.apellidoPaterno,
      apellidoMaterno: formValue.apellidoMaterno,
      curp: formValue.curp,
      matricula: formValue.matricula,
      correo: formValue.correo,
      telefono: formValue.telefono,
      fechaNacimiento: formValue.fechaNacimiento,
      genero: formValue.genero,
      direccion: formValue.direccion,
      nombreTutor: formValue.nombreTutor,
      numeroTutor: formValue.numeroTutor,
      password: formValue.password,
    };

    this.alumnosService.editar(this.modelo.idAlumno, alumno).subscribe(
      () => {
        MensajeExistoso(`¡Alumno modificado correctamente!`);
        this.router.navigate(['/alumnos']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
