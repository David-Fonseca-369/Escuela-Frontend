import { HttpClient } from '@angular/common/http';
import { utf8Encode } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import {
  actualizarPasswordDTO,
  datosUsuarioDTO,
  loginAlumnoDTO,
  loginUsuarioDTO,
  respuestaAutenticacion,
} from './seguridad';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  apiURL = environment.apiURL + 'login';

  //llaves localStorage
  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';
  private readonly campoRol = 'rol';
  private readonly llaveNombre = 'nombre';
  private readonly llaveApellidoPaterno = 'apellidoPaterno';
  private readonly llaveApellidoMaterno = 'apellidoMaterno';

  nombre: string;
  apellidoPaterno: string;

  apellidoMaterno: string;

  login(loginUsuario: loginUsuarioDTO): Observable<respuestaAutenticacion> {
    return this.httpClient.post<respuestaAutenticacion>(
      this.apiURL + '/usuario',
      loginUsuario
    );
  }

  loginAlumno(loginAlumno: loginAlumnoDTO): Observable<respuestaAutenticacion> {
    return this.httpClient.post<respuestaAutenticacion>(
      this.apiURL + '/alumno',
      loginAlumno
    );
  }

  //Guardar informacion en localStorage
  guardarToken(respuestaAutenticacion: respuestaAutenticacion) {
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(
      this.llaveExpiracion,
      respuestaAutenticacion.expiracion.toString()
    );

    localStorage.setItem(this.llaveNombre, respuestaAutenticacion.nombre);
    localStorage.setItem(
      this.llaveApellidoPaterno,
      respuestaAutenticacion.apellidoPaterno
    );
    localStorage.setItem(
      this.llaveApellidoMaterno,
      respuestaAutenticacion.apellidoMaterno
    );
  }

  obtenerToken() {
    return localStorage.getItem(this.llaveToken);
  }

  obtenerRol(): string {
    return this.obtenerCampoJWT(this.campoRol);
  }
  public obtenerCampoJWT(campo: string): string {
    const token = localStorage.getItem(this.llaveToken);
    if (!token) {
      return '';
    }

    var dataToken = JSON.parse(atob(token.split('.')[1])); //se divide en 3, y el 1 es el de la data.

    return dataToken[campo];
  }

  logout() {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);

    localStorage.removeItem(this.llaveNombre);
    localStorage.removeItem(this.llaveApellidoPaterno);
    localStorage.removeItem(this.llaveApellidoMaterno);

    this.router.navigate(['']);
  }

  cerrarSesion() {
    Swal.fire({
      title: `Cerrar Sesión`,
      text: '¿Estás seguro de que quieres cerrar la sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout();
      }
    });
  }

  public estaLogueado(): boolean {
    const token = localStorage.getItem(this.llaveToken); //traigo el token del localStorage.

    if (!token) {
      return false; //si no hay token no está logeado
    }

    const expiracion = localStorage.getItem(this.llaveExpiracion); //si hay token, entonces traigo la expiración.
    const expiracionFecha = new Date(expiracion); //convierto la expoeracion a fecha

    if (expiracionFecha <= new Date()) {
      //verifico que aun este vigente
      //Si ya pasó la expiración del token, hago un logout
      this.logout();
      return false;
    }

    return true; //el token sigue vigente
  }

  obtenerNombre(): string {
    return localStorage.getItem(this.llaveNombre);
  }

  obtenerApellidoPaterno(): string {
    return localStorage.getItem(this.llaveApellidoPaterno);
  }

  obtenerApellidoMaterno(): string {
    return localStorage.getItem(this.llaveApellidoMaterno);
  }

  obtenerNombreCompleto(){
    return `${this.obtenerNombre()} ${this.obtenerApellidoPaterno()} ${this.obtenerApellidoMaterno()}`
  }

  obtenerDatosUsario(
    idUsuario: number,
    rol: string
  ): Observable<datosUsuarioDTO> {
    return this.httpClient.get<datosUsuarioDTO>(
      `${this.apiURL}/datosUsuario/${idUsuario}/${rol}`
    );
  }

  cambiarPassword(
    actualizarPasswordDTO: actualizarPasswordDTO,
    idUsuario: number,
    rol: string
  ) {
    return this.httpClient.put(
      `${this.apiURL}/cambiarPassword/${idUsuario}/${rol}`,
      actualizarPasswordDTO
    );
  }
}
