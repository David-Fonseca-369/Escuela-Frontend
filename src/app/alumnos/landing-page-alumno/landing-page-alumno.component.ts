import { Component, OnInit } from '@angular/core';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { SeguridadService } from 'src/app/login/seguridad.service';
import { materiaGrupoDTO } from 'src/app/materias/materia';
import { MateriasService } from 'src/app/materias/materias.service';

@Component({
  selector: 'app-landing-page-alumno',
  templateUrl: './landing-page-alumno.component.html',
  styleUrls: ['./landing-page-alumno.component.css'],
})
export class LandingPageAlumnoComponent implements OnInit {
  constructor(
    public seguridadService: SeguridadService,
    private materiasService: MateriasService
  ) {}

  materiasGrupo: materiaGrupoDTO[];
  errores: string[] = [];
  ngOnInit(): void {
    this.obtenerPorGrupo();
  }

  obtenerPorGrupo() {
    this.materiasService
      .obtenerPorGrupo(Number(this.seguridadService.obtenerCampoJWT('idGrupo')))
      .subscribe(
        (materiasGrupo) => {
          this.materiasGrupo = materiasGrupo;
        },
        (error) => (this.errores = parsearErroresAPI(error))
      );
  }
}
