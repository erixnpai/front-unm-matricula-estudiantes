import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DICTIONARY_URL } from '../../../server/dictionary';
import { URL_MATRICULA } from '../../url-matricula';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from '../../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private readonly http: HttpClient) { }

  private get_AllCatalogos = DICTIONARY_URL.URL_API_MATRICULA + URL_MATRICULA.CATALOGOS.GET_ALL_CATALOGOS;

  async getAllCatalogos(catalogNames: string[]): Promise<ApiResponse> {
    const params = new HttpParams().set('catalogo', catalogNames.join(','));
    return lastValueFrom(this.http.get<ApiResponse>(this.get_AllCatalogos, { params }))
  }
}
