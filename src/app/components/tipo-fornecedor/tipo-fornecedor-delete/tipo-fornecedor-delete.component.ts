import { TipoFornecedorService } from './../tipo-fornecedor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tipo-fornecedor-delete',
  templateUrl: './tipo-fornecedor-delete.component.html',
  styleUrls: ['./tipo-fornecedor-delete.component.css']
})
export class TipoFornecedorDeleteComponent implements OnInit {
  
  tipoFornecedorForm = this.formBuilder.group({});
  
  constructor(
    private tipoFornecedorService: TipoFornecedorService,
    private router: Router,
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const id:any = this.route.snapshot.paramMap.get('id');

    this.tipoFornecedorService.readById(id).subscribe(data => {  
      this.tipoFornecedorForm.patchValue(data); 
    });

    this.tipoFornecedorForm = new FormGroup({
      id: new FormControl(''),
      descricao: new FormControl({value: '', disabled: true})
    })
  }

  deleteTipoFornecedor = (tipoFornecedorFormValue: any) => { 
    this.tipoFornecedorService.delete(tipoFornecedorFormValue.id).subscribe((response) => { 
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
}
