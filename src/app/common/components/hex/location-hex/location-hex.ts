import { Component, input } from '@angular/core';
import { ImgDirective } from '@common/directives';
import { LocationHexData } from '@common/interfaces';

@Component({
  selector: 'location-hex',
  imports: [ImgDirective],
  templateUrl: './location-hex.html',
  styleUrl: './location-hex.scss'
})
export class LocationHex {
  data = input.required<LocationHexData>()
}
