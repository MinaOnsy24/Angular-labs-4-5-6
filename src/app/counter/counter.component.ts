import { Component } from '@angular/core';
import { CounterService } from '../services/counter.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  counter: number = 0;
  prodacts !: any[];
  qun : any = 0 ;
  // newProdact !:any
  totalPrice: number = 0;
  constructor(private counterService: CounterService,
    private cartService: CartService) {

  }

  ngOnInit() {

    this.counterService.getCounter().subscribe((res) => this.counter = res)
    this.cartService.getCounter().subscribe((res) => this.prodacts = res)

    this.prodacts.forEach((prodact) => { prodact.totalPrice = prodact.qun * prodact.price })

    const singlePriceForProdact = this.prodacts.map((prodact) => prodact.totalPrice)
    for (let i = 0; i < singlePriceForProdact.length; i++) {
      this.totalPrice = this.totalPrice + singlePriceForProdact[i];
    }

    const qunForProdact = this.prodacts.map((prodact) => prodact.qun)
    for (let i = 0; i < qunForProdact.length; i++) {
      this.qun = this.qun + qunForProdact;
    }
    // this.qun = this.qun + qunForProdact;
    console.log(this.qun)

  }

  up(prodact: any) {
    // this.counterService.setCounter(++this.counter)
    const addQun = this.prodacts.find((obj) =>{

      if(obj.id == prodact.id){
        console.log("if")
        console.log(prodact)
        obj.qun + 1
        console.log(prodact)

      }else{
        console.log("else")
        return obj}
    })

    console.log(addQun)
    // addQun.qun = addQun.qun + 1
    // this.prodacts.push(addQun)
    // return prodact
  }

  remove(prodact: any) {

  }

  down(prodact: any) {
    if (this.counter !== 1 || prodact.qun !== 1) {
      // this.counterService.setCounter(--this.counter)
      const addQun = this.prodacts.find((obj) => obj.id == prodact.id)
      addQun.qun = addQun.qun - 1
    }else if( prodact.qun == 0){
      console.log(prodact)
    // this.prodacts.pop(prodact)
    }

  }
}
