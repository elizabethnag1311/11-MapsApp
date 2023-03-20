import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  title    = 'Maps';
  lat      = 51.678418;
  lng      = 7.809007;
  subtitle = 'By Google'

  constructor() { }

  ngOnInit(): void {
  }
}
