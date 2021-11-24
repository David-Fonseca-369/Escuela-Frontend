import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MensajeExistoso } from 'src/app/helpers/helpers';
import Swal from 'sweetalert2';
import { usuarioDTO } from '../usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-indice-administradores',
  templateUrl: './indice-administradores.component.html',
  styleUrls: ['./indice-administradores.component.css'],
})
export class IndiceAdministradoresComponent implements OnInit {
  usuarios: usuarioDTO[];
  columnasAMostrar = ['opciones', 'nombre', 'correo', 'estado'];

  //Paginación
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.cargarRegistrosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );
  }

  cargarRegistrosPaginacion(pagina: number, cantidadElementosAMostrar) {
    this.usuariosService
      .obtenerPaginadoAdministradores(pagina, cantidadElementosAMostrar)
      .subscribe(
        (respuesta: HttpResponse<usuarioDTO[]>) => {
          this.usuarios = respuesta.body;

          this.cantidadTotalRegistros = respuesta.headers.get(
            'cantidadTotalRegistros'
          );
        },
        (error) => console.error(error)
      );
  }
  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
  }

  activar(usuario: usuarioDTO) {
    Swal.fire({
      title: `Activar a ${usuario.nombre}`,
      text: '¿Seguro que deseas activarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.activar(usuario.idUsuario).subscribe(
          () => {
            MensajeExistoso(`¡Administrador Activado!`);
            this.cargarRegistrosPaginacion(
              this.paginaActual,
              this.cantidadRegistrosAMostrar
            );
          },
          (error) => console.log(error)
        );
      }
    });
  }

  desactivar(usuario: usuarioDTO) {
    Swal.fire({
      title: `Desactivar a ${usuario.nombre}`,
      text: '¿Seguro que deseas desactivarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.desactivar(usuario.idUsuario).subscribe(
          () => {
            MensajeExistoso(`Administrador Desactivado!`);
            this.cargarRegistrosPaginacion(
              this.paginaActual,
              this.cantidadRegistrosAMostrar
            );
          },
          (error) => console.log(error)
        );
      }
    });
  }
}