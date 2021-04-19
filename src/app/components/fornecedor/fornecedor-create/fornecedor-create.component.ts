import { environment } from '../../../../environments/environment';
import { Fornecedor } from './../fornecedor.model';
import { FornecedorService } from './../fornecedor.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fornecedor-create',
  templateUrl: './fornecedor-create.component.html',
  styleUrls: ['./fornecedor-create.component.css']
})
export class FornecedorCreateComponent implements OnInit {

  fornecedor: Fornecedor = {
    nome: "Frederico Encantador",
    cnpj: "13508228000178",
    telefone: "55991497946",
    cep:"97010070",
    endereco:"Rua Barão do Triunfo, 867, Apto 8",
    bairro:"Nossa Senhora do Rosário",
    municipio:"Santa Maria",
    uf:"RS",
    status: true,
    tipoFornecedor: {
        id: 3
    }
  }

  tiposFornecedores: any = []

  constructor(
    private fornecedorService: FornecedorService,
    private router: Router,
    private http: HttpClient 
  ) { }

  ngOnInit(): void {
    this.http.get(environment.BASE_URL+'/tiposfornecedores/all').subscribe(data => {
      this.tiposFornecedores = data; 
      console.log(this.tiposFornecedores)
    });
  }

  createFornecedor():  void {
    this.fornecedorService.create(this.fornecedor).subscribe((response) => { 
      if(response.success) { 
        this.fornecedorService.showMessage(response.message, 'success'); 
        this.router.navigate(['/fornecedores']);
      } else if(!response.success) {
        this.fornecedorService.showMessage(response.message, 'warning'); 
      } else {
        this.fornecedorService.showMessage(response.message, 'error'); 
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/fornecedores']);
  }
}
