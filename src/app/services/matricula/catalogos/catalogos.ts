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
  private get_municipiobycentrosecundaria = DICTIONARY_URL.URL_API_MATRICULA + URL_MATRICULA.CATALOGOS.FILTER_MUNICIPIO_BY_CENTRO_SECUNDARIA;
  private get_dispositivos = DICTIONARY_URL.URL_API_MATRICULA + URL_MATRICULA.CATALOGOS.ALL_DISPOSITIVOS;
  private get_idiomas_lenguas_by_number = DICTIONARY_URL.URL_API_MATRICULA + URL_MATRICULA.CATALOGOS.ALL_IDIOMAS_BY_NUMBER;
  private get_nivel_alcanzado = DICTIONARY_URL.URL_API_MATRICULA + URL_MATRICULA.CATALOGOS.ALL_NIVEL_ALCANZADO;
  private get_tipo_parentesco = DICTIONARY_URL.URL_API_MATRICULA + URL_MATRICULA.CATALOGOS.ALL_TIPO_PARENTESCO;


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
   getMunicipioByCentroSecundaria(secundaria: number) {
    return lastValueFrom(this.http.get<ApiResponse>(this.get_municipiobycentrosecundaria + secundaria)
    .pipe(catchError(this.error.handleError)));
    }

    getDispositivos(){
      return lastValueFrom(this.http.get<ApiResponse>(this.get_dispositivos)
      .pipe(catchError(this.error.handleError)));
    }

    getIdiomasLenguasByNumber(number: number) {
      return lastValueFrom(this.http.get<ApiResponse>(this.get_idiomas_lenguas_by_number + number)
      .pipe(catchError(this.error.handleError)));
    }

    getNivelAlcanzado() {
      return lastValueFrom(this.http.get<ApiResponse>(this.get_nivel_alcanzado)
      .pipe(catchError(this.error.handleError)));
    }

    getTipoParentesco() {
      return lastValueFrom(this.http.get<ApiResponse>(this.get_tipo_parentesco)
      .pipe(catchError(this.error.handleError)));
    }
}
