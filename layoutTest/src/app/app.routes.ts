import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BtnsDirectivesComponent } from './components/pages/btnsDirectives/btnsDirectives.component';
import { TestTabDirectivaComponent } from './components/pages/TestTabDirectiva/TestTabDirectiva.component';

export const routes: Routes = [
    {
        path: "", component: HomeComponent
    },
    {
      path: "btns-directives", component: BtnsDirectivesComponent
  },
  {
    path: "btns-directives2", component: TestTabDirectivaComponent
}
];
