import { Component, input } from '@angular/core';
import { ImgDirective } from '@common/directives';
import { RelicCardData } from '@common/interfaces';

@Component({
  selector: 'relic-card',
  imports: [
    ImgDirective
  ],
  templateUrl: './relic-card.html',
  styleUrl: './relic-card.scss'
})
export class RelicCard {

  data = input.required<RelicCardData>();

}
