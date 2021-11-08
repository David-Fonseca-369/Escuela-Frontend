import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarreraTecnicaComponent } from './carrera-tecnica/carrera-tecnica.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ConvocatoriasComponent } from './convocatorias/convocatorias.component';
import { InvitadoComponent } from './invitado/invitado.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
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
  //Esta redireciona
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
