import { Injectable } from '@angular/core';
import { BASE_ENDPOINT } from '../config/app';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagoSoportadoElement } from '../models/pago-soportado';

const base_url = BASE_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class PagoSoportadoService {

  constructor(private http:HttpClient) { }
  /**
     * get all supported payments
     * @returns
     */
  getPagoSoportado(){
    const endpoint = `${base_url}/pago-soportado`;
    return this.http.get(endpoint);
  }
  /**
   *
   * @param razonSocial
   * @returns
   */
  searchPagoSoportado(razonSocial: any){
    const endpoint = `${base_url}/pago-soportado/search-razon-social/${razonSocial}`;
    return this.http.get(endpoint);
  }
  /**
   *
   * @param element
   * @returns
   */
  actualizarPagoSoportado(element: PagoSoportadoElement): Observable<any> {
    const endpoint = `${base_url}/pago-soportado-suministro/${element.id}`;
    return this.http.put(endpoint, element);
  }
}
