import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { usuarioCreacionDTO } from '../usuario';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css'],
})
export class FormularioUsuarioComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  form: FormGroup;

  @Output()
  onSubmit: EventEmitter<usuarioCreacionDTO> = new EventEmitter<usuarioCreacionDTO>();

  @Input()
  errores: string[] = [];

  @Input()
  tipoTabla: string;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', { validators: [Validators.required] }],
      apellidoPaterno: ['', { validators: [Validators.required] }],
      apellidoMaterno: ['', { validators: [Validators.required] }],
      correo: ['', { validators: [Validators.required, Validators.email] }],
      password: [
        '',
        { validators: [Validators.required, Validators.minLength(8)] },
      ],
    });
  }

  guardar() {
    this.onSubmit.emit(this.form.value);
  }

  cancelar() {
    console.log(this.tipoTabla);
    this.router.navigate([`/${this.tipoTabla}`]);
  }
}
