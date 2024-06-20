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
    const latLng = new google.maps.LatLng(-0.210530, -78.493579); 

    const mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // Añadir un marcador en la ubicación especificada
    const marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'Av. Ladrón de Guevara E11-253, Quito 170143'
    });
  }
}
