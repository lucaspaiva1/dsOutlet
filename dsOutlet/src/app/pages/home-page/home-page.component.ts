import { Component, Input } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  private isLogado: boolean;
  private isAdmin: boolean;
  private variavel: any;
  private error: any;

  constructor(private storage: LocalStorageService, private userService: UserService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];

    this.storage.set('user', 'usuario');

    this.teste();

  }

  teste(){
    try{
      this.variavel = this.storage.get('user');
    }catch(e){
      this.error = e;
      this.variavel = 'teste';
    }
  }

}
