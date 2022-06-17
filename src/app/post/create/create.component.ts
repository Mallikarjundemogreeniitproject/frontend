import { Component, ElementRef, OnInit, ViewChild,Inject } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
  import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IndexComponent } from '../index/index.component';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  
  form!: FormGroup;

  constructor(
    public postService: PostService,
    private router: Router,
    public dialogRef: MatDialogRef<IndexComponent>
  ) { }
  
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.minLength(2)]),
      state: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z]+$")]),
      zip: new FormControl('', [Validators.required,Validators.minLength(5)]),
      amount: new FormControl('', [Validators.required,Validators.minLength(1)]),
      qty: new FormControl('', [Validators.required,Validators.minLength(1)]),
      item: new FormControl('', [Validators.required,Validators.minLength(2)]),
    });
  }
    
  get name() {
   return this.form.get('name');
  }
  get state() {
   return this.form.get('state');
  }
  get zip() {
   return this.form.get('zip');
  }
  get amount() {
   return this.form.get('amount');
  }
  get item() {
   return this.form.get('item');
  } 
  get qty() {
   return this.form.get('qty');
  } 

  submit(){
    if(this.form.valid){
      this.postService.create(this.form.value).subscribe(res => {
          console.log('Post created successfully!');
          this.dialogRef.close();
      });
    }
  }
  
}