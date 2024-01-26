import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LookupListComponent } from "./pages/lookup/list/list.component";
import {DefaultLayoutComponent} from "../../default-layout/default-layout.component"
import { CanActivate } from "../../core/auth/guards/auth.guard"

const routes: Routes = [
    {
        path: 'lms', component: DefaultLayoutComponent
    },
    {
        path: 'lookup', component: LookupListComponent, canActivate: [CanActivate]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class LmsRoutingModule {
}