import { Component, OnInit } from '@angular/core';
import { VendaService } from '../../services/venda.service';
import { Impressao } from '../../model/impressao';

@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.component.html',
  styleUrls: ['./imprimir.component.css']
})
export class ImprimirComponent implements OnInit {

  impressao: Impressao = new Impressao();

  constructor(private vendaService: VendaService) {
    this.getInfo();
  }

  private getInfo(){
    this.impressao = this.vendaService.getVenda();
  }

  ngOnInit() {
    window.print();
  }

}
