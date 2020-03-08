import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'empty-page',
  template: '<router-outlet></router-outlet>'
})

export class EmptyComponent implements OnInit {
  ngOnInit(): void {

  }

  constructor() {
  }
}
