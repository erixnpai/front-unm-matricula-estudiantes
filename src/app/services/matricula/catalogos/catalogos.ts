import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DICTIONARY_URL } from '../../../server/dictionary';
import { URL_MATRICULA } from '../../url-matricula';
import { catchError, lastValueFrom } from 'rxjs';
import { ApiResponse } from '../../../shared/interfaces';
import { ErrorService } from '../../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private readonly http: HttpClient, private readonly error: ErrorService) { }

  private get_AllCatalogos = DICTIONARY_URL.URL_API_MATRICULA + URL_MATRICULA.CATALOGOS.GET_ALL_CATALOGOS;
  private get_municipiobydepartamento = DICTIONARY_URL.URL_API_MATRICULA + URL_MATRICULA.CATALOGOS.FILTER_MUNICIPIO_BY_DEPARTAMENTO;
  private get_municipiobycomunidad = DICTIONARY_URL.URL_API_MATRICULA + URL_MATRICULA.CATALOGOS.FILTER_MUNICIPIO_BY_COMUNIDAD;

  async getAllCatalogos(catalogNames: string[]): Promise<ApiResponse> {
    const params = new HttpParams().set('catalogo', catalogNames.join(','));
    return lastValueFrom(this.http.get<ApiResponse>(this.get_AllCatalogos, { params }))
  }

   getMunicipioBydepartamento(departamentoId: number) {
    return lastValueFrom(this.http.get<ApiResponse>(this.get_municipiobydepartamento + departamentoId)
    .pipe(catchError(this.error.handleError)));
    }
    
   getMunicipioByComunidad(comunidadId: number) {
    return lastValueFrom(this.http.get<ApiResponse>(this.get_municipiobycomunidad + comunidadId)
    .pipe(catchError(this.error.handleError)));
    }
}
