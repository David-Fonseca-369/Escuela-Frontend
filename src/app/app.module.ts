import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Importo el materila module 
import {MaterialModule} from './material/material.module';

//Carousel
import { IvyCarouselModule } from 'angular-responsive-carousel';

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
    CarreraTecnicaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    IvyCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
