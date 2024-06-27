import { Component,ViewChild,ElementRef,AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.sass'
})
export class FooterComponent {

  @ViewChild('ps') ps!: ElementRef<HTMLAudioElement>
  @ViewChild('progress2') p2!: ElementRef<HTMLDivElement>
  currentTime: string = '0:00';
  duration: string = '0:00';
  progress: number = 0;
  volume: number = 100;
  playorpause:string='assets/ElementosdeTestes/botao-play.png'

  ngAfterViewInit() {
    const audio = this.ps.nativeElement;
    audio.onloadedmetadata = () => {
      this.duration = this.formatTime(audio.duration);
    };
    audio.onended = () => {
      this.playorpause = 'assets/ElementosdeTestes/botao-play.png';
    };
  }

  playPause(){
    const audio = this.ps.nativeElement
    if(audio.paused){
      audio.play();
      this.playorpause='assets/ElementosdeTestes/pause.png';
    }else{
      audio.pause()
      this.playorpause='assets/ElementosdeTestes/botao-play.png';
    }
  }
  setVolume() {
    const audio = this.ps.nativeElement;
    audio.volume = this.volume / 100;
  }
  updateProgress() {
    const audio = this.ps.nativeElement;
    this.currentTime = this.formatTime(audio.currentTime);
    this.progress = (audio.currentTime / audio.duration) * 100;
  }
  seekBar(event: MouseEvent) {
    const audio = this.ps.nativeElement;
    const p2 = this.p2.nativeElement;
    const seekTime = (event.offsetX / p2.offsetWidth) * audio.duration;
    if (isFinite(seekTime)) {
      audio.currentTime = seekTime;
    }
  }
  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const secs: number = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

}
