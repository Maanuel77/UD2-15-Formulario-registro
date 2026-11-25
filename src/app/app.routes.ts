import { Routes } from '@angular/router';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { RegisterPage } from './pages/register-page/register-page';
import { SuccessPage } from './pages/success-page/success-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'registro' },
  { path: 'registro', component: RegisterPage },
  { path: 'bienvenida/:usuario', component: SuccessPage },
  { path: '**', component: NotFoundPage },
];
