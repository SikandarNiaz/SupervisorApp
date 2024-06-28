import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

import { LoginRoutingModule } from '../login/login-routing.module';
import { LoginComponent } from '../login/login.component';
import { AdminLoginRoutingModule } from './admin-login-routing.module';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        AdminLoginRoutingModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        FlexLayoutModule.withConfig({addFlexToParent: false}),
        FormsModule
    ],
    declarations: [AdminLoginComponent]
})
export class AdminLoginModule {}
