import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.css']
})
export class CepComponent implements OnInit {

  @Input() valor: string;
  @Output() cep = new EventEmitter();
  private mask = [/\d/, /\d/, /\d/,/\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor() { }

  ngOnInit() {
  }

  change(){
    this.cep.emit(this.valor);
  }

}
