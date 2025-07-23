import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./auth/login/login')
    },
    {
        path: 'espera',
        title: 'Espera',
        loadComponent: () => import('./components/espera/espera')
    },
    {
        path: 'formulario',
        title: 'Formulario',
        loadComponent: () => import('./components/form-estudiantes/form-estudiantes')
    }
];
