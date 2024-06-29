import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { MuData } from '../../../models/musics.model';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-song-content',
  templateUrl: './song-content.component.html',
  styleUrl: './song-content.component.sass'
})
export class SongContentComponent {

  song?:MuData;
  morecomend$=new Observable<MuData[]>()
  morecomend:MuData[]=[]

  songSelected!:number;

  constructor(private api:ApiService , private route:ActivatedRoute , private router: Router,
    private renderer: Renderer2
  ){

    this.morecomend$ = this.api.Data()
    this.morecomend$.subscribe(data =>{this.morecomend=data})

    this.route.params.subscribe((params: Params) => {
      const id = +params['id']; // "+" converte o parâmetro string para número
      this.getSong(id);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.setProperty(window, 'scrollTo', [10, 10]);
    }, 10);
  }

  GiveSong(id:number){
    id = id-1
    this.api.setValor(id)
  }

  sefude(){
    window.scroll(10, 10);
  }

  reloadPage(id:number){
    this.router.navigate(['/song-content', id])
  }
  getSong(id:number){
    //const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.GetContent(id).subscribe((data)=>{this.song=data});
  }
}
