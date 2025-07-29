import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from '../error/error.service';
import { DICTIONARY_URL } from '../../server/dictionary';
import { URL_MATRICULA } from '../url-matricula';
import { catchError, lastValueFrom } from 'rxjs';
import { ApiResponse } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class Municipio {
    constructor(private readonly http: HttpClient, private readonly error: ErrorService) { }

    private get_municipios = DICTIONARY_URL.URL_API_MATRICULA + URL_MATRICULA.MUNICIPIO.ALL_MUNICIPIO


    getMunicipios(){
    return lastValueFrom(this.http.get<ApiResponse>(this.get_municipios)
    .pipe(catchError(this.error.handleError)));
    }
}
