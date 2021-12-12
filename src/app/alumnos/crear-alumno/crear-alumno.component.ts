import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { GruposService } from 'src/app/grupos/grupos.service';
import { grupoDTO } from 'src/app/grupos/indice-grupos/grupo';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { alumnoCreacionDTO, alumnoDTO } from '../alumno';
import { AlumnosService } from '../alumnos.service';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css'],
})
export class CrearAlumnoComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private alumnosService: AlumnosService,
    private gruposService: GruposService,
    private router: Router
  ) {}

  form: FormGroup;

  errores: string[] = [];
  grupos: grupoDTO[];
  selectedGrupoId: number;
  alumno: alumnoCreacionDTO;
  generos = [
    { id: 1, nombre: 'Femenino' },
    { id: 2, nombre: 'Masculino' },
    { id: 3, nombre: 'Indefinido' },
  ];

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
        { validators: [Validators.required, Validators.maxLength(50)] },
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
      password: [
        '',
        { validators: [Validators.required, Validators.minLength(8)] },
      ],
    });

    this.obtenerGrupos();
  }

  obtenerGrupos() {
    this.gruposService.obtenerTodos().subscribe(
      (grupos) => {
        this.grupos = grupos;
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }

  guardar() {
    this.alumno = this.form.value;

    this.alumno.telefono = this.alumno.telefono.toString();
    this.alumno.numeroTutor = this.alumno.numeroTutor.toString();

    this.alumnosService.crear(this.alumno).subscribe(
      () => {
        MensajeExistoso(`¡${this.alumno.nombre} ha sido creado correctamente!`);
        this.router.navigate(['/alumnos']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
