import { TipoFornecedor } from './../tipo-fornecedor.model';
import { TipoFornecedorService } from './../tipo-fornecedor.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tipo-fornecedor-create',
  templateUrl: './tipo-fornecedor-create.component.html',
  styleUrls: ['./tipo-fornecedor-create.component.css']
})
export class TipoFornecedorCreateComponent implements OnInit { 
  tipoFornecedor: TipoFornecedor = {
    descricao: ''
  } 

  tipoFornecedorForm = this.formBuilder.group({});
 
  constructor(
    private tipoFornecedorService: TipoFornecedorService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }
 
  ngOnInit(): void {
    this.tipoFornecedorForm = new FormGroup({
      descricao: new FormControl('', [Validators.required, this.isEmpty])
    })
  }

  hasError = (controlName: string, errorName: string) => {
    return this.tipoFornecedorForm.controls[controlName].hasError(errorName);
  }

  createTipoFornecedor = (tipoFornecedorFormValue: any) => {
    if(this.tipoFornecedorForm.valid) {
      this.tipoFornecedor.descricao = tipoFornecedorFormValue.descricao.trim(); 
      this.tipoFornecedorService.create(this.tipoFornecedor).subscribe((response) => { 
        if(response.success) { 
          this.tipoFornecedorService.showMessage(response.message, 'success'); 
          this.router.navigate(['/tipos-fornecedores']);
        } else if(!response.success) {
          this.tipoFornecedorService.showMessage(response.message, 'warning'); 
        } else {
          this.tipoFornecedorService.showMessage(response.error.message, 'error'); 
        }
      });
    } 
  }
 
  cancel(): void {
    this.router.navigate(['/tipos-fornecedores']);
  }
 
  isEmpty(control: FormControl) {
    const isEmpty = (control.value || '').trim().length === 0;
    const isValid = !isEmpty;
    return isValid ? null : {'empty': true}
  }
}
 