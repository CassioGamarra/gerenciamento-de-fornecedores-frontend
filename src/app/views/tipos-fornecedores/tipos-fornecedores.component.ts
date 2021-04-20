import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipos-fornecedores',
  templateUrl: './tipos-fornecedores.component.html',
  styleUrls: ['./tipos-fornecedores.component.css']
})
export class TiposFornecedoresComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToTipoFornecedorCreate(): void {
    this.router.navigate(['/tipos-fornecedores/novo']);
  }
}
