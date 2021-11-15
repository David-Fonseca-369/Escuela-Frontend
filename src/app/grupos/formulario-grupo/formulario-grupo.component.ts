import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { grupoCreacionDTO } from '../indice-grupos/grupo';

@Component({
  selector: 'app-formulario-grupo',
  templateUrl: './formulario-grupo.component.html',
  styleUrls: ['./formulario-grupo.component.css'],
})
export class FormularioGrupoComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;

  @Output() //Para emitir el formulario al formulario padre.
  onSubmit: EventEmitter<grupoCreacionDTO> = new EventEmitter<grupoCreacionDTO>();

  @Input()
  errores: string[] = [];

  //Para editar
  @Input()
  modelo: grupoCreacionDTO;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      estado: false,
    });

    //si ya está definido o sea que se editará
    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo); //se encarga de machear las propiedades del
    }
  }

  guardar() {
    //envio el formulario

    this.onSubmit.emit(this.form.value);
  }
}
