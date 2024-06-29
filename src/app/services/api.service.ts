import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MuData } from '../../models/musics.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiLink:string='http://localhost:3000/musics'
  constructor(private http:HttpClient) {

  }

  Data():Observable<MuData[]>{
   return this.http.get<MuData[]>(this.apiLink)
  }
  GetContent(id:number):Observable<MuData>{
    return this.http.get<MuData>(`${this.apiLink}/${id}`)
  }
}
