import { Component, OnInit, Pipe } from '@angular/core';
//import { EcomdataService } from '../../shared/services/productService/ecomdata.service';
import { EcomdataService } from '../../shared/services/productService/ecomdata.service';

import { CommonModule } from '@angular/common';
import { Product } from '../../shared/interfaces/product';
import { RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TermTextPipe } from '../../term-text.pipe';
import { SearchPipe } from '../../search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../shared/services/cartService/cart.service';
import {  ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule, CarouselModule,TermTextPipe,  SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private _EcomdataService:EcomdataService,
              private _CartService:CartService,
              private _ToastrService:ToastrService
  ){}

  products:Product[]=[];
  categories:any[]=[];
  searchTerm:string='';

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    items:1,
    nav: false
  }

  ngOnInit(): void {
    this._EcomdataService.getAllProducts().subscribe({
      next:(response)=>{
       // console.log(response);
        this.products = response.data
      },
    });

    this._EcomdataService.getCategories().subscribe({
      next:(res)=>{
        this.categories = res.data;
      }
    })

    
  }


  addCart(id:string):void{
    console.log('product is herrre ===> ', id);
    this._CartService.addToCart(id).subscribe({
      next:(res)=>{
        console.log('response heeeree ==> ',res);
        this._ToastrService.success(res.message, 'Fresh Cart')
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }
}
