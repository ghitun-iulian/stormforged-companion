import { Component, input } from '@angular/core';
import { ImgDirective } from '@common/directives';
import { ExplorationHexData } from '@common/interfaces';

@Component({
  selector: 'exploration-hex',
  imports: [ImgDirective],
  templateUrl: './exploration-hex.html',
  styleUrl: './exploration-hex.scss'
})
export class ExplorationHex {
  data = input.required<ExplorationHexData>()
}
