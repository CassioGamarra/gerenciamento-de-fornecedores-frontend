import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Orcamento } from './../orcamento.model';
import { OrcamentoService } from './../orcamento.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-orcamento-update',
  templateUrl: './orcamento-update.component.html',
  styleUrls: ['./orcamento-update.component.css']
})
export class OrcamentoUpdateComponent implements OnInit {

  orcamento: Orcamento = {
    descricao: '',
    valor: 0,
    vencimento: '',
    fornecedor: {
      id: null
    }, 
  } 

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
      id: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required, this.isEmpty]),
      valor:  new FormControl('', [Validators.required]),
      vencimento:  new FormControl('', [Validators.required, this.isValidDate]),
      fornecedor: new FormControl('', [Validators.required])
    }) 
  }

  hasError = (controlName: string, errorName: string) => {
    return this.orcamentoForm.controls[controlName].hasError(errorName);
  }

  updateOrcamento = (orcamentoFormValue: any) => {
    this.orcamento.id = Number(orcamentoFormValue.id);
    this.orcamento.descricao = orcamentoFormValue.descricao.trim(); 
    this.orcamento.valor = Number(orcamentoFormValue.valor);
    this.orcamento.vencimento = moment(orcamentoFormValue.vencimento).format("YYYY-MM-DD");
    this.orcamento.fornecedor.id = Number(orcamentoFormValue.fornecedor);   
     
    this.orcamentoService.update(this.orcamento).subscribe((response) => { 
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

  isEmpty(control: FormControl) {
    const isEmpty = (control.value || '').trim().length === 0;
    const isValid = !isEmpty;
    return isValid ? null : {'empty': true}
  }

  isValidDate(control: FormControl) { 
    const isValidDate = moment(control.value._d).isBefore(new Date(), 'day'); 
    const isValid = !isValidDate;
    return isValid ? null : {'invalid-date' : true}
  }  

}
