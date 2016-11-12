import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() isAdmin: boolean = true;
  @Input() isLogin: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  private fazerLogin(): void {
    this.isLogin = true;
    console.log(this.isLogin);
    this.router.navigate(['/controle-estoque']);
  }
  private deslogar(): void {
    this.isLogin = false;
    console.log(this.isLogin);
    this.router.navigate(['/home']);
  }

}
