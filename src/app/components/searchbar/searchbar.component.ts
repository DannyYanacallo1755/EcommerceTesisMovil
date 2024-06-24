import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  @Output() searchChanged = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onSearchChange(event: any) {
    this.searchChanged.emit(event.target.value);
  }
}
