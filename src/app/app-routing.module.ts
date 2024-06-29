import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { SongContentComponent } from './paginas/song-content/song-content.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'song-content/:id',component:SongContentComponent},
  {path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
