import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  title    = 'Maps';
  lat      = 51.678418;
  lng      = 7.809007;
  subtitle = 'By Google'

  constructor( public snackBar: MatSnackBar,
               public dialog: MatDialog     ) {
    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores')!)
    }
   }

  ngOnInit(): void {
  }

  agregarMarcador( evento:any ){
    const coords: { lat: number, lng: number } = evento.coords;
    const nuevoMarcador = new Marcador( coords.lat, coords.lng );
    this.marcadores.push(nuevoMarcador);
    this.guardaStorage();

    this.snackBar.open('Marcador agregado', 'Cerrar', {duration:3000});
  }

  editarMarcador( marcador: Marcador){
    const dialogRef = this.dialog.open( MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, desc: marcador.desc}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (!result) {
        return
      }
      marcador.titulo = result.titulo;
      marcador.desc = result.desc;
      this.guardaStorage();
      this.snackBar.open('Marcador actualizado', 'Cerrar', {duration:3000});
    });
  }

  borrarMarcador( i: number){
    this.marcadores.splice( i, 1);
    this.guardaStorage();
    this.snackBar.open('Marcador borrado', 'Cerrar', {duration:3000});
  }

  guardaStorage(){
    localStorage.setItem('marcadores', JSON.stringify( this.marcadores));
  }
}
function openSnackBar(message: any, string: any, action: any, string1: any) {
  throw new Error('Function not implemented.');
}

