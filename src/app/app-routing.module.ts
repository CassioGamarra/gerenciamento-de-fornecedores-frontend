import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { FornecedoresComponent } from './views/fornecedores/fornecedores.component';
import { TiposFornecedoresComponent } from './views/tipos-fornecedores/tipos-fornecedores.component';
import { FornecedorCreateComponent } from './components/fornecedor/fornecedor-create/fornecedor-create.component';


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
    path: "tipos-fornecedores",
    component: TiposFornecedoresComponent
  },
  {
    path: "fornecedores/novo",
    component: FornecedorCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
