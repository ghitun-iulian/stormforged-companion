import { CommonModule } from '@angular/common';
import { Component, computed, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { GraphicsDirective, ImgDirective } from '@common/directives';
import { accentColor, GameResources } from '@common/interfaces/game.interface';
import { CollectionItem, CollectionItem2, CollectionType } from '../collection-select/collection.interface';

export interface ResourcePickerConfig {
  filter?: GameResources[];
}


@Component({
  selector: 'resource-picker',
  imports: [
    CommonModule,
    MatMenuModule,
    GraphicsDirective,
  ],
  templateUrl: './resource-picker.html',
  styleUrl: './resource-picker.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ResourcePicker),
      multi: true
    }
  ]
})
export class ResourcePicker implements ControlValueAccessor {

  private onChange: (v: any) => void = () => { };


  resource: CollectionItem2 = {
    type: CollectionType.ICON,
    label: 'empty',
    filetype: 'svg',
    color: accentColor
  }

  config = input<ResourcePickerConfig>({});
  resources = computed(() =>
    Object.values(GameResources)
      .filter(r => !this.config()?.filter || !this.config()?.filter?.includes(r))
      .map(r => ({
        type: CollectionType.ICON,
        label: r,
        filetype: 'svg',
        color: accentColor
      }))
  );

  writeValue(item: any): void {
    if (!item) return;
    this.resource = item
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(): void { }

  updateResource(item: Partial<CollectionItem2>) {
    this.resource = { ...this.resource, ...item };
    this.onChange(this.resource);
  }


}
