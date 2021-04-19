import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fornecedor } from './fornecedor.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  
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

  create(fornecedor: Fornecedor): Observable<any> {
    return this.http.post<any>(environment.BASE_URL+'/fornecedores', fornecedor);
  } 
}
