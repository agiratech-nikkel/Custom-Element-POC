import { Component, OnInit,Input,Output,ViewEncapsulation, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-element',
  templateUrl: './custom-element.component.html',
  styleUrls: ['./custom-element.component.css'],
  encapsulation:ViewEncapsulation.ShadowDom
})
export class CustomElementComponent implements OnInit {

  @Input() label!:string
  @Input() label2!:string
  @Output() action = new EventEmitter();
  @Output() action2 = new EventEmitter();

  private nuberOfClick =0;
  private nuberOfClick2 =0;

  constructor() { }

  ngOnInit(): void {
  }
  handleClick(){
    this.nuberOfClick++
    this.nuberOfClick2++
    this.action.emit(this.nuberOfClick)
    this.action2.emit(this.nuberOfClick2)
  }

}
