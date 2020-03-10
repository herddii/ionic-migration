import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';
// import { ScrollHideDirective } from '../scroll-hide.directive';
import { SharedModule } from '../shared.module';
import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
