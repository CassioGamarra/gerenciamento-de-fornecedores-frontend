import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
//Fornecedor
import { FornecedorCreateComponent } from './components/fornecedor/fornecedor-create/fornecedor-create.component';  
//Views 
import { HomeComponent } from './views/home/home.component'; 
import { FornecedoresComponent } from './views/fornecedores/fornecedores.component';
import { TiposFornecedoresComponent } from './views/tipos-fornecedores/tipos-fornecedores.component';
//Material 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { TipoFornecedorCreateComponent } from './components/tipo-fornecedor/tipo-fornecedor-create/tipo-fornecedor-create.component';
import { FornecedorReadComponent } from './components/fornecedor/fornecedor-read/fornecedor-read.component'; 
import { MatTableModule } from '@angular/material/table'; 
import { TipoFornecedorReadComponent } from './components/tipo-fornecedor/tipo-fornecedor-read/tipo-fornecedor-read.component';
import { FornecedorUpdateComponent } from './components/fornecedor/fornecedor-update/fornecedor-update.component';
import { TipoFornecedorUpdateComponent } from './components/tipo-fornecedor/tipo-fornecedor-update/tipo-fornecedor-update.component';
import { FornecedorDeleteComponent } from './components/fornecedor/fornecedor-delete/fornecedor-delete.component';
import { TipoFornecedorDeleteComponent } from './components/tipo-fornecedor/tipo-fornecedor-delete/tipo-fornecedor-delete.component'; 
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    FornecedoresComponent,
    TiposFornecedoresComponent,
    FornecedorCreateComponent,
    TipoFornecedorCreateComponent,
    FornecedorReadComponent, 
    TipoFornecedorReadComponent, FornecedorUpdateComponent, TipoFornecedorUpdateComponent, FornecedorDeleteComponent, TipoFornecedorDeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
