import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() isAdmin: boolean = false;
  @Input() isLogin: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  private fazerLogin(): void {
    this.userService.login();
    this.router.navigate(['/controle-estoque']);
  }

  private deslogar(): void {
    this.userService.logout();
    this.router.navigate(['/home']);
  }

}
