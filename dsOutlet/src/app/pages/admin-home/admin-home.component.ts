import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  private islogado: boolean = false;
  private isAdmin: boolean = false;

  constructor(private router: Router, private userService: UserService) {
    let stats = this.userService.userStats();
    this.islogado = stats[0];
    this.isAdmin = stats[1];
  }

  ngOnInit() {
    if(!this.islogado){
      this.router.navigate(['/home']);//se os dados indicarem que usuario nao está logado, ele será redirecionado
    }
  }

}
