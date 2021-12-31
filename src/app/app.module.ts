import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Importo el materila module
import { MaterialModule } from './material/material.module';

//Carousel
import { IvyCarouselModule } from 'angular-responsive-carousel';

//Http client
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Modulo para formularios reactivos
//Tambien para el binding de doble vía 'FormsModule'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Sweet alert 2
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

//Markdown
import { MarkdownModule } from 'ngx-markdown';

//modulo dropzone
import { NgxDropzoneModule } from 'ngx-dropzone';

//Modulo ngx-chart
import { NgxChartsModule } from '@swimlane/ngx-charts';

//barcode
import { NgxBarcodeModule } from 'ngx-barcode';

import { MenuComponent } from './menu/menu.component';
import { InvitadoComponent } from './invitado/invitado.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ContactoComponent } from './contacto/contacto.component';
import { FooterComponent } from './footer/footer.component';
import { ReseniaComponent } from './resenia/resenia.component';
import { GaleriaComponent } from './resenia/galeria/galeria.component';
import { GaleriaCarouselComponent } from './resenia/galeria-carousel/galeria-carousel.component';
import { CarreraTecnicaComponent } from './carrera-tecnica/carrera-tecnica.component';
import { PlantaDocenteComponent } from './planta-docente/planta-docente.component';
import { IndiceGruposComponent } from './grupos/indice-grupos/indice-grupos.component';
import { FormularioGrupoComponent } from './grupos/formulario-grupo/formulario-grupo.component';
import { CrearGrupoComponent } from './grupos/crear-grupo/crear-grupo.component';
import { MostrarErroresComponent } from './helpers/mostrar-errores/mostrar-errores.component';
import { EditarGrupoComponent } from './grupos/editar-grupo/editar-grupo.component';
import { IndicePeriodosComponent } from './periodos/indice-periodos/indice-periodos.component';
import { CrearPeriodoComponent } from './periodos/crear-periodo/crear-periodo.component';
import { IndiceMateriasComponent } from './materias/indice-materias/indice-materias.component';
import { FormularioMateriaComponent } from './materias/formulario-materia/formulario-materia.component';
import { CrearMateriaComponent } from './materias/crear-materia/crear-materia.component';
import { EditarMateriaComponent } from './materias/editar-materia/editar-materia.component';
import { IndiceDocentesComponent } from './usuarios/indice-docentes/indice-docentes.component';
import { FormularioUsuarioComponent } from './usuarios/formulario-usuario/formulario-usuario.component';
import { CrearDocenteComponent } from './usuarios/crear-docente/crear-docente.component';
import { EditarDocenteComponent } from './usuarios/editar-docente/editar-docente.component';
import { IndiceAdministradoresComponent } from './usuarios/indice-administradores/indice-administradores.component';
import { EditarAdministradorComponent } from './usuarios/editar-administrador/editar-administrador.component';
import { CrearAdministradorComponent } from './usuarios/crear-administrador/crear-administrador.component';
import { IndiceAlumnosComponent } from './alumnos/indice-alumnos/indice-alumnos.component';
import { CrearAlumnoComponent } from './alumnos/crear-alumno/crear-alumno.component';
import { EditarAlumnoComponent } from './alumnos/editar-alumno/editar-alumno.component';
import { MateriasDocentesComponent } from './usuarios/materias-docentes/materias-docentes.component';
import { LoginAlumnoComponent } from './login/login-alumno/login-alumno.component';
import { LoginUsuarioComponent } from './login/login-usuario/login-usuario.component';
import { AutorizadoComponent } from './login/autorizado/autorizado.component';
import { LandingPageAdministradorComponent } from './usuarios/landing-page-administrador/landing-page-administrador.component';
import { LandingPageDocenteComponent } from './usuarios/landing-page-docente/landing-page-docente.component';
import { IndiceMateriasDocenteComponent } from './materias/indice-materias-docente/indice-materias-docente.component';
import { IndiceAlumnosDocenteComponent } from './alumnos/indice-alumnos-docente/indice-alumnos-docente.component';
import { AsistenciaCrearComponent } from './asistencias/asistencia-crear/asistencia-crear.component';
import { ListaAlumnosComponent } from './asistencias/lista-alumnos/lista-alumnos.component';
import { SpinnerComponent } from './helpers/spinner/spinner.component';
import { ReporteAsistenciaComponent } from './asistencias/reporte-asistencia/reporte-asistencia.component';
import { CalificacionCrearComponent } from './calificaciones/calificacion-crear/calificacion-crear.component';
import { ListaAlumnosCalificacionesComponent } from './calificaciones/lista-alumnos-calificaciones/lista-alumnos-calificaciones.component';
import { IndicePublicacionesComponent } from './publicaciones/indice-publicaciones/indice-publicaciones.component';
import { CrearPublicacionComponent } from './publicaciones/crear-publicacion/crear-publicacion.component';
import { InputMarkdownComponent } from './helpers/input-markdown/input-markdown.component';
import { ReporteCalificacionesComponent } from './calificaciones/reporte-calificaciones/reporte-calificaciones.component';
import { PublicacionDialogoComponent } from './publicaciones/publicacion-dialogo/publicacion-dialogo.component';
import { ConfiguracionPaginaComponent } from './configuracion-pagina/configuracion-pagina.component';
import { LandingPageAlumnoComponent } from './alumnos/landing-page-alumno/landing-page-alumno.component';
import { MateriasListadoComponent } from './alumnos/materias-listado/materias-listado.component';
import { PublicacionesMateriaComponent } from './alumnos/publicaciones-materia/publicaciones-materia.component';
import { PublicacionListadoComponent } from './alumnos/publicacion-listado/publicacion-listado.component';
import { PerfilComponent } from './perfil/perfil.component';
import { BoletaDialogoComponent } from './alumnos/boleta-dialogo/boleta-dialogo.component';
import { EncuestaComponent } from './alumnos/encuesta/encuesta.component';
import { ComprobanteDialogComponent } from './alumnos/comprobante-dialog/comprobante-dialog.component';
import { SeguridadInterceptorService } from './seguridad/seguridad-interceptor.service';
import { IndiceEncuestaComponent } from './encuesta/indice-encuesta/indice-encuesta.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InvitadoComponent,
    LandingPageComponent,
    ContactoComponent,
    FooterComponent,
    ReseniaComponent,
    GaleriaComponent,
    GaleriaCarouselComponent,
    CarreraTecnicaComponent,
    PlantaDocenteComponent,
    IndiceGruposComponent,
    FormularioGrupoComponent,
    CrearGrupoComponent,
    MostrarErroresComponent,
    EditarGrupoComponent,
    IndicePeriodosComponent,
    CrearPeriodoComponent,
    IndiceMateriasComponent,
    FormularioMateriaComponent,
    CrearMateriaComponent,
    EditarMateriaComponent,
    IndiceDocentesComponent,
    FormularioUsuarioComponent,
    CrearDocenteComponent,
    EditarDocenteComponent,
    IndiceAdministradoresComponent,
    EditarAdministradorComponent,
    CrearAdministradorComponent,
    IndiceAlumnosComponent,
    CrearAlumnoComponent,
    EditarAlumnoComponent,
    MateriasDocentesComponent,
    LoginAlumnoComponent,
    LoginUsuarioComponent,
    AutorizadoComponent,
    LandingPageAdministradorComponent,
    LandingPageDocenteComponent,
    IndiceMateriasDocenteComponent,
    IndiceAlumnosDocenteComponent,
    AsistenciaCrearComponent,
    ListaAlumnosComponent,
    SpinnerComponent,
    ReporteAsistenciaComponent,
    CalificacionCrearComponent,
    ListaAlumnosCalificacionesComponent,
    IndicePublicacionesComponent,
    CrearPublicacionComponent,
    InputMarkdownComponent,
    ReporteCalificacionesComponent,
    PublicacionDialogoComponent,
    ConfiguracionPaginaComponent,
    LandingPageAlumnoComponent,
    MateriasListadoComponent,
    PublicacionesMateriaComponent,
    PublicacionListadoComponent,
    PerfilComponent,
    BoletaDialogoComponent,
    EncuestaComponent,
    ComprobanteDialogComponent,
    IndiceEncuestaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    IvyCarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module,
    NgxDropzoneModule,
    NgxChartsModule,
    NgxBarcodeModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SeguridadInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
