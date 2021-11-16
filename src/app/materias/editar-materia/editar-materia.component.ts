import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import { materiaCreacionDTO, materiaDTO } from '../materia';
import { MateriasService } from '../materias.service';

@Component({
  selector: 'app-editar-materia',
  templateUrl: './editar-materia.component.html',
  styleUrls: ['./editar-materia.component.css'],
})
export class EditarMateriaComponent implements OnInit {
  constructor(
    private router: Router,
    private materiasService: MateriasService,
    private activatedRoute: ActivatedRoute
  ) {}

  modelo: materiaDTO;
  errores: string[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramas) => {
      this.materiasService.obtenerPorId(paramas.id).subscribe(
        (materia) => {
          this.modelo = materia;
        },
        () => this.router.navigate(['/materias'])
      );
    });
  }

  guardarCambios(materia: materiaCreacionDTO) {
    this.materiasService.editar(this.modelo.idMateria, materia).subscribe(
      () => {
        MensajeExistoso(`¡${materia.nombre} actualizada!`);
        this.router.navigate(['/materias']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
