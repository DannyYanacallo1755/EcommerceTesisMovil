import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'; // Asegúrate de que RouterModule esté importado

import { LocationPage } from './location.page';
import { LocationPageRoutingModule } from './location-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationPageRoutingModule,
    RouterModule // Asegúrate de que RouterModule esté incluido aquí
  ],
  declarations: [LocationPage]
})
export class LocationPageModule {}
