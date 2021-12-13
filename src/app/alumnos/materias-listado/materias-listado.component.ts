import { Component, Input, OnInit } from '@angular/core';
import { materiaGrupoDTO } from 'src/app/materias/materia';

@Component({
  selector: 'app-materias-listado',
  templateUrl: './materias-listado.component.html',
  styleUrls: ['./materias-listado.component.css'],
})
export class MateriasListadoComponent implements OnInit {
  constructor() {}

  @Input()
  materiasGrupo: materiaGrupoDTO[];

  ngOnInit(): void {}
}
