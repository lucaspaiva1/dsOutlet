import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'telefone',
  templateUrl: './telefone.component.html',
  styleUrls: ['./telefone.component.css']
})
export class TelefoneComponent implements OnInit {

  @Input() valor: string;
  @Output() tel = new EventEmitter();
  private mask = ['(', /\d/, /\d/, ')', ' ', /\d/,/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor() { }

  ngOnInit() {
  }

  change(){
    this.tel.emit(this.valor);
  }

}
