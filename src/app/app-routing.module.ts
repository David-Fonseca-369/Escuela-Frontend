import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearAlumnoComponent } from './alumnos/crear-alumno/crear-alumno.component';
import { EditarAlumnoComponent } from './alumnos/editar-alumno/editar-alumno.component';
import { IndiceAlumnosDocenteComponent } from './alumnos/indice-alumnos-docente/indice-alumnos-docente.component';
import { IndiceAlumnosComponent } from './alumnos/indice-alumnos/indice-alumnos.component';
import { LandingPageAlumnoComponent } from './alumnos/landing-page-alumno/landing-page-alumno.component';
import { PublicacionesMateriaComponent } from './alumnos/publicaciones-materia/publicaciones-materia.component';
import { AsistenciaCrearComponent } from './asistencias/asistencia-crear/asistencia-crear.component';
import { ReporteAsistenciaComponent } from './asistencias/reporte-asistencia/reporte-asistencia.component';
import { CalificacionCrearComponent } from './calificaciones/calificacion-crear/calificacion-crear.component';
import { ReporteCalificacionesComponent } from './calificaciones/reporte-calificaciones/reporte-calificaciones.component';
import { CarreraTecnicaComponent } from './carrera-tecnica/carrera-tecnica.component';
import { ConfiguracionPaginaComponent } from './configuracion-pagina/configuracion-pagina.component';
import { ContactoComponent } from './contacto/contacto.component';
import { EsAdminGuard } from './es-admin.guard';
import { EsAlumnoGuard } from './es-alumno.guard';
import { EsDocenteGuard } from './es-docente.guard';
import { CrearGrupoComponent } from './grupos/crear-grupo/crear-grupo.component';
import { EditarGrupoComponent } from './grupos/editar-grupo/editar-grupo.component';
import { IndiceGruposComponent } from './grupos/indice-grupos/indice-grupos.component';
import { InvitadoComponent } from './invitado/invitado.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginAlumnoComponent } from './login/login-alumno/login-alumno.component';
import { LoginUsuarioComponent } from './login/login-usuario/login-usuario.component';
import { CrearMateriaComponent } from './materias/crear-materia/crear-materia.component';
import { EditarMateriaComponent } from './materias/editar-materia/editar-materia.component';
import { IndiceMateriasDocenteComponent } from './materias/indice-materias-docente/indice-materias-docente.component';
import { IndiceMateriasComponent } from './materias/indice-materias/indice-materias.component';
import { CrearPeriodoComponent } from './periodos/crear-periodo/crear-periodo.component';
import { IndicePeriodosComponent } from './periodos/indice-periodos/indice-periodos.component';
import { PlantaDocenteComponent } from './planta-docente/planta-docente.component';
import { CrearPublicacionComponent } from './publicaciones/crear-publicacion/crear-publicacion.component';
import { IndicePublicacionesComponent } from './publicaciones/indice-publicaciones/indice-publicaciones.component';
import { GaleriaComponent } from './resenia/galeria/galeria.component';
import { ReseniaComponent } from './resenia/resenia.component';
import { CrearAdministradorComponent } from './usuarios/crear-administrador/crear-administrador.component';
import { CrearDocenteComponent } from './usuarios/crear-docente/crear-docente.component';
import { EditarAdministradorComponent } from './usuarios/editar-administrador/editar-administrador.component';
import { EditarDocenteComponent } from './usuarios/editar-docente/editar-docente.component';
import { IndiceAdministradoresComponent } from './usuarios/indice-administradores/indice-administradores.component';
import { IndiceDocentesComponent } from './usuarios/indice-docentes/indice-docentes.component';
import { LandingPageAdministradorComponent } from './usuarios/landing-page-administrador/landing-page-administrador.component';
import { LandingPageDocenteComponent } from './usuarios/landing-page-docente/landing-page-docente.component';
import { MateriasDocentesComponent } from './usuarios/materias-docentes/materias-docentes.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },

  //Landing-Pages
  {
    path: 'landingPage-administrador',
    component: LandingPageAdministradorComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'landingPage-docente',
    component: LandingPageDocenteComponent,
    canActivate: [EsDocenteGuard],
  },

  {
    path: 'landingPage-alumno',
    component: LandingPageAlumnoComponent,
    canActivate: [EsAlumnoGuard],
  },

  //Rutas libres

  { path: 'invitado', component: InvitadoComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'resenia', component: ReseniaComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'carrera-tecnica', component: CarreraTecnicaComponent },
  { path: 'planta-docente', component: PlantaDocenteComponent },

  //Logins
  { path: 'login-alumno', component: LoginAlumnoComponent },
  { path: 'login-usuario', component: LoginUsuarioComponent },

  //Administador
  {
    path: 'grupos',
    component: IndiceGruposComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'grupos/crear',
    component: CrearGrupoComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'grupos/editar/:id',
    component: EditarGrupoComponent,
    canActivate: [EsAdminGuard],
  },

  {
    path: 'periodos',
    component: IndicePeriodosComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'periodos/crear',
    component: CrearPeriodoComponent,
    canActivate: [EsAdminGuard],
  },

  {
    path: 'materias',
    component: IndiceMateriasComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'materias/crear',
    component: CrearMateriaComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'materias/editar/:id',
    component: EditarMateriaComponent,
    canActivate: [EsAdminGuard],
  },

  {
    path: 'docentes',
    component: IndiceDocentesComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'docentes/crear',
    component: CrearDocenteComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'docentes/editar/:id',
    component: EditarDocenteComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'materiasDocentes',
    component: MateriasDocentesComponent,
    canActivate: [EsAdminGuard],
  },

  {
    path: 'administradores',
    component: IndiceAdministradoresComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'administradores/crear',
    component: CrearAdministradorComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'administradores/editar/:id',
    component: EditarAdministradorComponent,
    canActivate: [EsAdminGuard],
  },

  {
    path: 'alumnos',
    component: IndiceAlumnosComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'alumnos/crear',
    component: CrearAlumnoComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'alumnos/editar/:id',
    component: EditarAlumnoComponent,
    canActivate: [EsAdminGuard],
  },

  {
    path: 'configuracion-pagina',
    component: ConfiguracionPaginaComponent,
    canActivate: [EsAdminGuard],
  },

  //

  //Menu docente
  {
    path: 'materias-docente',
    component: IndiceMateriasDocenteComponent,
    canActivate: [EsDocenteGuard],
  },
  {
    path: 'alumnos-materia/:id',
    component: IndiceAlumnosDocenteComponent,
    canActivate: [EsDocenteGuard],
  },
  {
    path: 'asistencias/crear',
    component: AsistenciaCrearComponent,
    canActivate: [EsDocenteGuard],
  },
  {
    path: 'asistencias/reporte',
    component: ReporteAsistenciaComponent,
    canActivate: [EsDocenteGuard],
  },

  {
    path: 'calificaciones/crear',
    component: CalificacionCrearComponent,
    canActivate: [EsDocenteGuard],
  },
  {
    path: 'calificaciones/reporte',
    component: ReporteCalificacionesComponent,
    canActivate: [EsDocenteGuard],
  },

  {
    path: 'publicaciones/:id',
    component: IndicePublicacionesComponent,
    canActivate: [EsDocenteGuard],
  },
  {
    path: 'publicaciones/crear/:id',
    component: CrearPublicacionComponent,
    canActivate: [EsDocenteGuard],
  },

  //

  //Menu alumno
  {
    path: 'publicaciones-materia/:id',
    component: PublicacionesMateriaComponent,
    canActivate: [EsAlumnoGuard],
  },

  //Esta redireciona
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
