import { Component,ViewChild,ElementRef,AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.sass'
})
export class FooterComponent {

  @ViewChild('ps') ps!: ElementRef<HTMLAudioElement>
  currentTime: string = '0:00';
  duration: string = '0:00';
  progress: number = 0;
  isDragging: boolean = false;
  volume: number = 100;

  ngAfterViewInit() {
    const audio = this.ps.nativeElement;
    audio.onloadedmetadata = () => {
      this.duration = this.formatTime(audio.duration);
    };
  }

  playPause(){
    const audio = this.ps.nativeElement
    if(audio.paused){
      audio.play();
    }else{
      audio.pause();
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
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const barWidth = rect.width;
    const seekTime = (offsetX / barWidth) * audio.duration;
    audio.currentTime = seekTime;
  }
  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.seekBar(event);
  }
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.seekBar(event);
    }
  }
  onMouseUp(event: MouseEvent) {
    if (this.isDragging) {
      this.isDragging = false;
    }
  }
 formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const secs: number = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

}
