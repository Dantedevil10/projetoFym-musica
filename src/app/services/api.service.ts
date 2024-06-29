import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MuData } from '../../models/musics.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private valorCompartilhado = new BehaviorSubject<number>(0);
  apiLink:string='http://localhost:3000/musics'
  
  constructor(private http:HttpClient) {

  }

  setValor(valor: number) {
    this.valorCompartilhado.next(valor);
  }
  getValor() {
    return this.valorCompartilhado.asObservable();
  }


  Data():Observable<MuData[]>{
   return this.http.get<MuData[]>(this.apiLink)
  }
  GetContent(id:number):Observable<MuData>{
    return this.http.get<MuData>(`${this.apiLink}/${id}`)
  }
}
