import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { materiaDTO } from 'src/app/materias/materia';
import { MateriasService } from 'src/app/materias/materias.service';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css'],
})
export class CrearPublicacionComponent implements OnInit {
  constructor(
    private materiasService: MateriasService,
    private activatedRoute: ActivatedRoute
  ) {}

  materia: materiaDTO;
  errores: string[] = [];
  isLoading = false;

  files: File[] = [];

  ngOnInit(): void {
    this.obtenerMateria();
  }

  obtenerMateria() {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      this.materiasService.obtenerPorId(params.id).subscribe(
        (materia) => {
          this.materia = materia;
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
    // this.form.get('biografia').setValue(texto);
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
