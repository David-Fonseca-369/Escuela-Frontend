import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import { usuarioCreacionDTO } from '../usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-crear-administrador',
  templateUrl: './crear-administrador.component.html',
  styleUrls: ['./crear-administrador.component.css'],
})
export class CrearAdministradorComponent implements OnInit {
  constructor(
    private router: Router,
    private usuariosService: UsuariosService
  ) {}

  errores: string[] = [];

  ngOnInit(): void {}

  guardar(usuario: usuarioCreacionDTO): void {
    this.usuariosService.crearAdministrador(usuario).subscribe(
      () => {
        MensajeExistoso(`¡${usuario.nombre} ha sido creado correctamente!`);
        this.router.navigate(['/administradores']);
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
      }
    );
  }
}
