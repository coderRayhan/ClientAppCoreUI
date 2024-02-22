import { Component, OnInit, ViewChild } from '@angular/core';
import {AppConstants} from '../../../../../core/constants/app.constants';
import { CreateLookupCommand, LookupsClient, PaginatedListOfLookupDto } from '../../../lms-api-service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'
import { LookupDetailsComponent } from '../lookup-details/lookup-details.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [LookupsClient, MatDialogConfig]
})
export class LookupListComponent implements OnInit{

  
  /*dataTable*/
  paginationArray: number[] = this.appConstants.DEFAULT_ARRAY;
  dataSource : MatTableDataSource<PaginatedListOfLookupDto>;
  pageSize: number = this.appConstants.DEFAULT_SIZE;
  pageIndex: number = this.appConstants.DEFAULT_PAGE;
  totalCount: number = 0;
  searchValue: string = '';
  displayedColumns: string[] = ['sl', 'name', 'nameBN', 'code', 'description', 'action'];
  //dataSource = ;

  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(
    private appConstants : AppConstants,
    private lookupClient : LookupsClient,
    private matDialog : MatDialog,
    private matDialogConfig : MatDialogConfig,
    private snackBar : MatSnackBar){
  }
  
  ngOnInit(): void {
    this.getPageableList();
  }

  openModal(enterAnimationDuration: string, exitAnimationDuration: string){
    const dialogRef = this.matDialog.open(LookupDetailsComponent);
    dialogRef.afterClosed().subscribe(() => {
      console.log("Modal closed")
    })
  }
  onGetCreateOrEdit(isEdit : boolean, model? : PaginatedListOfLookupDto){
    model = model ? model : new CreateLookupCommand();
    this.matDialogConfig.data = {model,isEdit};
    const dialogRef = this.matDialog.open(LookupDetailsComponent, this.matDialogConfig );
    dialogRef.afterClosed().subscribe(() => {
      this.lookupClient.getAllLookups(1, 10).subscribe((res) => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res.items);
      })
    })
  }

  // onDelete(id:number){
  //   this.lookupClient.deleteLookup(id).subscribe(res => {
  //     this.snackBar.open('Deleted Successfully', 'Ok', {
  //       duration: 3000
  //     })
  //     this.getPageableList();
  //   })
  // }
  
  getPageableList(){
    this.lookupClient.getAllLookups(this.pageIndex, this.pageSize).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.items);
      this.totalCount = res.totalCount;
  })
  }

  onPaginationChange(event:any){
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getPageableList();
  }
}
