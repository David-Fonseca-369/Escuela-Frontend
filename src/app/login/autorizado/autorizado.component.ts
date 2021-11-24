import { Component, Input, OnInit } from '@angular/core';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-autorizado',
  templateUrl: './autorizado.component.html',
  styleUrls: ['./autorizado.component.css'],
})
export class AutorizadoComponent implements OnInit {
  constructor(private seguridadServie: SeguridadService) {}

  @Input()
  rol: string;

  ngOnInit(): void {}

  estaAutorizado(): boolean {
    if (this.rol) {
      return this.seguridadServie.obtenerRol() === this.rol;
    } else {
      return this.seguridadServie.estaLogueado();
    }
  }
}
