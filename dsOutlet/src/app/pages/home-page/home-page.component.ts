import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  private islogado: boolean = false;
  private isAdmin: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

}
