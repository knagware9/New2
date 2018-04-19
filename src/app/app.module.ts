import { environment } from './../environments/environment';
import { ProductService } from './shared/product.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule, MatOption, MatOptionModule, MatSelectModule } from '@angular/material';
import { MatInputModule } from '@angular/material';


import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { ProductComponent } from './home/product/product.component';
import { ProductListComponent } from './home/product-list/product-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManufacturerComponent } from './home/manufacturer/manufacturer.component';
import { DistributerComponent, DialogOverviewExampleDialog } from './home/distributer/distributer.component';
import { RetailerComponent } from './home/retailer/retailer.component';
import { MatDialogModule } from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
    SignUpComponent,
    ProductComponent,
    ProductListComponent,
    ManufacturerComponent,
    DistributerComponent,
    RetailerComponent,
    DialogOverviewExampleDialog
  ],
  entryComponents: [DialogOverviewExampleDialog],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.FirebaseConfig),
    AngularFireDatabaseModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
