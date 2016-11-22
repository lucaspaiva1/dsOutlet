import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent  {

  private url: string;

  @Input() isAdmin: boolean;

  constructor(private router: Router) {
    this.url = this.router.url;
  }
}
