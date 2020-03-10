import { Component } from '@angular/core';
import { ScrollHideConfig } from '../scroll-hide.directive';
import { LoginService } from '../service/login/login.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };  
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 54 };

  constructor(
    public login: LoginService,
    private storage: Storage
  ) {
  }

}
