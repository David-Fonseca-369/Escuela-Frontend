import { Component, OnInit } from '@angular/core';
import { SeguridadService } from 'src/app/login/seguridad.service';

@Component({
  selector: 'app-landing-page-docente',
  templateUrl: './landing-page-docente.component.html',
  styleUrls: ['./landing-page-docente.component.css'],
})
export class LandingPageDocenteComponent implements OnInit {
  constructor(public seguridadService: SeguridadService) {}

  ngOnInit(): void {}
}
