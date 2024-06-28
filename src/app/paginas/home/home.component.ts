import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

  dados:any;
  ale1:number=Math.floor(Math.random()*30)
  ale2:number=Math.floor(Math.random()*30)
  ale3:number=Math.floor(Math.random()*30)

  constructor(private api:ApiService){
    this.api.Data().subscribe((data)=>{this.dados=data})
    this.AleFactor(this.ale1,this.ale2,this.ale3)
  }


  AleFactor(x:number,y:number,z:number){
    if(this.ale1==this.ale2||this.ale3){
      if(this.ale1<=30){
        this.ale1-1
      }else if(this.ale1>0){
        this.ale1+1
      }
    }else if(this.ale2==this.ale1||this.ale3){
      if(this.ale2<=30){
        this.ale2-1
      }else if(this.ale2>0){
        this.ale2+1
      }
    }else if(this.ale3==this.ale1||this.ale2){
      if(this.ale3<=30){
        this.ale3-1
      }else if(this.ale3>0){
        this.ale3+1
      }
    }
  }

}
