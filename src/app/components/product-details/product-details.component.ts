import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  currentProductId: number;
  product:Product=new Product(); // need to instantisate it to avoid errors in html page source while accessing undefined property

  constructor(private productService:ProductService,
    private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });



  }

  handleProductDetails(){
    // check if "id" parameter is available
    const hasProductId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasProductId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentProductId = +this.route.snapshot.params['id'];
    }
   

    // now get the product for the given product id
    this.productService.getProduct(this.currentProductId).subscribe(
      data => {
        this.product= data;
      }
    )    

}

addToCart(){
  const theCartItem= new CartItem(this.product);

  this.cartService.addToCart(theCartItem);

}

}
