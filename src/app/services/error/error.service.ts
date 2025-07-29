import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor() { }

  handleError(error: any) {
    let errorDetails = {
      message: 'Ocurrió un error inesperado',
      code: error.code || null,
      error: error.error || null
    };

    // Verificar si es un error de cliente (ErrorEvent)
    if (error instanceof ErrorEvent) {
      errorDetails.message = `Error del cliente: ${error.message}`;
    }
    // Verificar si es un error HTTP (HttpErrorResponse)
    else if (error instanceof HttpErrorResponse) {
      // Manejar diferentes rangos de errores HTTP
      if (error.status === 0) {
        errorDetails.message = 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.';
      } else if (error.status >= 400 && error.status < 500) {
        errorDetails.message = `${error.error?.message || error.message}`;
      } else if (error.status >= 500) {
        errorDetails.message = `Error del servidor: ${error.status} - ${error.statusText}\nPor favor, intente nuevamente más tarde.`;
      }
    }
    // Si es un error no HTTP
    else if (error.rejection && typeof error.rejection === 'string') {
      errorDetails.message = error.rejection;
    }
    // Manejo genérico de otros errores
    else {
      errorDetails.message = `Error inesperado: ${error.message || 'Sin detalles adicionales disponibles.'}`;
    }

    // Consola para depuración
    console.error('Error details:', errorDetails);

    // Devolver el objeto de error formateado
    return throwError(() => errorDetails);
  }
}
