import { Component } from '@angular/core';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { MuData } from '../../../models/musics.model';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-song-content',
  templateUrl: './song-content.component.html',
  styleUrl: './song-content.component.sass'
})
export class SongContentComponent {

  song?:MuData;
  morecomend$=new Observable<MuData[]>()
  morecomend:MuData[]=[]

  constructor(private api:ApiService , private route:ActivatedRoute , private router: Router){
    this.getSong()
    this.morecomend$ = this.api.Data()
    this.morecomend$.subscribe(data =>{this.morecomend=data})

  }

  reloadPage(id:number){
    this.router.navigate(['/song-content', id]).then(() => {
      window.location.reload();
    });
  }
  getSong(){
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.api.GetContent(id).subscribe((data)=>{this.song=data})
  }
}
