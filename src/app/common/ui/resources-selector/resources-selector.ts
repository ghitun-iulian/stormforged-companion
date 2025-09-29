import { CommonModule } from '@angular/common';
import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ImgDirective } from '@common/directives';
import { GameResources, maxResources, ResourceItem } from '@common/interfaces';
import { clamp } from '@common/tools/util';

@Component({
  selector: 'resources-selector',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    ImgDirective
  ],
  templateUrl: './resources-selector.html',
  styleUrl: './resources-selector.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ResourcesSelector),
      multi: true
    }
  ]
})
export class ResourcesSelector implements ControlValueAccessor {

  label = input<string>('Resources');
  gameResources = Object.values(GameResources).filter(r => r !== 'relic');
  maxResources = maxResources;

  resourceList: ResourceItem[] = [];

  private onChange: (v: any) => void = () => { };
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { }

  writeValue(value: ResourceItem[] | null): void {
    this.resourceList = value ? [...value] : [];
  }


  setValue(value: ResourceItem[]) {
    this.resourceList = value;
    this.onChange(value);
  }

  newResource(resource: GameResources) {
    if (this.resourceList.some(r => r.label === resource)) return;
    this.resourceList.push({ label: resource, value: 1 });
    this.setValue(this.resourceList);
  }

  changeResourceValue(resource: GameResources, delta: number, override = false) {
    const item = this.resourceList.find(r => r.label === resource);
    if (!item) return;

    item.value = override ? delta : item.value + delta;
    item.value = clamp(item.value, 1, this.maxResources);

    this.setValue(this.resourceList);
  }

  removeResource(resource: GameResources) {
    this.resourceList = this.resourceList.filter(r => r.label !== resource);
    this.setValue(this.resourceList);
  }

}
