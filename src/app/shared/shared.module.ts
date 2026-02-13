import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    CardComponent,
    ModalComponent,
    ButtonComponent
  ],

  exports: [
    CommonModule,
    NavbarComponent,
    CardComponent,
    ModalComponent,
    ButtonComponent
  ]
})
export class SharedModule {}
