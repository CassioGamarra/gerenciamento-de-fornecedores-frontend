import { Orcamento } from './../orcamento.model';
import { OrcamentoService } from './../orcamento.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-orcamento-read',
  templateUrl: './orcamento-read.component.html',
  styleUrls: ['./orcamento-read.component.css']
})
export class OrcamentoReadComponent implements OnInit {

  orcamentos: Orcamento[] = []

  displayedColumns = ['descricao', 'valor', 'vencimento', 'action'];

  constructor(private orcamentoService: OrcamentoService) { }

  ngOnInit(): void {
    this.orcamentoService.read().subscribe(data => {
      this.orcamentos = data;  
    })
  }

  formatTitle(value : String) {
    if(value.length > 30) {
      value = value.substr(0,30)+"...";
    }
    return value;
  }

  formatDate(value : any) {
    return moment(value).format("DD/MM/YYYY");
  } 
}
