import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'cpf',
  templateUrl: './cpf.component.html',
  styleUrls: ['./cpf.component.css']
})
export class CpfComponent implements OnInit {

  @Input() valor: string;
  @Output() cpf = new EventEmitter();
  private mask = [/\d/, /\d/, /\d/, '.',/\d/, /\d/, /\d/, '.',/\d/, /\d/, /\d/, '-', /\d/, /\d/];

  constructor() { }

  ngOnInit() {
  }

  change(){
    this.cpf.emit(this.valor);
  }

}
