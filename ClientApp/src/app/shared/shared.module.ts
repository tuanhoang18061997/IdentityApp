import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ValidationMessagesComponent } from './components/errors/validation-messages/validation-messages.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './components/modals/notification.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    NotFoundComponent,
    ValidationMessagesComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    ValidationMessagesComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class SharedModule { }
