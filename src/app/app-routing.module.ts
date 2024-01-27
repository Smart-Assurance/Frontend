import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientContractComponent } from './components/client-contract/client-contract.component';

const routes: Routes = [
  { path: 'clientContract', component: ClientContractComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
