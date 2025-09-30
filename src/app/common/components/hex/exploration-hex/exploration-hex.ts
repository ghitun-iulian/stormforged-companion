import { Component, input } from '@angular/core';
import { GraphicsDirective, ImgDirective } from '@common/directives';
import { ExplorationHexData } from '@common/interfaces';
import { GraphicsConfig } from '@common/ui/collection-select/collection.interface';

@Component({
  selector: 'exploration-hex',
  imports: [GraphicsDirective],
  templateUrl: './exploration-hex.html',
  styleUrl: './exploration-hex.scss'
})
export class ExplorationHex {
  data = input.required<ExplorationHexData>()
  config: GraphicsConfig = {
    width: '50%',
    height: '50%',
  }
}
