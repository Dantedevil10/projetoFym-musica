import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiLink:string='http://localhost:3000/musics'
  constructor(private http:HttpClient) {
    //this.Data()
  }
  Data():Observable<any>{
   return this.http.get<any>(this.apiLink)
  }
}
