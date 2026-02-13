import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import {DashboardComponent} from './dashboard.component';

// src/app/features/dashboard/dashboard.module.ts
@NgModule({
  declarations: [], // Deixe vazio
  imports: [
    CommonModule,
    DashboardComponent // Coloque aqui!
  ]
})
export class DashboardModule {}
