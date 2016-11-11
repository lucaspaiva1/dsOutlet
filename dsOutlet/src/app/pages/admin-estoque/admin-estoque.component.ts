import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-estoque',
  templateUrl: './admin-estoque.component.html',
  styleUrls: ['./admin-estoque.component.css']
})
export class AdminEstoqueComponent implements OnInit {
  
  private produtos = produtos[];
  constructor() { }

  ngOnInit() {
  }

}
