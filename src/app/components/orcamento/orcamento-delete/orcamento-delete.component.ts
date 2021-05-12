import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router'; 
import { OrcamentoService } from './../orcamento.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { environment } from 'src/environments/environment'; 

@Component({
  selector: 'app-orcamento-delete',
  templateUrl: './orcamento-delete.component.html',
  styleUrls: ['./orcamento-delete.component.css']
})
export class OrcamentoDeleteComponent implements OnInit { 
  orcamentoForm = this.formBuilder.group({});
 
  fornecedores: any = []

  constructor(
    private orcamentoService: OrcamentoService,
    private router: Router,
    private route: ActivatedRoute, 
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }
 
  ngOnInit(): void {
    const id:any = this.route.snapshot.paramMap.get('id');

    this.orcamentoService.readById(id).subscribe(data => {  
      this.orcamentoForm.patchValue(data);
      this.orcamentoForm.patchValue({
        fornecedor: data.fornecedor.id
      }); 
    });

    this.http.get(environment.BASE_URL+'/fornecedores/all').subscribe(data => {
      this.fornecedores = data;  
    }); 

    this.orcamentoForm = new FormGroup({ 
      id: new FormControl({ value: '', disabled: true }),
      descricao:  new FormControl({ value: '', disabled: true }),
      valor:  new FormControl({value: '', disabled: true}),
      vencimento:  new FormControl({ value: '', disabled: true }), 
      fornecedor: new FormControl({ value: '', disabled: true })
    })
  }

  deleteOrcamento = (tipoFornecedorFormValue: any) => { 
    this.orcamentoService.delete(tipoFornecedorFormValue.id).subscribe((response) => { 
      if(response.success) { 
        this.orcamentoService.showMessage(response.message, 'success');  
        this.router.navigate(['/orcamentos']);
      } else if(!response.success) {
        this.orcamentoService.showMessage(response.message, 'warning'); 
      } else {
        this.orcamentoService.showMessage(response.error.message, 'error'); 
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/orcamentos']);
  }
} 
