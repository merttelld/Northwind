import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms'
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm : FormGroup;
  constructor(private formBuilder:FormBuilder, 
    private productService:ProductService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm(){
    this.productAddForm = this.formBuilder.group({
      productName : ["",Validators.required],
      unitPrice : ["",Validators.required],
      unitsInStock : ["",Validators.required],
      categoryId : ["",Validators.required]
    })
  }

  add(){
    if(this.productAddForm.valid){
      let productModule = Object.assign({}, this.productAddForm.value) 
      this.productService.add(productModule).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,
              "Doğrulama hatası")
          }
        }
      })
      
    }else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
    
  }

}
