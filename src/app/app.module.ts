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
import { HttpClientModule } from '@angular/common/http';

//Modulo para formularios reactivos
//Tambien para el binding de doble vía 'FormsModule'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Sweet alert 2
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { MenuComponent } from './menu/menu.component';
import { InvitadoComponent } from './invitado/invitado.component';
import { ConvocatoriasComponent } from './convocatorias/convocatorias.component';
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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InvitadoComponent,
    ConvocatoriasComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
