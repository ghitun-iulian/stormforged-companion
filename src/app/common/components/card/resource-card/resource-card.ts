import { Component, input } from '@angular/core';
import { GraphicsDirective } from '@common/directives';
import { ResourceCardData } from '@common/interfaces';

@Component({
  selector: 'resource-card',
  imports: [GraphicsDirective],
  templateUrl: './resource-card.html',
  styleUrl: './resource-card.scss'
})
export class ResourceCard {

  data = input.required<ResourceCardData>();

}
