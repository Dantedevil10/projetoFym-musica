import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { MuData } from '../../../models/musics.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

  dados$=new Observable<MuData[]>();
  dados:MuData[]=[]

  ale1:number;
  ale2:number;
  ale3:number;

  constructor(private api:ApiService){
    this.dados$ = this.api.Data() //.subscribe((data)=>{this.dados=data})

    this.dados$.subscribe((data)=>{this.dados=data})

    this.ale1 = Math.floor(Math.random() * 30);
    this.ale2 = this.getUniqueRandomIndex([this.ale1]);
    this.ale3 = this.getUniqueRandomIndex([this.ale1, this.ale2]);
  }


  // Função para obter um índice aleatório único que não está na lista de exclusões
  getUniqueRandomIndex(exclude: number[]): number {
    let index = Math.floor(Math.random() * 30); // Assume que o tamanho máximo é 30

    while (exclude.includes(index)) {
      index = Math.floor(Math.random() * 30);
    }

    return index;
  }

}


