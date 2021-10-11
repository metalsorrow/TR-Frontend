import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-region',
  templateUrl: './card-region.component.html',
  styleUrls: ['./card-region.component.scss']
})
export class CardRegionComponent implements OnInit {

  @Input() imagePath: string;
  @Input() title: string;
  @Output() clicked = new EventEmitter();
  constructor() { 
    this.imagePath = '';
    this.title = '';
  }

  ngOnInit(): void {
  }

  handleClick(){
    this.clicked.emit({imagePath: this.imagePath, title: this.title});
  }

}
