import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module"
import {LoginComponent} from "./login/login.component"
import { UsersClient } from "../lms/lms-api-service";

@NgModule({
    declarations:[
        LoginComponent
    ],
    imports: [
        SharedModule
    ],
    exports:[

    ],
    providers: [
        UsersClient
    ]
})
export class ApiAuthorizationModule{

}