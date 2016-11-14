import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'fale-conosco',
  templateUrl: './fale-conosco.component.html',
  styleUrls: ['./fale-conosco.component.css']
})
export class FaleConoscoComponent {

  private islogado: boolean = false;
  private isAdmin: boolean = false;

  constructor(private userService: UserService) {
    let stats = this.userService.userStats();
    this.islogado = stats[0];
    this.isAdmin = stats[1];
  }

}
