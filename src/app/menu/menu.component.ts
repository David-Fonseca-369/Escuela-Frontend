import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoletaDialogoComponent } from '../alumnos/boleta-dialogo/boleta-dialogo.component';
import { CalificacionesService } from '../calificaciones/calificaciones.service';
import { SeguridadService } from '../login/seguridad.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(
    public seguridadService: SeguridadService,
    private calificacionesService: CalificacionesService,
    public dialog: MatDialog
  ) {}

  boletaDisponible = false;

  ngOnInit(): void {}

  openBoletaDialog() {
    const dialogRef = this.dialog.open(BoletaDialogoComponent);
  }
}
