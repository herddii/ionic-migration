import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homecam',
  templateUrl: './homecam.page.html',
  styleUrls: ['./homecam.page.scss'],
})
export class HomecamPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goto(id){
    this.router.navigateByUrl('transaction');
  }

}
