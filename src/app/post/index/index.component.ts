import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { CellClickedEvent, ColDef, GridReadyEvent, RowValueChangedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
   
  posts: any = [];
  @Input() orderId: number = 0;
  @Input() errorMessage: string = "";
  @Input() getData : any = [];
  @Input() errordanger: any = "";
  orderData : any = [];


  pageTitle : string = "GreenIT Application Challenge"

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {headerName: 'Id', field: 'id' },
		{headerName: 'Name', field: 'name' },
		{headerName: 'State', field: 'state' },
		{headerName: 'ZipCode', field: 'zip'},
    {headerName: 'Amount', field: 'amount' },
		{headerName: 'Qty', field: 'qty' },
		{headerName: 'Item Number', field: 'item'}
	];
  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  public paginationPageSize : number = 10;
  public editType = 'fullRow';
  constructor(public postService: PostService, private route: ActivatedRoute,
    private router: Router,private modalService: NgbModal,private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  openCreateDialog() {
    const creditdialogRef = this.dialog.open(CreateComponent, {
      maxWidth: 1000,
    });
    creditdialogRef.afterClosed().subscribe(result => {
      this.refreshData();
    });
  }

  openEditDialog() {
    if(this.orderId!=0){
      const creditdialogRef = this.dialog.open(EditComponent, {
        data: {
          orderId: this.orderId,
          orderData : this.orderData
        },
        disableClose: false,
      });
      creditdialogRef.afterClosed().subscribe(result => {
        this.refreshData();
      });
    }else{
      this.errordanger = "danger";
      this.errorMessage = "Please select a row to Edit the Order";
    }
  }

  // Example of consuming Grid Event
  onCellClicked( e: CellClickedEvent): void {
    this.orderData = e.data;
    this.orderId = e.data.id;
    this.errorMessage = "";
    this.errordanger = "";
  }

  onRowValueChanged(event: RowValueChangedEvent) {
    var data = event.data;
    let zipValidate = this.isCharNumeric(data.zip);
    let amountValidate = this.isCharNumeric(data.amount);
    let qtyValidate = this.isCharNumeric(data.qty);
    var validStatus = 1;
    if(data.name === ''){
      validStatus = 0;
    }else if(data.state === ''){
      validStatus = 0;
    }else if(data.item === ''){
      validStatus = 0;
    }
    if(validStatus == 1 && zipValidate == true && amountValidate == true && qtyValidate == true){
       this.postService.update(data.id, data).subscribe(res => {
        console.log('Post updated successfully!');
        this.router.navigateByUrl('post/index');
      });
    }else{
      this.isValidData();
    }
  }

  isValidData(){
    this.refreshData();
    this.errordanger = "danger";
    this.errorMessage = "Please Enter proper data to Update Order";
  }

  isCharNumeric(charStr:any) {
    return !!/\d/.test(charStr);
  }


  deleteRecord(id:number){
    if(id != 0){
      this.postService.delete(id).subscribe(res => {
         console.log('Post deleted successfully!');
         this.orderId = 0;
         this.refreshData();
      });
    }else{
      this.errordanger = "danger";
      this.errorMessage = "Please select a row to Delete the Order";
    }
  }

  refreshData(){
    this.postService.getAll().subscribe(results => {
        const keys = Object.keys(results);
        const values = Object.values(results);
        var selectedArray : any = values[1];
        let rowDat = []
        for (var val of selectedArray) {
          rowDat.push({"id":val.id,"name":val.name,"state":val.state,"zip":val.zip,"amount":val.amount,"qty":val.qty,"item":val.item});
        }
        this.posts = rowDat;
    });   
  }
  
}
