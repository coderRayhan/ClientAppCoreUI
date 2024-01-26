import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommonResponseList, CommonResponseObject, CommonResponsePageable} from "../model/common-response";
import {CommonSearchModel} from "../model/common-search-model";
import {DropdownModel} from "../model/dropdown-model";


export abstract class AppCrudRequestService<I> {

    protected constructor(protected httpClient: HttpClient,
                          protected _BASE_URL: string) {
    }

    // common
    create(i: I): Observable<CommonResponseObject<I>> {
        return this.httpClient.post<CommonResponseObject<I>>( this._BASE_URL, i);
    }

    update(i: I): Observable<CommonResponseObject<I>> {
        return this.httpClient.put<CommonResponseObject<I>>( this._BASE_URL, i);
    }

    delete(i: I): Observable<CommonResponseObject<I>> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: i
        };
        return this.httpClient.delete<CommonResponseObject<I>>( this._BASE_URL, httpOptions);
    }

    getAllList(): Observable<CommonResponseList<I>> {
        return this.httpClient.get<CommonResponseList<I>>( this._BASE_URL);
    }

    getActiveList(): Observable<CommonResponseList<I>> {
        return this.httpClient.get<CommonResponseList<I>>( this._BASE_URL + '/' + 'active');
    }

   getObjectById(id: number): Observable<CommonResponseObject<I>> {
    return this.httpClient.get<CommonResponseObject<I>>( this._BASE_URL + '/' + 'get-by-id' + '/' + id);
   }

  getDropdownList(): Observable<CommonResponseList<DropdownModel>> {
    return this.httpClient.get<CommonResponseList<DropdownModel>>( this._BASE_URL + '/' + 'dropdown-list');
  }

  getListWithPagination(page: number, size: number, searchValue: string): Observable<CommonResponsePageable<I>> {
    return this.httpClient.get<CommonResponsePageable<I>>( this._BASE_URL + '/' + 'pageable' + '/' + page + '/' + size + '/' + this.filterSearchValue(searchValue));
  }


  /*utils*/
  filterSearchValue(searchValue: string): string{
    searchValue = searchValue.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    searchValue = searchValue ? searchValue : '0';
    return searchValue;
  }

}
