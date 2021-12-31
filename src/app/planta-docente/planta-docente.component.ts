import { Component, OnInit } from '@angular/core';
import { organigramaDTO } from '../configuracion-pagina/models/organigrama';
import { OrganigramasService } from '../configuracion-pagina/servicios/organigramas.service';
import { parsearErroresAPI } from '../helpers/helpers';

@Component({
  selector: 'app-planta-docente',
  templateUrl: './planta-docente.component.html',
  styleUrls: ['./planta-docente.component.css'],
})
export class PlantaDocenteComponent implements OnInit {
  imagenOrg: organigramaDTO;
  isLoading = false;
  errores: string[] = [];
  constructor(private organigramaService: OrganigramasService) {}

  ngOnInit(): void {
    this.obtenerImagen();
  }

  obtenerImagen() {
    this.isLoading = true;
    this.organigramaService.obtenerImagen().subscribe(
      (imagen) => {
        this.imagenOrg = imagen;
        this.isLoading = false;
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
        this.isLoading = false;
      }
    );
  }
}
