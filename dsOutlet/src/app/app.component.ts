import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isAdmin: boolean = true;
  isLogin: boolean = false;

  constructor(){

  }

  evento(event){
    console.log(event);
  }

}
