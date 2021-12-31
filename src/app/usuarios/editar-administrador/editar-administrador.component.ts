import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import { usuarioCreacionDTO, usuarioDTO } from '../usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-editar-administrador',
  templateUrl: './editar-administrador.component.html',
  styleUrls: ['./editar-administrador.component.css'],
})
export class EditarAdministradorComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute
  ) {}

  form: FormGroup;

  modelo: usuarioDTO;

  errores: string[] = [];
  checked = false;

  isLoading = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', { validators: [Validators.required] }],
      apellidoPaterno: ['', { validators: [Validators.required] }],
      apellidoMaterno: ['', { validators: [Validators.required] }],
      correo: ['', { validators: [Validators.required, Validators.email] }],
      password: ['', { validators: [Validators.minLength(8)] }],
      checkbox: '',
    });

    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      this.usuariosService.obtenerPorId(params.id).subscribe(
        (docente) => {
          this.modelo = docente;
          this.form.patchValue(this.modelo);
        },
        () => this.router.navigate(['/administradores'])
      );
      this.isLoading = false;
    });
  }

  guardar() {
    const usuario: usuarioCreacionDTO = {
      nombre: this.form.value.nombre,
      apellidoPaterno: this.form.value.apellidoPaterno,
      apellidoMaterno: this.form.value.apellidoMaterno,
      correo: this.form.value.correo,
      password: this.form.value.password,
      estado: true, //no importa, no se edita
    };

    this.usuariosService.editar(this.modelo.idUsuario, usuario).subscribe(
      () => {
        MensajeExistoso(`¡El usuario se ha modificado correctamente!`);
        this.router.navigate(['/administradores']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
