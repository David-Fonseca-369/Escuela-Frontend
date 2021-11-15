import Swal from 'sweetalert2';

export function parsearErroresAPI(response: any): string[] {
  const resultado: string[] = [];

  if (response.error) {
    if (typeof response.error === 'string') {
      //si solo es un string
      resultado.push(response.error);
    } else if (Array.isArray(response.error)) {
      response.error.forEach((valor) => resultado.push(valor.description));
    } else {
      const mapaErrores = response.error.errors;
      //transformamos el objeto a un arreglo
      const entradas = Object.entries(mapaErrores);
      entradas.forEach((arreglo: any[]) => {
        const campo = arreglo[0]; //obtenemos el error
        arreglo[1].forEach((mensajeError) => {
          resultado.push(`${campo}: ${mensajeError}`);
        });
      });
    }
  }

  return resultado;
}

export function MensajeExistoso(mensaje: string) {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: mensaje,
    showConfirmButton: false,
    timer: 1500,
  });
}

export function MensajeError(mensaje: string) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: mensaje,
    confirmButtonColor: '#28A745',
  });
}
