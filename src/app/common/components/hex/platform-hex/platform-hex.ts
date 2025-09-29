import { Component, input } from '@angular/core';
import { ImgDirective } from '@common/directives';
import { PlatformHexData } from '@common/interfaces';

@Component({
  selector: 'platform-hex',
  imports: [ImgDirective],
  templateUrl: './platform-hex.html',
  styleUrl: './platform-hex.scss'
})
export class PlatformHex {
  data = input.required<PlatformHexData>()
}
