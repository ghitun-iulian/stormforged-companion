import { Component, input } from '@angular/core';
import { ImgDirective } from '@common/directives';
import { TrackerHexData } from '@common/interfaces';

@Component({
  selector: 'tracker-hex',
  imports: [ImgDirective],
  templateUrl: './tracker-hex.html',
  styleUrl: './tracker-hex.scss'
})
export class TrackerHex {
  data = input.required<TrackerHexData>()
}
