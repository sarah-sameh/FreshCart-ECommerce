import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cartService/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  constructor(private _CartService:CartService){}


  cartDetails:any={};

ngOnInit(): void {
  this._CartService.getUserCart().subscribe({
    next:(res)=>{
      console.log('response here in cart component ==> ',res.data);
      this.cartDetails = res.data
    },
    error:(err)=>{
      console.log(err);
    }
  })
}


removeCartItem(id:string):void{
  this._CartService.removeItem(id).subscribe({
    next:(res)=>{
      console.log('remove item response ==> ',res);
      this.cartDetails = res.data;
    },
    error:(err)=>{
      console.log(err);
    }
  })
}

changeCount(id:string, count:number):void{
 if(count > 0){
  this._CartService.updateCartProduct(id, count).subscribe({
    next:(res)=>{
      console.log(res);
      this.cartDetails = res.data;
    },
    error:(err)=>{
      console.log(err);
    }
  })
 }

}


}
