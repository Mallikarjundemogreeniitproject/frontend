import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import { CellClickedEvent, ColDef, GridReadyEvent, RowValueChangedEvent } from 'ag-grid-community';
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
  // ,cellStyle: { 'text-align': "center" }
  public columnDefs: ColDef[] = [
    {headerName: 'Id', field: 'id' },
		{headerName: 'Name', field: 'name', },
		{headerName: 'State', field: 'state' },
		{headerName: 'ZipCode', field: 'zip'},
    {headerName: 'Amount', field: 'amount' },
		{headerName: 'Qty', field: 'qty' },
		{headerName: 'Item Number', field: 'item'}
	];
  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    resizable: true,
    filter: true,
  };

  public paginationPageSize : number = 10;

  constructor(public postService: PostService,private dialog: MatDialog) { }

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
      this.errordanger = "alert alert-danger";
      this.errorMessage = "Please select a row to Edit the Order";
      this.hideErrorMessage();
    }
  }

  hideErrorMessage(){
     setTimeout(() => {
        this.errordanger = "";
        this.errorMessage = "";
      } , 3000);
  }
  // Example of consuming Grid Event
  onCellClicked( e: CellClickedEvent): void {
    this.orderData = e.data;
    this.orderId = e.data.id;
    this.errorMessage = "";
    this.errordanger = "";
  }

  deleteRecord(id:number){
    if(id != 0){
      this.postService.delete(id).subscribe(res => {
         console.log('Post deleted successfully!');
         this.orderId = 0;
         this.refreshData();
      });
    }else{
      this.errordanger = "alert alert-danger";
      this.errorMessage = "Please select a row to Delete the Order";
      this.hideErrorMessage();
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
