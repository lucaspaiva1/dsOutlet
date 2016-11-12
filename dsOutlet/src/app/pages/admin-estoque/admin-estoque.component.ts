import { Component, OnInit } from '@angular/core';
import { Produto } from '../../model/produto';

@Component({
  selector: 'admin-estoque',
  templateUrl: './admin-estoque.component.html',
  styleUrls: ['./admin-estoque.component.css']
})
export class AdminEstoqueComponent implements OnInit {

  private produtos: Produto[] = [];

  constructor() { }

  ngOnInit() {
  }

}
