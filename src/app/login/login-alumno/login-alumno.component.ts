import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-login-alumno',
  templateUrl: './login-alumno.component.html',
  styleUrls: ['./login-alumno.component.css'],
})
export class LoginAlumnoComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private seguridadService: SeguridadService,
    private router: Router
  ) {}

  form: FormGroup;
  errores: string[] = [];
  isLoading = false;
  hide = true;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      curp: [
        '',
        { validators: [Validators.required, Validators.minLength(18)] },
      ],
      password: [
        '',
        { validators: [Validators.required, Validators.minLength(8)] },
      ],
    });
  }

  login() {
    this.isLoading = true;

    this.seguridadService.loginAlumno(this.form.value).subscribe(
      (response) => {
        this.isLoading = false;
        this.seguridadService.guardarToken(response);

        //mandar a landingPage alumno
        this.router.navigate(['landingPage-alumno']);
      },
      (errores) => {
        this.errores = parsearErroresAPI(errores);
        this.isLoading = false;
      }
    );
  }
}
