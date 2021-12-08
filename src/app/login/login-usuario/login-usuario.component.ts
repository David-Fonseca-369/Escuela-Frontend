import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css'],
})
export class LoginUsuarioComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private seguridadSerive: SeguridadService,
    private router: Router
  ) {}

  form: FormGroup;
  errores: string[] = [];
  hide = true;
  isLoading = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      correo: ['', { validators: [Validators.required, Validators.email] }],
      password: [
        '',
        { validators: [Validators.required, Validators.minLength(3)] },
      ],
    });
  }

  obtenerMensajeErrorCorreo() {
    var campo = this.form.get('correo');

    if (campo.hasError('required')) {
      return 'El campo Correo es requerido';
    }

    if (campo.hasError('email')) {
      return 'El correo no es válido';
    }

    return '';
  }

  login() {
    this.isLoading = true;
    this.seguridadSerive.login(this.form.value).subscribe(
      (response) => {
        this.isLoading = false;
        this.seguridadSerive.guardarToken(response);

        if (this.seguridadSerive.obtenerRol() === 'Administrador') {
          this.router.navigate(['/landingPage-administrador']);
        }

        if (this.seguridadSerive.obtenerRol() === 'Docente') {
          this.router.navigate(['/landingPage-docente']);
        }
      },
      (errores) => {
        this.errores = parsearErroresAPI(errores);
        this.isLoading = false;
      }
    );
  }

  prueba() {
    console.log(this.seguridadSerive.obtenerRol());
  }
}
