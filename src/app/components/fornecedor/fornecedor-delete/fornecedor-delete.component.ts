import { environment } from '../../../../environments/environment'; 
import { FornecedorService } from './../fornecedor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fornecedor-delete',
  templateUrl: './fornecedor-delete.component.html',
  styleUrls: ['./fornecedor-delete.component.css']
})
export class FornecedorDeleteComponent implements OnInit {
 
  fornecedorForm = this.formBuilder.group({});
  /*Init Masks*/ 
  cnpjMask = [/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/];
  cepMask = [/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/];
  telMask = ['(',/\d/,/\d/,')',/\d/,' ',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/];
  /*End Masks*/
  tiposFornecedores: any = []

  constructor(
    private fornecedorService: FornecedorService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,  
  ) { }

  ngOnInit(): void {
    const id:any = this.route.snapshot.paramMap.get('id');

    this.fornecedorService.readById(id).subscribe(data => {  
      this.fornecedorForm.patchValue(data);
      this.fornecedorForm.patchValue({
        tipoFornecedor: data.tipoFornecedor.id
      }); 
    });

    this.http.get(environment.BASE_URL+'/tiposfornecedores/all').subscribe(data => {
      this.tiposFornecedores = data;  
    }); 

    this.fornecedorForm = new FormGroup({ 
      id: new FormControl({ value: '', disabled: true }),
      nome:  new FormControl({ value: '', disabled: true }),
      cnpj:  new FormControl({value: '', disabled: true}),
      telefone:  new FormControl({ value: '', disabled: true }),
      cep:  new FormControl({ value: '', disabled: true }),
      endereco:  new FormControl({ value: '', disabled: true }),
      bairro:  new FormControl({ value: '', disabled: true }),
      municipio:  new FormControl({ value: '', disabled: true }),
      uf:  new FormControl({ value: '', disabled: true }),
      tipoFornecedor: new FormControl({ value: '', disabled: true })
    })
  }  

  deleteFornecedor = (fornecedorFormValue: any) => {    
    this.fornecedorService.delete(fornecedorFormValue.id).subscribe((response) => { 
      if(response.success) { 
        this.fornecedorService.showMessage(response.message, 'success'); 
        this.router.navigate(['/fornecedores']);
      } else if(!response.success) {
        this.fornecedorService.showMessage(response.message, 'warning'); 
      } else {
        this.fornecedorService.showMessage(response.error.message, 'error'); 
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/fornecedores']);
  } 
}
