import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DataComponent } from './data/data.component';
import { AccountComponent } from './account/account.component';

export const routes: Routes = [
    {path: '', component: SignInComponent},
    {path: 'signUp', component: SignUpComponent},
    {path: 'data', component: DataComponent},
    {path: 'account', component: AccountComponent}
];
