import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import { materiaDTO } from 'src/app/materias/materia';
import { MateriasService } from 'src/app/materias/materias.service';
import { periodoDTO } from 'src/app/periodos/periodo';
import { PeriodosService } from 'src/app/periodos/periodos.service';
import { archivoCreacionDTO } from '../publicacion';
import { PublicacionesService } from '../publicaciones.service';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css'],
})
export class CrearPublicacionComponent implements OnInit {
  constructor(
    private materiasService: MateriasService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private publicacionesService: PublicacionesService,
    private periodosService: PeriodosService,
    private router: Router
  ) {}

  form: FormGroup;

  materia: materiaDTO;
  errores: string[] = [];
  isLoading = false;

  files: File[] = [];
  periodo: periodoDTO;
  archivos: archivoCreacionDTO[];

  ngOnInit(): void {
    this.cargarFormulario();
    this.obtenerMateria();
    this.obtenerPeriodoActual();
  }

  cargarFormulario() {
    this.form = this.formBuilder.group({
      idMateria: ['', { validators: [Validators.required] }],
      idPeriodo: ['', { validators: [Validators.required] }],
      nombre: ['', { validators: [Validators.required] }],
      fechaEntrega: '',
      descripcion: '',
      archivos: [],
    });
  }

  obtenerPeriodoActual() {
    this.isLoading = true;
    this.periodosService.obtenerPeriodoActual().subscribe(
      (periodo) => {
        if (periodo !== null) {
          this.periodo = periodo;
          this.form.get('idPeriodo').setValue(this.periodo.idPeriodo);
          this.isLoading = false;
        }
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
        this.isLoading = false;
      }
    );
  }

  obtenerMateria() {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      this.materiasService.obtenerPorId(params.id).subscribe(
        (materia) => {
          this.materia = materia;
          this.form.get('idMateria').setValue(this.materia.idMateria);
          this.isLoading = false;
        },
        (error) => {
          this.errores = parsearErroresAPI(error);
          this.isLoading = false;
        }
      );
    });
  }
  cambioMarkdown(texto: String) {
    //En caso de quererlo agregar al formulario para validacion.
    this.form.get('descripcion').setValue(texto);
  }

  onSelect(event) {
    // console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  cargarArchivosFormulario() {
    if (this.files.length > 0) {
      this.form.get('archivos').setValue(this.files);
    }
  }

  crearPublicacion() {
    this.cargarArchivosFormulario();
    this.publicacionesService.crear(this.form.value).subscribe(
      () => {
        MensajeExistoso('¡Publicación creada!');
        this.router.navigate(['/landingPage-docente']);
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
      }
    );
  }
}
