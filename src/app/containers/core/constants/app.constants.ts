import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AppConstants {

  /*module*/
  moduleCommon: string = 'common/';
  moduleSystemAdmin: string = 'sya/';
  modulePayroll: string = 'payroll/';
  moduleGPF : string = 'gpf/';
  moduleACCOUNT : string = 'account/';

  /*pageable*/
  DEFAULT_ARRAY: number[] = [5, 10, 25, 100];
  DEFAULT_SIZE: number = 5;
  DEFAULT_PAGE: number = 1;

  /*field*/
  DEFAULT_TEXT_AREA_SIZE = 250;

  ACCOUNT_HEAD_MEMBER_FOUND_ACCOUNT = 41
  ACCOUNT_HEAD_LOAN_TO_MEMBER = 42

  /*add dialog*/
  PANEL_CLASS = 'dialog-background';

    constructor(
    ) {
    }

}
