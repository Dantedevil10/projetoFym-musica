import { Component,ViewChild,ElementRef} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { MuData } from '../../../models/musics.model';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.sass'
})
export class FooterComponent {

  @ViewChild('p2') p2!: ElementRef<HTMLDivElement>
  currentTime: string = '0:00';
  duration: string = '0:00';
  progress: number = 0;
  volume: number = 100;
  playorpause:string='assets/ElementosdeTestes/botao-play.png'

  currart:any;
  currtilt:any;
  currcov:any;

  selectSong!:number;

  player = new Audio()

  dados$=new Observable<MuData[]>()
  dados:MuData[]=[];


  constructor(private api:ApiService){
    this.dados$ = this.api.Data()
    this.dados$.subscribe(data=>this.dados=data)

    this.api.getValor().subscribe(valor => {
      this.selectSong = valor;
      this.Tocar(this.dados);
    });

    this.player.addEventListener('timeupdate', () => this.updateProgress());
    this.player.addEventListener('loadedmetadata', () => this.updateDuration());
    this.player.addEventListener('ended', () => this.resetPlayer());

  }

  Tocar(dados:any){
    if (dados && dados.length > 0) {
      this.player.src=this.dados[this.selectSong].SongSrc
      this.currart=this.dados[this.selectSong].Artist
      this.currcov=this.dados[this.selectSong].Cover
      this.currtilt=this.dados[this.selectSong].Title
      if(this.player.paused){
        this.player.play()
        this.playorpause='assets/ElementosdeTestes/pause.png';
      }

    }
  }

  updateDuration() {
    this.duration = this.formatTime(this.player.duration);
  }
  resetPlayer() {
    this.playorpause = 'assets/ElementosdeTestes/botao-play.png';
    this.progress = 0;
    this.currentTime = '0:00';
  }
  playPause(){
    if(this.player.paused){
      this.player.play();
      this.playorpause='assets/ElementosdeTestes/pause.png';
    }else{
      this.player.pause()
      this.playorpause='assets/ElementosdeTestes/botao-play.png';
    }
  }
  setVolume() {
  this.player.volume = this.volume / 100;
  }
  updateProgress() {
    this.currentTime = this.formatTime(this.player.currentTime);
    this.progress = (this.player.currentTime / this.player.duration) * 100;
  }
  seekBar(event: MouseEvent) {
    const p2 = this.p2.nativeElement;
    const seekTime = (event.offsetX / p2.offsetWidth) * this.player.duration;
    if (isFinite(seekTime)) {
      this.player.currentTime = seekTime;
    }
  }
  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const secs: number = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

}
