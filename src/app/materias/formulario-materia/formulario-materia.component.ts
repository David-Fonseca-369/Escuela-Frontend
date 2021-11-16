import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GruposService } from 'src/app/grupos/grupos.service';
import { grupoDTO } from 'src/app/grupos/indice-grupos/grupo';
import { materiaCreacionDTO } from '../materia';

@Component({
  selector: 'app-formulario-materia',
  templateUrl: './formulario-materia.component.html',
  styleUrls: ['./formulario-materia.component.css'],
})
export class FormularioMateriaComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private gruposService: GruposService
  ) {}
  form: FormGroup;

  @Output()
  onSubmit: EventEmitter<materiaCreacionDTO> = new EventEmitter<materiaCreacionDTO>();

  @Input()
  errores: string[] = [];

  @Input()
  modelo: materiaCreacionDTO;

  grupos: grupoDTO[];
  selectedGrupoId: number;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idGrupo: ['', { validators: [Validators.required] }],
      nombre: ['', { validators: [Validators.required] }],
      estado: false,
    });

    this.obtenerGrupos();

    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);

      //le doy el id seleecionado por default
      this.selectedGrupoId = this.modelo.idGrupo;
    }
  }

  guardar() {
    this.onSubmit.emit(this.form.value);
  }

  obtenerGrupos() {
    this.gruposService.obtenerTodos().subscribe(
      (grupos) => {
        this.grupos = grupos;
      },
      (error) => console.log(error)
    );
  }
}
