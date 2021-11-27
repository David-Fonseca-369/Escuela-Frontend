import { Component, OnInit } from '@angular/core';
import { SeguridadService } from 'src/app/login/seguridad.service';

@Component({
  selector: 'app-landing-page-administrador',
  templateUrl: './landing-page-administrador.component.html',
  styleUrls: ['./landing-page-administrador.component.css'],
})
export class LandingPageAdministradorComponent implements OnInit {
  constructor(public seguridadService: SeguridadService) {}

  ngOnInit(): void {}
}
