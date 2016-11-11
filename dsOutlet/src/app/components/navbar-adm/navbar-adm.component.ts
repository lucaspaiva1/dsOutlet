import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar-admin',
  templateUrl: './navbar-adm.component.html',
  styleUrls: ['./navbar-adm.component.css']
})
export class NavbarAdmComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  private deslogar(): void{
    console.log("deslogar");
    this.router.navigate(['/home']);
  }

}
