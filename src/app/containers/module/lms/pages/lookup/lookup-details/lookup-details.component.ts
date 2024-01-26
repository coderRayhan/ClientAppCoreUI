import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateLookupCommand, GetLookupResponse, LookupsClient, UpdateLookupCommand } from '../../../lms-api-service';

@Component({
  selector: 'app-lookup-details',
  templateUrl: './lookup-details.component.html',
  styleUrl: './lookup-details.component.scss'
})
export class LookupDetailsComponent implements OnInit {

  /*form*/
  frmGroup: FormGroup;
  model: CreateLookupCommand;
  updateModel: UpdateLookupCommand;
  isEdit : boolean;
  isLoading : boolean;
  dataSource : GetLookupResponse[];
  constructor(private dialog : MatDialog,
    private formBuilder : FormBuilder,
    private lookupsClient : LookupsClient,
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<LookupDetailsComponent>){
      this.model = data.model;
      this.isEdit = data.isEdit;
  }
  ngOnInit(): void {
    this.setFormInitValue();
    if(this.isEdit){
      this.edit();
    }
  }

  closeDialog(){
    this.dialog.closeAll()
  }

  // setFormInitValue(): any {
  //   this.frmGroup = this.formBuilder.group({
  //     id: [0,''],
  //     name: ['', Validators.required],
  //     nameBN: ['', Validators.required],
  //     code: ['', Validators.required],
  //     description: ['', ''],
  //   });
  // }

  setFormInitValue(): any{
    this.frmGroup = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [Validators.required]),
      nameBN : new FormControl(null, [Validators.required]),
      code: new FormControl(null, [Validators.required]),
      description: new FormControl(null)
    });
  }

  onSave(){
    this.model.name = this.frmGroup.get('name').value;
    this.model.nameBN = this.frmGroup.get('nameBN').value;
    this.model.code = this.frmGroup.get('code').value;
    this.model.description = this.frmGroup.get('description').value;
    this.lookupsClient.createLookup(this.model).subscribe(res => {
      this.dialogRef.close();
    });
  }

  onUpdate(){
    this.updateModel = new UpdateLookupCommand();
    this.updateModel.id = this.frmGroup.get('id').value;
    this.updateModel.name = this.frmGroup.get('name').value;
    this.updateModel.nameBN = this.frmGroup.get('nameBN').value;
    this. updateModel.code = this.frmGroup.get('code').value;
    this.updateModel.description = this.frmGroup.get('description').value;
    console.log(this.updateModel);
    this.lookupsClient.updateLookup(this.updateModel.id, this.updateModel).subscribe(res => {
      console.log(res);
      this.clearFormData();
      this.closeDialog();
    });
  }

  

  clearFormData(){
    this.frmGroup.reset({
      id:0,
      name: null,
      nameBN : null,
      code : null,
      descripion : null
    })
  }

  edit(): void {
    this.frmGroup.patchValue({
      id: this.model.id,
      name: this.model.name,
      nameBN: this.model.nameBN,
      code: this.model.code,
      description: this.model.description,
    });
  }

  generateModel(isCreate: boolean): any {
    this.model.name = this.frmGroup.value.name;
    this.model.nameBN = this.frmGroup.value.nameBN;
    this.model.code = this.frmGroup.value.code ;
    this.model.description = this.frmGroup.value.description;
  }
  getParentField():any{
    return  this.frmGroup.get('parent');
  }
}
