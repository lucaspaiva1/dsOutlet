import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {

  private url: string;

  @Input() isAdmin: boolean;

  constructor(private router: Router, private userService: UserService) {
    this.url = this.router.url;
    console.log(this.url);
  }

  private minhaConta() {
    let stats = this.userService.userStats();
    let id = stats[2];
    this.router.navigate(['gerenciador/minha-conta/', id]);
  }

}
