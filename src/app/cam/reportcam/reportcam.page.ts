import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { ModalController } from '@ionic/angular';
import { CamServiceService } from '../../service/cam/cam-service.service';
@Component({
  selector: 'app-reportcam',
  templateUrl: './reportcam.page.html',
  styleUrls: ['./reportcam.page.scss'],
})
export class ReportcamPage implements OnInit {

  datePickerObj: any = {};
  selectedDate;
  selectedMonth;
  monthsList = [
    {
    id: 1,
    month: 'January'
    },
    {
      id: 2,
      month: 'February'
    },
    {
      id: 3,
      month: 'March'
    },
    {
      id: 4,
      month: 'April'
    },
    {
      id: 5,
      month: 'May'
    },
    {
      id: 6,
      month: 'June'
    },
    {
      id: 7,
      month: 'July'
    },
    {
      id: 8,
      month: 'August'
    },
    {
      id: 9,
      month: 'September'
    },
    {
      id: 10,
      month: 'October'
    },
    {
      id: 11,
      month: 'November'
    },
    {
      id: 12,
      month: 'December'
    }];
  weeksList = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  datadaily = [];
  segmentChoose: any='hari';
  datepickerObj2: any = {}; 
  dataMonth = [];
  datamonth_conv = [];

  constructor(
    public location: Location,
    public modal: ModalController,
    public camServ: CamServiceService
  ) { }

  ngOnInit() {

    this.datePickerObj = {
      dateFormat: 'YYYY-MM-DD',
      titleLabel: 'Select a Date',
      clearButton : false,
      btnProperties: {
        expand: 'block', // "block" | "full"
        fill: '', // "clear" | "default" | "outline" | "solid"
        size: '', // "default" | "large" | "small"
        disabled: '', // boolean (default false)
        strong: '', // boolean (default false)
        color: ''
      },
    };
    this.datepickerObj2 = {
      dateFormat: 'MMM-YYYY',
      titleLabel: 'Select a Month',
      clearButton : false,
      btnProperties: {
        expand: 'block', // "block" | "full"
        fill: '', // "clear" | "default" | "outline" | "solid"
        size: '', // "default" | "large" | "small"
        disabled: '', // boolean (default false)
        strong: '', // boolean (default false)
        color: ''
      },
    }

  }

  segmentChanged(ev){
    this.segmentChoose = ev.detail.value;
  }

  gobacktoawalan(){
    this.location.back();
  }

  async openDatePicker() {
    const datePickerModal = await this.modal.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { 'objConfig': this.datePickerObj, 'selectedDate': this.selectedDate }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss()
      .then((data) => {
        // this.isModalOpen = false;
        console.log(data);
        this.selectedDate = data.data.date;
      }).then(()=>{
        this.datadaily = [];
        this.camServ.getReportDaily(this.selectedDate).then(data =>{
          this.datadaily = this.datadaily.concat(data);
        })
      });
  }

  async openDatePicker2() {
    const datePickerModal2 = await this.modal.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { 'objConfig': this.datepickerObj2, 'selectedDate': this.selectedMonth }
    });
    await datePickerModal2.present();

    datePickerModal2.onDidDismiss()
      .then((data) => {
        // this.isModalOpen = false;
        console.log(data);
        this.selectedMonth = data.data.date;
      }).then(()=>{
        this.camServ.getReportMonthly('adelia.fortiena@mncgroup.com').then(datamonth=>{
          this.dataMonth = this.dataMonth.concat(datamonth);
          let result = Array.from(
            this.dataMonth.reduce(
              (m,o) =>{
                let t = m.get(o.bulan) || {};
                Object.keys(o).forEach( k =>{
                  if(Array.isArray(o[k])){
                    t[k] = t[k] || [];
                    o[k].forEach(v => t[k].includes(v) || t[k].push(v));
                  } else if(t[k] !== o[k]){
                    t[k] = o[k];
                  }
                })
                return m;
              },
              this.monthsList.reduce((m,o) => m.set(o.id, Object.assign({}, o)), new Map)
            ).values()
          )
          console.log(result);
        })
      });
  }


  

}
