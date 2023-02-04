import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'kySsqY4fMlB6ymTvNOaswnYWh41z1fah'
  private _historial: string[] = []
  private url_base: string = 'https://api.giphy.com/v1/gifs/search?api_key'
  get historial (){
    return [...this._historial]
  }
  public resultados: any[] = [];
  constructor(private http: HttpClient) { }

  buscarGifs(query: string){
    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10)
    }
    this.http.get(`${this.url_base}=${this.apiKey}&q=${query}&limit=10`)
      .subscribe((resp: any)=>{
        console.log(resp.data)
        this.resultados = resp.data
      })
  }

}
