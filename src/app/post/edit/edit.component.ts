import { Component, Input, OnInit,Inject } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { IndexComponent } from '../index/index.component';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    
  id!: number;
  post !:Post;
  form!: FormGroup;
  
  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<IndexComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  
  ngOnInit(): void {
    this.id = this.data.orderId;
    this.post = this.data.orderData;
    
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
      this.postService.update(this.id, this.form.value).subscribe(res => {
         console.log('Post updated successfully!');
         this.dialogRef.close();
      });
    }
  }
   
}