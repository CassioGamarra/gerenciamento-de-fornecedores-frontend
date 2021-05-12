import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orcamentos',
  templateUrl: './orcamentos.component.html',
  styleUrls: ['./orcamentos.component.css']
})
export class OrcamentosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  } 

  navigateToOrcamentoCreate(): void {
    this.router.navigate(['/orcamentos/novo']);
  }
}
