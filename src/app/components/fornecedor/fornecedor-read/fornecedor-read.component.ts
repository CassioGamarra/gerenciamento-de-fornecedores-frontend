import { FornecedorService } from './../fornecedor.service';
import { Fornecedor } from './../fornecedor.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fornecedor-read',
  templateUrl: './fornecedor-read.component.html',
  styleUrls: ['./fornecedor-read.component.css']
})
export class FornecedorReadComponent implements OnInit {

  fornecedores: Fornecedor[] = []

  displayedColumns = ['nome', 'cnpj', 'action'];
 
  constructor(
    private fornecedorService: FornecedorService
  ) { }

  ngOnInit(): void {
    this.fornecedorService.read().subscribe(data => {
      this.fornecedores = data;  
    })
  }
 
  cnpjMask = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2') 
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') 
  }
}
