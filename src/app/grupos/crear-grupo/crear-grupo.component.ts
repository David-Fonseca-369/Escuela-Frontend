import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import { GruposService } from '../grupos.service';
import { grupoCreacionDTO } from '../indice-grupos/grupo';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.css'],
})
export class CrearGrupoComponent implements OnInit {
  errores: string[] = [];

  constructor(private router: Router, private gruposService: GruposService) {}

  guardar(grupo: grupoCreacionDTO): void {
    grupo.estado = true; //Para que se quede activo por default.
    this.gruposService.crear(grupo).subscribe(
      () => {
        MensajeExistoso(`¡${grupo.nombre} se ha guardado correctamente!`);
        this.router.navigate(['/grupos']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }

  ngOnInit(): void {}
}
