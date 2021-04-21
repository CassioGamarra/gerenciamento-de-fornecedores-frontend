import { environment } from '../../../../environments/environment';
import { Fornecedor } from './../fornecedor.model';
import { FornecedorService } from './../fornecedor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-fornecedor-update',
  templateUrl: './fornecedor-update.component.html',
  styleUrls: ['./fornecedor-update.component.css']
})
export class FornecedorUpdateComponent implements OnInit {
  
  fornecedor: Fornecedor = {
    id: 0,
    nome: '',
    cnpj: '',
    telefone: '',
    cep: '',
    endereco: '',
    bairro: '',
    municipio: '',
    uf: '',
    status: true,
    tipoFornecedor: {
      id: null
    }, 
  }  
  
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
      id: new FormControl('', [Validators.required]),
      nome:  new FormControl('', [Validators.required, this.isEmpty]),
      cnpj:  new FormControl('', [Validators.required, this.isEmpty, this.isCNPJ]),
      telefone:  new FormControl('', [Validators.required, this.isEmpty]),
      cep:  new FormControl('', [Validators.required, this.isEmpty, this.isCEP]),
      endereco:  new FormControl('', [Validators.required, this.isEmpty]),
      bairro:  new FormControl('', [Validators.required, this.isEmpty]),
      municipio:  new FormControl('', [Validators.required, this.isEmpty]),
      uf:  new FormControl('', [Validators.required, this.isEmpty]),
      tipoFornecedor: new FormControl('', [Validators.required])
    })
  } 

  buscarCep = (cep : string) => { 
    cep = cep.replace(/[^\d]+/g, ''); 
    this.http.get(environment.BASE_URL_VIACEP+cep+'/json/').subscribe((data : any)=> {
      if(data.erro) {
        this.fornecedorService.showMessage('CEP não encontrado', 'info'); 
      } else {  
        this.fornecedorForm.patchValue({
          endereco: data.logradouro,
          bairro: data.bairro,
          municipio: data.localidade,
          uf: data.uf
        });
      }
    })
  }

  updateFornecedor = (fornecedorFormValue: any) => {  
    this.fornecedor.id = Number(fornecedorFormValue.id);
    this.fornecedor.nome = fornecedorFormValue.nome.trim(),
    this.fornecedor.cnpj = fornecedorFormValue.cnpj.replace(/[^\d]+/g, ''),
    this.fornecedor.telefone = fornecedorFormValue.telefone.replace(/[^\d]+/g, ''),
    this.fornecedor.cep = fornecedorFormValue.cep.replace(/[^\d]+/g, ''),
    this.fornecedor.endereco = fornecedorFormValue.endereco.trim(),
    this.fornecedor.bairro = fornecedorFormValue.bairro.trim(),
    this.fornecedor.municipio = fornecedorFormValue.municipio.trim(),
    this.fornecedor.uf = fornecedorFormValue.uf.trim(), 
    this.fornecedor.tipoFornecedor.id = Number(fornecedorFormValue.tipoFornecedor) 

    this.fornecedorService.update(this.fornecedor).subscribe((response) => { 
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

  hasError = (controlName: string, errorName: string) => {
    return this.fornecedorForm.controls[controlName].hasError(errorName);
  }

  isEmpty(control: FormControl) {
    const isEmpty = (control.value || '').trim().length === 0;
    const isValid = !isEmpty;
    return isValid ? null : {'empty': true}
  }

  //Validators
  isCNPJ (control : FormControl) {
    let cnpj : string = control.value.replace(/[^\d]+/g, '');
    let isValid = true; //Flag
    // Elimina CNPJs invalidos conhecidos
    // Elimina inválidos com todos os caracteres iguais
    if (/^(\d)\1+$/.test(cnpj)) isValid = false;
    // Cáculo de validação
    let t :number = cnpj.length - 2;
    let d :string = cnpj.substring(t);
    let d1 :number = parseInt(d.charAt(0));
    let d2 :number = parseInt(d.charAt(1));
    let calc: any = (x : number) => {
      let n :any = cnpj.substring(0, x);
      let y :number = x - 7;
      let s :number = 0;
      let r :number = 0;
      for (let i = x; i >= 1; i--) {
        s += n.charAt(x - i) * y--;
        if (y < 2)
          y = 9
      }

      r = 11 - s % 11
      return r > 9 ? 0 : r
    }
    isValid = calc(t) === d1 && calc(t + 1) === d2
    return isValid ? null : {'isCNPJ': true} 
  }

  isCEP (control : FormControl)  {
    let cep = control.value.replace(/[^\d]+/g, '');
    let isValid = true; //Flag
    if(cep.length < 8) isValid = false;

    return isValid ? null : {'isCEP': true} 
  }
}
