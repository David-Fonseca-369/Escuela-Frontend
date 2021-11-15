import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import { GruposService } from '../grupos.service';
import { grupoCreacionDTO, grupoDTO } from '../indice-grupos/grupo';

@Component({
  selector: 'app-editar-grupo',
  templateUrl: './editar-grupo.component.html',
  styleUrls: ['./editar-grupo.component.css'],
})
export class EditarGrupoComponent implements OnInit {
  constructor(
    private router: Router,
    private gruposService: GruposService,
    //activated router para poder extraer las variables de ruta de la URL
    private activatedRoute: ActivatedRoute
  ) {}

  modelo: grupoDTO;
  errores: string[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.gruposService.obtenerPorId(params.id).subscribe(
        (grupo) => {
          this.modelo = grupo;
        },
        () => this.router.navigate(['/grupos'])
      );
      //En caso de no encontrar el grupo, retornará un notfound, por lo que regresará a
      //grupos, es por ello que no se captura nigún error.
    });
  }

  guardarCambios(grupo: grupoCreacionDTO) {
    console.log(grupo);

    this.gruposService.editar(this.modelo.idGrupo, grupo).subscribe(
      () => {
        MensajeExistoso(`¡${grupo.nombre} actualizado!`);

        this.router.navigate(['/grupos']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
