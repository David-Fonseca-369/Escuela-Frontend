import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarreraTecnicaComponent } from './carrera-tecnica/carrera-tecnica.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ConvocatoriasComponent } from './convocatorias/convocatorias.component';
import { CrearGrupoComponent } from './grupos/crear-grupo/crear-grupo.component';
import { EditarGrupoComponent } from './grupos/editar-grupo/editar-grupo.component';
import { IndiceGruposComponent } from './grupos/indice-grupos/indice-grupos.component';
import { InvitadoComponent } from './invitado/invitado.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CrearPeriodoComponent } from './periodos/crear-periodo/crear-periodo.component';
import { IndicePeriodosComponent } from './periodos/indice-periodos/indice-periodos.component';
import { PlantaDocenteComponent } from './planta-docente/planta-docente.component';
import { GaleriaComponent } from './resenia/galeria/galeria.component';
import { ReseniaComponent } from './resenia/resenia.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'invitado', component: InvitadoComponent },
  { path: 'convocatorias', component: ConvocatoriasComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'resenia', component: ReseniaComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'carrera-tecnica', component: CarreraTecnicaComponent },
  { path: 'planta-docente', component: PlantaDocenteComponent },

  //Administador
  { path: 'grupos', component: IndiceGruposComponent },
  { path: 'grupos/crear', component: CrearGrupoComponent },
  { path: 'grupos/editar/:id', component: EditarGrupoComponent },

  { path: 'periodos', component: IndicePeriodosComponent },
  { path: 'periodos/crear', component: CrearPeriodoComponent },
  //

  //Esta redireciona
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
