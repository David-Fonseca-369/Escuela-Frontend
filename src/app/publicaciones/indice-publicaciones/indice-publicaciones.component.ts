import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import { materiaDTO } from 'src/app/materias/materia';
import { MateriasService } from 'src/app/materias/materias.service';
import { periodoDTO } from 'src/app/periodos/periodo';
import { PeriodosService } from 'src/app/periodos/periodos.service';
import Swal from 'sweetalert2';
import { publicacionDTO } from '../publicacion';
import { PublicacionDialogoComponent } from '../publicacion-dialogo/publicacion-dialogo.component';
import { PublicacionesService } from '../publicaciones.service';

@Component({
  selector: 'app-indice-publicaciones',
  templateUrl: './indice-publicaciones.component.html',
  styleUrls: ['./indice-publicaciones.component.css'],
})
export class IndicePublicacionesComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private publicacionesService: PublicacionesService,
    private periodosService: PeriodosService,
    private materiasService: MateriasService,
    public dialog: MatDialog
  ) {}

  idMateria: number;
  publicaciones: publicacionDTO[];

  columnasAMostrar = ['opciones', 'nombre', 'fechaCreacion'];

  periodo: periodoDTO;

  isLoading = false;

  //
  private readonly llaveIdPublicacion = 'publicacion';

  //Paginación
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  errores: string[] = [];

  materia: materiaDTO;

  ngOnInit(): void {
    this.asignarIdMateria();
    this.obtenerPeriodoActual();
    this.obtenerMateria();

    this.cargarRegistrosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );
  }

  obtenerPeriodoActual() {
    this.isLoading = true;
    this.periodosService.obtenerPeriodoActual().subscribe(
      (periodo) => {
        if (periodo !== null) {
          this.periodo = periodo;
          this.isLoading = false;
        }
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
        this.isLoading = false;
      }
    );
  }

  asignarIdMateria() {
    this.activatedRoute.params.subscribe((params) => {
      this.idMateria = params.id;
    });
  }

  cargarRegistrosPaginacion(pagina: number, cantidadElementosAMostrar) {
    this.isLoading = true;

    this.publicacionesService
      .obtenerPaginacion(this.idMateria, 2, pagina, cantidadElementosAMostrar)
      .subscribe(
        (respuesta: HttpResponse<publicacionDTO[]>) => {
          this.publicaciones = respuesta.body;

          this.cantidadTotalRegistros = respuesta.headers.get(
            'cantidadTotalRegistros'
          );

          this.isLoading = false;
        },
        (error) => {
          console.error(error);
          this.isLoading = false;
        }
      );
  }

  obtenerMateria() {
    this.isLoading = true;

    this.materiasService.obtenerPorId(this.idMateria).subscribe(
      (materia) => {
        this.materia = materia;
        this.isLoading = false;
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
        this.isLoading = false;
      }
    );
  }
  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;

    this.cargarRegistrosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );
  }

  prueba() {
    console.log(this.idMateria);
  }

  eliminar(publicacion: publicacionDTO) {
    Swal.fire({
      title: `Eliminar ${publicacion.nombre}`,
      text: '¿Seguro que deseas eliminarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.publicacionesService.eliminar(publicacion.idPublicacion).subscribe(
          () => {
            MensajeExistoso(`¡${publicacion.nombre} eliminiado!`);
            this.cargarRegistrosPaginacion(
              this.paginaActual,
              this.cantidadRegistrosAMostrar
            ); //ver si hay paginación
          },
          (error) => (this.errores = parsearErroresAPI(this.errores))
        );
      }
    });
  }

  openDialog(idPublicacion: number) {
    //Lo guardo en la sesion storage
    sessionStorage.setItem(this.llaveIdPublicacion, idPublicacion.toString());
    const dialogRef = this.dialog.open(PublicacionDialogoComponent);
  }
}
