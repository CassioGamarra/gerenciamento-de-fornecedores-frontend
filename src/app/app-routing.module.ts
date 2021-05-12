import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { FornecedoresComponent } from './views/fornecedores/fornecedores.component';
import { OrcamentosComponent } from './views/orcamentos/orcamentos.component';
import { TiposFornecedoresComponent } from './views/tipos-fornecedores/tipos-fornecedores.component';
import { FornecedorCreateComponent } from './components/fornecedor/fornecedor-create/fornecedor-create.component';
import { TipoFornecedorCreateComponent } from './components/tipo-fornecedor/tipo-fornecedor-create/tipo-fornecedor-create.component';
import { FornecedorUpdateComponent } from './components/fornecedor/fornecedor-update/fornecedor-update.component';
import { TipoFornecedorUpdateComponent } from './components/tipo-fornecedor/tipo-fornecedor-update/tipo-fornecedor-update.component';
import { TipoFornecedorDeleteComponent } from './components/tipo-fornecedor/tipo-fornecedor-delete/tipo-fornecedor-delete.component';
import { FornecedorDeleteComponent } from './components/fornecedor/fornecedor-delete/fornecedor-delete.component';
import { OrcamentoDeleteComponent } from './components/orcamento/orcamento-delete/orcamento-delete.component';
import { OrcamentoUpdateComponent } from './components/orcamento/orcamento-update/orcamento-update.component';
import { OrcamentoCreateComponent } from './components/orcamento/orcamento-create/orcamento-create.component';
 
const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "fornecedores",
    component: FornecedoresComponent
  },
  {
    path: "tiposfornecedores",
    component: TiposFornecedoresComponent
  },
  {
    path: "orcamentos",
    component: OrcamentosComponent
  },
  {
    path: "fornecedores/novo",
    component: FornecedorCreateComponent
  },
  {
    path: "tiposfornecedores/novo",
    component: TipoFornecedorCreateComponent
  },
  {
    path: "orcamentos/novo",
    component: OrcamentoCreateComponent
  },
  {
    path: "fornecedores/edit/:id",
    component: FornecedorUpdateComponent
  },
  {
    path: "tiposfornecedores/edit/:id",
    component: TipoFornecedorUpdateComponent
  },
  {
    path: "orcamentos/edit/:id",
    component: OrcamentoUpdateComponent
  },
  {
    path: "fornecedores/delete/:id",
    component: FornecedorDeleteComponent
  },
  {
    path: "tiposfornecedores/delete/:id",
    component: TipoFornecedorDeleteComponent
  }, 
  {
    path: "orcamentos/delete/:id",
    component: OrcamentoDeleteComponent
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
