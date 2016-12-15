import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.component.html',
  styleUrls: ['./imprimir.component.css']
})
export class ImprimirComponent implements OnInit {

  venda = ['lucas','lucas','lucas','lucas','lucas','lucas','lucas','lucas','lucas','lucas','lucas','lucas','lucas','lucas'  ]

  constructor() { }

  ngOnInit() {
    window.print();
  }

}
