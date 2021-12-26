import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { MensajeExistoso, parsearErroresAPI } from '../helpers/helpers';
import { actualizarPasswordDTO, datosUsuarioDTO } from '../login/seguridad';
import { SeguridadService } from '../login/seguridad.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  constructor(
    private seguridadService: SeguridadService,
    private formBuilder: FormBuilder
  ) {}
  datosUsuario: datosUsuarioDTO;
  errores: string[] = [];
  checked = false;
  form: FormGroup;

  ngOnInit(): void {
    this.cargarDatosUsuario();

    this.form = this.formBuilder.group({
      password: [
        '',
        { validators: [Validators.required, Validators.minLength(8)] },
      ],
      checkbox: '',
    });
  }

  cargarDatosUsuario() {
    //obtener idUsuario
    let idUsuario = 0;
    if (
      this.seguridadService.obtenerRol() === 'Administrador' ||
      this.seguridadService.obtenerRol() === 'Docente'
    ) {
      idUsuario = Number(this.seguridadService.obtenerCampoJWT('idUsuario'));
    }

    if (this.seguridadService.obtenerRol() === 'Alumno') {
      idUsuario = Number(this.seguridadService.obtenerCampoJWT('idAlumno'));
    }

    this.seguridadService
      .obtenerDatosUsario(idUsuario, this.seguridadService.obtenerRol())
      .subscribe(
        (datosUsuario) => {
          this.datosUsuario = datosUsuario;
        },
        (error) => (this.errores = parsearErroresAPI(error))
      );
  }

  cambiarPassword() {
    let idUsuario = 0;
    if (
      this.seguridadService.obtenerRol() === 'Administrador' ||
      this.seguridadService.obtenerRol() === 'Docente'
    ) {
      idUsuario = Number(this.seguridadService.obtenerCampoJWT('idUsuario'));
    }

    if (this.seguridadService.obtenerRol() === 'Alumno') {
      idUsuario = Number(this.seguridadService.obtenerCampoJWT('idAlumno'));
    }

    let actualizarPassword: actualizarPasswordDTO = {
      password: this.form.value.password,
    };

    this.seguridadService
      .cambiarPassword(
        actualizarPassword,
        idUsuario,
        this.seguridadService.obtenerRol()
      )
      .subscribe(
        () => {
          MensajeExistoso('¡Contraseña Actualizada!');
          this.checked = false;
          this.form.get('password').setValue('');
        },
        (error) => (this.errores = parsearErroresAPI(error))
      );
  }
}
