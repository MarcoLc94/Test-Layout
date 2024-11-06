import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BtnsDirectivesComponent } from './components/pages/btnsDirectives/btnsDirectives.component';

export const routes: Routes = [
    {
        path: "", component: HomeComponent
    },
    {
      path: "btns-directives", component: BtnsDirectivesComponent
  }
];
