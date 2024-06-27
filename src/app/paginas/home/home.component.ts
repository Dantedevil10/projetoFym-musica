import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

  data1:any

  constructor(private api:ApiService){
    this.api.Data().subscribe(data=>{console.log(data)})
  }

}
