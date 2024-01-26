import { NgModule } from '@angular/core';
import {LmsRoutingModule} from './lms-routing.module'
import { API_BASE_URL, LookupsClient } from './lms-api-service';
import { environment } from '../../../../environments/environment';
import { LookupListComponent } from './pages/lookup/list/list.component';
import { LookupDetailsComponent } from './pages/lookup/lookup-details/lookup-details.component'
import { SharedModule } from '../../shared/shared.module'
import { MatSnackBar } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    LookupListComponent,
    LookupDetailsComponent
  ],
  imports: [
    LmsRoutingModule,
    SharedModule
  ],
  exports:[
  ],
  providers: [
    LookupsClient,
    MatSnackBar,
    { provide: API_BASE_URL, useValue: environment.API_BASE_URL },
  ]
})
export class LmsModule { }
