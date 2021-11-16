import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import { usuarioCreacionDTO } from '../usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-crear-docente',
  templateUrl: './crear-docente.component.html',
  styleUrls: ['./crear-docente.component.css'],
})
export class CrearDocenteComponent implements OnInit {
  constructor(
    private router: Router,
    private usuariosService: UsuariosService
  ) {}

  errores: string[] = [];

  ngOnInit(): void {}

  guardar(usuario: usuarioCreacionDTO): void {
    this.usuariosService.crearDocente(usuario).subscribe(
      () => {
        MensajeExistoso(`¡${usuario.nombre} ha sido creado correctamente!`);
        this.router.navigate(['/docentes']);
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
      }
    );
  }
}
