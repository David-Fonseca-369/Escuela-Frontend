import { Injectable } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from './login/seguridad.service';

@Injectable({
  providedIn: 'root',
})
export class EsAlumnoGuard implements CanActivate {
  constructor(
    private seguridadService: SeguridadService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.seguridadService.obtenerRol() === 'Alumno') {
      return true;
    }

    this.router.navigate(['/login-alumno']);

    return false;
  }
}
