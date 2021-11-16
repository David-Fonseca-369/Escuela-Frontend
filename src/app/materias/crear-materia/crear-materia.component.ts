import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import { materiaDTO } from '../materia';
import { MateriasService } from '../materias.service';

@Component({
  selector: 'app-crear-materia',
  templateUrl: './crear-materia.component.html',
  styleUrls: ['./crear-materia.component.css'],
})
export class CrearMateriaComponent implements OnInit {
  errores: string[] = [];
  constructor(
    private router: Router,
    private materiasService: MateriasService
  ) {}

  ngOnInit(): void {}

  guardar(materia: materiaDTO): void {
    materia.estado = true;

    this.materiasService.crear(materia).subscribe(
      () => {
        MensajeExistoso(`¡${materia.nombre} se ha creado exitosamente!`);
        this.router.navigate(['/materias']);
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
      }
    );
  }
}
