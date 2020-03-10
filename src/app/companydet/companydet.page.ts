import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CamServiceService } from '../service/cam/cam-service.service';
@Component({
  selector: 'app-companydet',
  templateUrl: './companydet.page.html',
  styleUrls: ['./companydet.page.scss'],
})
export class CompanydetPage implements OnInit {

  @ViewChild('Content') content;

  item = [];
  details = [];
  listclientcompany = [];
  setBackground = false;

  constructor(
    public router: ActivatedRoute,
    public camServ: CamServiceService,
    public route: Router,
    public locate: Location
  ) { 
    this.router.params.subscribe(params => {
      this.item = [];
      this.item = this.item.concat(params.val);
      console.log(this.item[0]);
    });
  }

  ngOnInit() {
  }
  
  
}
