import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options-adm',
  templateUrl: './options-adm.component.html',
  styleUrls: ['./options-adm.component.css']
})
export class OptionsAdmComponent  {

    private url: string;


  constructor(private router: Router) {
    this.url = this.router.url;
  }

}
