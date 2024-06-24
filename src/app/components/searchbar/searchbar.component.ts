import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchChange(event: any) {
    const value = event.target.value;
    this.searchChanged.emit(value);
  }
}
