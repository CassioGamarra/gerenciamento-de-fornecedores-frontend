import { TipoFornecedor } from './../tipo-fornecedor.model';
import { TipoFornecedorService } from './../tipo-fornecedor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tipo-fornecedor-update',
  templateUrl: './tipo-fornecedor-update.component.html',
  styleUrls: ['./tipo-fornecedor-update.component.css']
})
export class TipoFornecedorUpdateComponent implements OnInit {
  tipoFornecedor: TipoFornecedor = {
    id: 0,
    descricao: ''
  } 

  tipoFornecedorForm = this.formBuilder.group({});
 
  constructor(
    private tipoFornecedorService: TipoFornecedorService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }
 
  ngOnInit(): void { 
    const id:any = this.route.snapshot.paramMap.get('id');

    this.tipoFornecedorService.readById(id).subscribe(data => {  
      this.tipoFornecedorForm.patchValue(data); 
    });

    this.tipoFornecedorForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required, this.isEmpty])
    })
  }

  hasError = (controlName: string, errorName: string) => {
    return this.tipoFornecedorForm.controls[controlName].hasError(errorName);
  }

  updateTipoFornecedor = (tipoFornecedorFormValue: any) => {
    this.tipoFornecedor.descricao = tipoFornecedorFormValue.descricao.trim(); 
    this.tipoFornecedorService.create(this.tipoFornecedor).subscribe((response) => { 
      if(response.success) { 
        this.tipoFornecedorService.showMessage(response.message, 'success'); 
        this.router.navigate(['/tiposfornecedores']);
      } else if(!response.success) {
        this.tipoFornecedorService.showMessage(response.message, 'warning'); 
      } else {
        this.tipoFornecedorService.showMessage(response.error.message, 'error'); 
      }
    });
  }
 
  cancel(): void {
    this.router.navigate(['/tiposfornecedores']);
  }
 
  isEmpty(control: FormControl) {
    const isEmpty = (control.value || '').trim().length === 0;
    const isValid = !isEmpty;
    return isValid ? null : {'empty': true}
  }
}
