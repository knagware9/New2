import { RetailerComponent } from './home/retailer/retailer.component';
import { DistributerComponent } from './home/distributer/distributer.component';
import { ManufacturerComponent } from './home/manufacturer/manufacturer.component';
import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SampleComponent } from './user/sample/sample.component';
 
export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'manufacturer', component: ManufacturerComponent
    },
    {
        path: 'distributer', component: DistributerComponent
    },
    {
        path: 'retailer', component: RetailerComponent
    },

    {
        path: 'sample', component: SampleComponent
    },

    { path : '', redirectTo:'/login', pathMatch : 'full'}
    
];