import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController, Platform, ModalController } from '@ionic/angular';
import { SamconceptService } from '../service/sam/concept/samconcept.service';
import { UniquePipe } from 'ngx-pipes';
import { ModalsamPage } from '../modalsam/modalsam.page';
@Component({
  selector: 'app-samconcept',
  templateUrl: './samconcept.page.html',
  styleUrls: ['./samconcept.page.scss'],
})
export class SamconceptPage implements OnInit {
  
  request: string;
  requestype: string;
  configtype = [];
  buttons = [];
  selected = [];
  selectedAm = [];
  page = 1;

  constructor(
    public router: Router,
    public action: ActionSheetController,
    public concept: SamconceptService,
    public modal: ModalController,
    public unique: UniquePipe
  ) { }

  ngOnInit() {
    this.get_type();
    this.getAm();
  }

  gobacktoawalan(){
    this.router.navigateByUrl('awalan');
  }

  async actionRequestype() {
    const actionSheet = await this.action.create({
      header: "Requested By",
      buttons: [
        {
          text: "Client",
          handler: () => {
            this.request = "Client";
          }
        },
        {
          text: "Sales",
          handler: () => {
            this.request = "Sales";
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async presentModal(type) {
    const modal = await this.modal.create({
      component: ModalsamPage,
      componentProps: {
        select : this.selected,
        type: type
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      let t = dataReturned.data;
      if(type === 'program'){
        this.selected = this.selected.concat(t);
        this.selected = this.unique.transform(this.selected);
      } else {
        this.selectedAm = this.selectedAm.concat(t);
        this.selectedAm = this.unique.transform(this.selectedAm);
      }
    });
    return await modal.present();
  }

  get_type(){
    this.concept.getRequestType().then(x => {
      let a = [];
      a = a.concat(x);
      a.forEach(b => {
        this.buttons = this.buttons.concat({
          text: b['nama'],
            handler: () => {
              this.requestype = b['nama'];
            }
        })
      })
      console.log(this.buttons);
    })
  }

  async actionCreativeBrief() {
    const actionSheet = await this.action.create({
      header: "Creative Brief",
      buttons: this.buttons
    });
    await actionSheet.present();
  }

  getAm(){
    let form = {
      advertiser: '',
      agency: '',
      am: '',
      ntc: '',
      page_limit: ''
    }
    this.concept.getAm(this.page, form).then(x => console.log(x));
  }

}
