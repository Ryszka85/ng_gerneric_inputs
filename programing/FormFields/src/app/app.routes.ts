import { Routes } from '@angular/router';
import { KontaktComponent } from './kontakt/kontakt.component';
import { BankComponent } from './bank/bank.component';

export const routes: Routes = [
    { path: '',   redirectTo: '/kontakt', pathMatch: 'full' },
    {
        path: 'kontakt',
        component: KontaktComponent,        
    },
    {
        path: 'bank',
        component: BankComponent
    }
];
