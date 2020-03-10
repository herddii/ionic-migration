import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { SaleskitService } from '../service/saleskit/saleskit.service';

@Component({
  selector: 'app-modalbu',
  templateUrl: './modalbu.page.html',
  styleUrls: ['./modalbu.page.scss'],
})
export class ModalbuPage implements OnInit {

  bu = [];
  checked: number;
  bucustom = [{
    ID_BU: 11,
    NAMA_BU: 'ALL',
    isChecked: true
  }];
  selected = [];

  constructor(
    public modalCtrl: ModalController, 
    public saleskitServ: SaleskitService,
    public navParams: NavParams
    ) { }

  ngOnInit() {
    this.checked = this.navParams.data.id;
    this.saleskitServ.getBu().then(bu =>{
      this.bu = this.bu.concat(bu);
      this.bu = this.bu.filter(h => h.ID_BU !== 11);
      this.bu.forEach(v =>{
        this.bucustom = this.bucustom.concat({
          ID_BU: v['ID_BU'],
          NAMA_BU: v['BU_SHORT_NAME'],
          isChecked: false
        })
      })
    })
    
  }

  async closeModal(value?) {
    // const onClosedData: string = "Wrapped Up!";
    await this.modalCtrl.dismiss(value);
  }

  getVal(e){
    console.log(e.ID_BU);
    this.closeModal(e.ID_BU);
    this.selected = this.selected.concat(e);
  }

  

}
