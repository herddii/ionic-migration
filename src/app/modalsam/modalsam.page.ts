import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { SamconceptService } from '../service/sam/concept/samconcept.service';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modalsam',
  templateUrl: './modalsam.page.html',
  styleUrls: ['./modalsam.page.scss'],
})
export class ModalsamPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  program = [];
  am = [];
  lastpage: number;
  page = 1;
  choose = [];
  history = [];
  type: string;

  constructor(
    public conceptServ: SamconceptService,
    public modal: ModalController,
    public NavParam: NavParams,
  ) { 
    let c = NavParam.get('select');
    this.type = NavParam.get('type');
    this.history = this.history.concat(c);
  }

  ngOnInit() {
    if(this.type ==='program'){
      this.getData();
    } else {
      this.getDataAm();
    }
  }

  checking(ev, iv){
    this.program[ev].choosen ? this.program[ev].choosen = false : this.program[ev].choosen = true;
    console.log(this.choose);
  }
  
  getData(){
    this.conceptServ.getListProgram(this.page).then(x => {
      let a = [];
      a = a.concat(x['data']);
      a.forEach(o => {
        this.program = this.program.concat({
          id: o.id,
          text: o.text,
          choosen: false
        })
      })
      this.history.length > 0
      ? this.history.forEach(v => {
        let b = this.program.filter(b => b.id !== v.id);
        b = b.concat(v);
        this.program = [];
        this.program = this.program.concat(b);
        this.program.sort((a, b) => a.text.localeCompare(b.text));
      }) 
      : this.program.sort((a, b) => a.text.localeCompare(b.text));;
      this.lastpage = x['last_page'];
    });
  }

  async closeModal() {
    await this.modal.dismiss(this.program.filter(g => g.choosen));
  }

  getDataAm(){
    let form = {
      advertiser: '',
      agency: '',
      am: '',
      ntc: '',
      page_limit: ''
    }
    this.conceptServ.getAm(this.page,form).then(p => {
      this.am = this.am.concat(p['data']);
      this.lastpage = p['last_page'];
    })
  }


  loadData(ev){
    if (this.page !== this.lastpage) {
      this.page++;
      if (this.type === "program") {
        this.getData();
      } else {
        this.getDataAm();
      }
    }
    setTimeout(()=>{
      ev.target.complete();
    },500);
  }






}
