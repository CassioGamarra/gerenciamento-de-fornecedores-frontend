import { TipoFornecedor } from './../tipo-fornecedor.model';
import { TipoFornecedorService } from './../tipo-fornecedor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-fornecedor-read',
  templateUrl: './tipo-fornecedor-read.component.html',
  styleUrls: ['./tipo-fornecedor-read.component.css']
})
export class TipoFornecedorReadComponent implements OnInit {

  tiposFornecedores: TipoFornecedor[] = []  
  
  displayedColumns = ['descricao', 'action'];

  constructor(
    private tipoFornecedorService: TipoFornecedorService
  ) { }

  ngOnInit(): void {
    this.tipoFornecedorService.read().subscribe(data => {
      this.tiposFornecedores = data;   
    })
  }

}
