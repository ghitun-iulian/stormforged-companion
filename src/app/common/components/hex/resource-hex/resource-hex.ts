import { Component, computed, input } from '@angular/core';
import { ResourceHexData } from '@common/interfaces';
import { ImgDirective } from "@common/directives";

@Component({
  selector: 'resource-hex',
  imports: [ImgDirective],
  templateUrl: './resource-hex.html',
  styleUrl: './resource-hex.scss'
})
export class ResourceHex {

  data = input.required<ResourceHexData>()

  resources = computed(() => {
    const spreadResources = [];
    for (const resource of this.data().resources) {
      const amount = resource.value ?? 1;
      for (let i = 0; i < amount; i++) {
        spreadResources.push(resource.label);
      }
    }

    return spreadResources;
  })
}
