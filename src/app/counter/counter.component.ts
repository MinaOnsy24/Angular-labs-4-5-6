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
  qun: number = 0;
  // newProdact !:any
  totalPrice: number = 0;
  constructor(private counterService: CounterService,
    private cartService: CartService) {

  }
  //to sub total price
  totalPice() {
    this.totalPrice = 0
    this.qun = 0
    this.prodacts.forEach((prodact) => {
      prodact.totalPrice = prodact.qun * prodact.price
      this.totalPrice += prodact.totalPrice
      this.qun+= prodact.qun
    })
    console.log(this.qun)
    this.counterService.setCounter(this.qun)

  }

  ngOnInit() {

    this.counterService.getCounter().subscribe((res) => this.qun = res)
    this.cartService.getCounter().subscribe((res) => this.prodacts = res)

    this.totalPice()

  }



  up(prodact: any) {
    const index = this.prodacts.findIndex((obj) => {
      return obj.id == prodact.id
    })
    this.prodacts[index].qun++
    console.log(this.prodacts)
    this.totalPice()

  }

  remove(prodact: any) {
    console.log("remove")
  }

  down(prodact: any) {
    const index = this.prodacts.findIndex((obj) => {
      return obj.id == prodact.id
    })
    this.prodacts[index].qun--
    console.log(this.prodacts)
    this.totalPice()

    if (prodact.qun == 0) {
      this.prodacts
    }




  }











}
