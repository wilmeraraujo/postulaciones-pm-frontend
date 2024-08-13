import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagoSoportadoComponent } from './components/pago-soportado/pago-soportado.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path:'home', component: HomeComponent},
  {path:'pago-soportado', component: PagoSoportadoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
