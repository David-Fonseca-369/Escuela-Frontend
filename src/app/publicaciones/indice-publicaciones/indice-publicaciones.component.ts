import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-indice-publicaciones',
  templateUrl: './indice-publicaciones.component.html',
  styleUrls: ['./indice-publicaciones.component.css'],
})
export class IndicePublicacionesComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  idMateria: number;

  ngOnInit(): void {
    this.asignarIdMateria();
  }

  asignarIdMateria() {
    this.activatedRoute.params.subscribe((params) => {
      this.idMateria = params.id;
    });
  }

  prueba() {
    console.log(this.idMateria);
  }
}
