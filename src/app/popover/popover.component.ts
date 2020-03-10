import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  typeAct;

  constructor(
    public popov: PopoverController,
    public navp: NavParams
  ) { }

  ngOnInit() {
    this.typeAct = this.navp.data.id;
    console.log(this.typeAct);
  }

  monthly(){
    this.popov.dismiss('month');
  }

  list(){
    this.popov.dismiss('list');
  }

  reimburse(){
    this.popov.dismiss('reimburse');
  }

  client(val){
    val === 'myclient' ? this.popov.dismiss('myclient') : this.popov.dismiss('listclient');
  }
  company(val){
    val === 'advertiser' ? this.popov.dismiss('advertiser') : this.popov.dismiss('agency');
  }
}
