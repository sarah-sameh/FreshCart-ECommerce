import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomdataService } from '../../shared/services/productService/ecomdata.service';
import { Product } from '../../shared/interfaces/product';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{

  constructor(private _ActivatedRoute:ActivatedRoute, private _EcomdataService:EcomdataService){}


  productSlider: OwlOptions = {
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
  productDeatils:Product={} as Product;


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let idProduct:any = params.get('id');
        this._EcomdataService.getProductDetails(idProduct).subscribe({
          next:(res)=>{
            console.log("data herrre",res.data)
            this.productDeatils = res.data;
          }
        })
        
      }
    })
  }

}
