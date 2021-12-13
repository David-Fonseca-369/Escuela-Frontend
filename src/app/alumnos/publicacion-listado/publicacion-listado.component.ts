import { Component, Input, OnInit } from '@angular/core';
import {
  publicacionDetallesDTO,
  publicacionDTO,
} from 'src/app/publicaciones/publicacion';

@Component({
  selector: 'app-publicacion-listado',
  templateUrl: './publicacion-listado.component.html',
  styleUrls: ['./publicacion-listado.component.css'],
})
export class PublicacionListadoComponent implements OnInit {
  constructor() {}

  @Input()
  publicaciones: publicacionDetallesDTO[];

  ngOnInit(): void {}
}
