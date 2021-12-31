import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { indiceEncuestaDTO } from 'src/app/configuracion-pagina/models/encuesta';
import { EncuestasService } from 'src/app/configuracion-pagina/servicios/encuestas.service';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import { MostrarErroresComponent } from 'src/app/helpers/mostrar-errores/mostrar-errores.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-indice-encuesta',
  templateUrl: './indice-encuesta.component.html',
  styleUrls: ['./indice-encuesta.component.css'],
})
export class IndiceEncuestaComponent implements OnInit {
  constructor(
    private encuestasService: EncuestasService,
    private formBuilder: FormBuilder
  ) {}
  columnasAMostrar = ['opciones', 'folio', 'nombre', 'matricula'];

  encuestas: indiceEncuestaDTO[];

  //Paginación
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  errores: string[] = [];
  isLoading = false;

  form: FormGroup;
  formularioOriginal = {
    idEncuesta: '',
  };

  ngOnInit(): void {
    this.cargarRegistrosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );

    this.form = this.formBuilder.group(this.formularioOriginal);

    this.form.valueChanges.subscribe((valores) => {
      if (valores.idEncuesta === null) {
        var valoresPred = valores;
        valores.idEncuesta = 0;
        this.buscarEncuestas(valoresPred);
      } else {
        this.buscarEncuestas(valores);
      }
    });
  }

  cargarRegistrosPaginacion(pagina: number, cantidadElementosAMostrar) {
    this.isLoading = true;

    this.encuestasService
      .obtenerTodasPaginacion(pagina, cantidadElementosAMostrar)
      .subscribe(
        (respuesta: HttpResponse<indiceEncuestaDTO[]>) => {
          this.encuestas = respuesta.body;

          this.cantidadTotalRegistros = respuesta.headers.get(
            'cantidadTotalRegistros'
          );
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

  buscarEncuestas(valores: any) {
    this.isLoading = true;
    valores.pagina = this.paginaActual;
    valores.recordsPorPagina = this.cantidadRegistrosAMostrar;

    this.encuestasService.filtrarTodas(valores).subscribe((response) => {
      this.encuestas = response.body;

      this.cantidadTotalRegistros = response.headers.get(
        'cantidadTotalRegistros'
      );

      this.isLoading = false;
    });
  }

  eliminar(id: number) {
    Swal.fire({
      title: 'Eliminar Registro',
      text: '¿Seguro que deseas eliminar el registro con folio No.' + id + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.encuestasService.eliminar(id).subscribe(
          () => {
            MensajeExistoso(`¡Registro eliminado!`);
            this.cargarRegistrosPaginacion(
              this.paginaActual,
              this.cantidadRegistrosAMostrar
            );
            this.isLoading = false;
          },
          (error) => {
            this.errores = parsearErroresAPI(error);
            this.isLoading = false;
          }
        );
      }
    });
  }
}
