import { Component, input } from '@angular/core';
import { StormCardData } from '@common/interfaces';

@Component({
  selector: 'storm-card',
  imports: [],
  templateUrl: './storm-card.html',
  styleUrl: './storm-card.scss'
})
export class StormCard {
  data = input.required<StormCardData>();
}
