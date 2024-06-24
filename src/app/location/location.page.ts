import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit, AfterViewInit {
  @ViewChild('map') mapElement!: ElementRef;
  map: any;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    // Coordenadas de la nueva ubicación
    const latLng = new google.maps.LatLng(-0.199067, -78.4994376);

    const mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // Añadir un marcador en la nueva ubicación
    const marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'Antonio de Ulloa 2354, Quito 170520'
    });
  }
}
