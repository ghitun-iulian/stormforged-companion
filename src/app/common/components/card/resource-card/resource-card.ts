import { Component, input, Input } from '@angular/core';
import { ImgDirective } from '@common/directives';
import { ResourceCardData } from '@common/interfaces';

@Component({
  selector: 'resource-card',
  imports: [ImgDirective],
  templateUrl: './resource-card.html',
  styleUrl: './resource-card.scss'
})
export class ResourceCard {

  data = input<ResourceCardData | null>(null);

}
