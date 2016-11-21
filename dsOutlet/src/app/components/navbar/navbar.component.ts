import { Component, Input, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() isAdmin: boolean = false;
  @Input() isLogado: boolean = false;
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private router: Router, private userService: UserService) { }

  private fazerLogin(): void {
    this.modalActions.emit({action:"modal",params:['close']});
    this.userService.login();
    this.router.navigate(['/controle-estoque']);
  }

  private deslogar(): void {
    this.userService.logout();
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
    this.router.navigate(['/home']);
  }
}
