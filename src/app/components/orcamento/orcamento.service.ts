import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Orcamento } from './orcamento.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

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

  create(orcamento: Orcamento): Observable<any> {
    return this.http.post<any>(environment.BASE_URL+'/orcamentos', orcamento);
  } 

  read(): Observable<Orcamento[]> {
    return this.http.get<Orcamento[]>(environment.BASE_URL+'/orcamentos/all');
  }

  readById(id: string): Observable<Orcamento> { 
    const url = `${environment.BASE_URL}/orcamentos/${id}`;
    return this.http.get<Orcamento>(url);
  }

  update(orcamento: Orcamento): Observable<any>{
    const url = `${environment.BASE_URL}/orcamentos/edit/${orcamento.id}`;
    return this.http.put<any>(url, orcamento);
  }

  delete(id: string): Observable<any>{
    const url = `${environment.BASE_URL}/orcamentos/delete/${id}`;
    return this.http.delete<any>(url);
  }
}
