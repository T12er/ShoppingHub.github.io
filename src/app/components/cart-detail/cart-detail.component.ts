import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  cartItems :CartItem[]=[];
  totalPrice :number;
  totalQuantity: number;
  theCartItem: CartItem;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {

    this.listCartDetails();
  }
  listCartDetails() {

    this.cartItems=this.cartService.cartItems;

    

    //subscribe for the cart  total price
    this.cartService.totalPrice.subscribe(

      data => this.totalPrice=data
    );


    //subscribe for the cart  total quantity
    this.cartService.totalQuantity.subscribe(

      data => this.totalQuantity=data
    );

    this.cartService.computeCartTotals();

  }

  increamentQuantity(theCartItem :CartItem){

    this.cartService.addToCart(theCartItem);

  }

  decreamentQuantity(theCartItem :CartItem){

    this.cartService.decreamentQuantity(theCartItem);
  }


  remove(theCartItem :CartItem){
    this.cartService.remove(theCartItem);
  }
  /*decreamentQuantity(theCartItem :CartItem){

    theCartItem.quantity--;
    if(theCartItem.quantity==0){

     this.remove(theCartItem);
    }

    else{

      this.cartService.computeCartTotals();
    }
    //this.cartService.removeFromCart(theCartItem);
  }

  remove(theCartItem :CartItem){

    //get the index  of the item in the array
    const itemIndex=this.cartItems.findIndex(tempIndex=>tempIndex.id ==theCartItem.id);

    //if found remove the item from the array
    if(itemIndex>-1){
      this.cartItems.splice(itemIndex, 1);
      this.cartService.computeCartTotals();

    }


  }
  */
}
