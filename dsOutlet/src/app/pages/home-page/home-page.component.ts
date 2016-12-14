import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  private isLogado: boolean;
  private isAdmin: boolean;

  constructor(private userService: UserService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
  }


}
