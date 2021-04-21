import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoFornecedor } from './tipo-fornecedor.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoFornecedorService {

  constructor(
    private snackBar: MatSnackBar, 
    private http: HttpClient
  ) { }

  showMessage(msg: string, type: string): void {
    this.snackBar.open(msg, 'Fechar', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top", 
      panelClass: ['toast', type]
    })
  }

  create(tipoFornecedor: TipoFornecedor): Observable<any> {
    return this.http.post<any>(environment.BASE_URL+'/tiposfornecedores', tipoFornecedor);
  } 

  read(): Observable<TipoFornecedor[]> {
    return this.http.get<TipoFornecedor[]>(environment.BASE_URL+'/tiposfornecedores/all');
  }

  readById(id: string): Observable<TipoFornecedor> { 
    const url = `${environment.BASE_URL}/tiposfornecedores/${id}`;
    return this.http.get<TipoFornecedor>(url);
  }

  update(tipoFornecedor: TipoFornecedor): Observable<TipoFornecedor>{
    const url = `${environment.BASE_URL}/tiposfornecedores/edit/${tipoFornecedor.id}`;
    return this.http.put<TipoFornecedor>(url, tipoFornecedor);
  }
}
 