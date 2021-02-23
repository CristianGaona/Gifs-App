import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' // no importa en que parte de la aplicación este, lo eleva a un nivel global de la app
})
export class GifsService {

  private apiKey: string = "fp1vTZY269SAdACrXgsTgNpfqqdKD6lr";
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  
  // TODO: Cambiar any por su tipo correspondiente 
  public resultados: Gif[] = [];


  get historial() {

    return [...this._historial]; // Romper la referencia y retonar un nuevo arreglo (spread)
  }

  constructor(private http: HttpClient) {
  this._historial = JSON.parse(localStorage.getItem('historial')!) || []; // Mantener el historial de búsqueda
  this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []; // Mantener el historial de búsqueda

  }

  buscarGifs(query: string = '') {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) { // Si no lo incluye lo inserta si no existe EMC6
      this._historial.unshift(query); // Agregar valor al inicio del arreglo
      this._historial = this._historial.splice(0, 10) // Corta el arreglo principal y solo toma valores del 0 al 10
      localStorage.setItem('historial', JSON.stringify(this._historial) ); // almacenar en el localStorage

    }
    
    // Agregar parametros de entrada
    const params = new HttpParams().set('api_key', this.apiKey).set('limit', '20').set('q', query);

    // Petición http (GET =  Consumo de datos)
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params: params} )
      .subscribe( (resp) => {
        this.resultados = resp.data;
        
      });

      localStorage.setItem('resultados', JSON.stringify(this.resultados) ); // almacenar en el localStorage

  }
}
