import { NgModule, Directive,OnInit, EventEmitter, Output, OnDestroy, Input,ElementRef,Renderer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollHideDirective } from './scroll-hide.directive';

@NgModule({
  imports: [
  ],
  declarations: [
  ScrollHideDirective
  ],
  exports: [
  ScrollHideDirective
  ]
})

export class SharedModule { }