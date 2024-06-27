import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiLink:string='http://localhost:3000/musics'
  constructor(private http:HttpClient) {
    this.Data()
  }
  Data(){
   return this.http.get(this.apiLink)
  }
}
