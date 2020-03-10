import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactionpage',
  templateUrl: './transactionpage.page.html',
  styleUrls: ['./transactionpage.page.scss'],
})
export class TransactionpagePage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  
  goto(id){
    this.router.navigateByUrl('transaction');
  }
}
