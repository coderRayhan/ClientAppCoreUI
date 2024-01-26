import { NgModule } from '@angular/core';
import {ConfirmationDialogComponent} from "./component/confirmation-dialog/confirmation-dialog.component"
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule
} from '@coreui/angular';
import { CommonModule } from '@angular/common';

const _materialModule = [
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatSelectModule,
]

const _coreUiModule = [
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule
]

const _allModule = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  _materialModule,
  _coreUiModule
]

@NgModule({
  declarations: [
    ConfirmationDialogComponent
  ],
  imports: [
    _allModule
  ],
  exports: [
    ConfirmationDialogComponent,
    ReactiveFormsModule,
    _allModule
  ]
})
export class SharedModule { }
