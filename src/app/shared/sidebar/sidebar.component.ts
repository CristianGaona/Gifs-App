import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  constructor(private gifsService: GifsService){

  }

  get historial(){
    return this.gifsService.historial;
  }
  
  // método para llamar a la api cuando se presione en la aprte del historial
  buscar(event:string){
    return this.gifsService.buscarGifs(event);

  }

}
