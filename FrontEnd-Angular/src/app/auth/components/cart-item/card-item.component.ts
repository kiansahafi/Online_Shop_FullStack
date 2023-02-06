import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit {
  @Input() cardItem: CardItem;

  constructor() {}

  ngOnInit(): void {}
}

export interface CardItem {
  image?: string;
  title?: string;
  price?: number;
  quantity?: number;
  size: string;
}
