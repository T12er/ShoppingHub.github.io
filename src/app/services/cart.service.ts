import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  //storage : Storage = sessionStorage; //Reference to web browser's session storage

  storage : Storage = localStorage;
  //totalPrice: Subject<number> = new Subject<number>();
  //totalQuantity: Subject<number> = new Subject<number>();

  //totalPrice: Subject<number> = new ReplaySubject<number>();
  //totalQuantity: Subject<number> = new ReplaySubject<number>();


  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
   existingCartItem: CartItem ;

  constructor() {

    //read data from the storage
    let data=JSON.parse(this.storage.getItem('cartItems'));

    if(data!=null){

      this.cartItems=data;

      //compute totals based on the data that is read from storage
      this.computeCartTotals();
    }
   }

  addToCart(theCartItem: CartItem) {

    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    //let existingCartItem: CartItem = undefined;

    

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id

      //this.existingCartItem=this.cartItems.find(tempCartItem=> tempCartItem.id === this. existingCartItem.id);

      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === theCartItem.id) {
         this. existingCartItem = tempCartItem;
          break;
        }
      }

      // check if we found it
      alreadyExistsInCart = (this.existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      this.existingCartItem.quantity++;
    }
    else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }



  //decreases quantity wnem clicked on minus button

  decreamentQuantity(theCartItem :CartItem){

    theCartItem.quantity--;
    if(theCartItem.quantity==0){

     this.remove(theCartItem);
    }

    else{

      this.computeCartTotals();
    }
    //this.cartService.removeFromCart(theCartItem);
  }

  remove(theCartItem :CartItem){

    //get the index  of the item in the array
    const itemIndex=this.cartItems.findIndex(tempIndex=>tempIndex.id ==theCartItem.id);

    //if found remove the item from the array
    if(itemIndex>-1){
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();

    }


  }


  
  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
    this.persistCartItems();
  }


  persistCartItems(){
    this.storage.setItem('cartItems',JSON.stringify(this.cartItems));
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----');
  }
}
