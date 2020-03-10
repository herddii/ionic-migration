import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { CalendarComponentOptions } from 'ion2-calendar';
import { ScrollHideConfig } from '../../scroll-hide.directive';
 import { Router } from '@angular/router';
 import { CalendarComponent } from 'ionic2-calendar/calendar';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.page.html',
  styleUrls: ['./monthly.page.scss'],
})
export class MonthlyPage implements OnInit {
  eventSource;
    viewTitle;
    isToday: boolean;
    calendar = {
        mode: 'month',
        currentDate: new Date()
    };
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 60 };
  dateMulti: String[] = [
    '2019-09-02',
    '2019-09-03',
    '2019-09-04'
  ];
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi',
  };

    
  constructor(public actionSC: ActionSheetController,public navctrl: NavController, public route: Router) { }
  ngOnInit(){
    
  }
  loadEvents() {
    this.eventSource = this.createRandomEvents();
}
onViewTitleChanged(title) {
    this.viewTitle = title;
}
onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
}
changeMode(mode) {
    this.calendar.mode = mode;
}
today() {
    this.calendar.currentDate = new Date();
}
onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
        (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
}
onCurrentDateChanged(event:Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
}
createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
        var date = new Date();
        var eventType = Math.floor(Math.random() * 2);
        var startDay = Math.floor(Math.random() * 90) - 45;
        var endDay = Math.floor(Math.random() * 2) + startDay;
        var startTime;
        var endTime;
        if (eventType === 0) {
            startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
            if (endDay === startDay) {
                endDay += 1;
            }
            endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
            events.push({
                title: 'All Day - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: true
            });
        } else {
            var startMinute = Math.floor(Math.random() * 24 * 60);
            var endMinute = Math.floor(Math.random() * 180) + startMinute;
            startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
            endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
            events.push({
                title: 'Event - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: false
            });
        }
    }
    return events;
}
onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
}
markDisabled = (date:Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
};

}
