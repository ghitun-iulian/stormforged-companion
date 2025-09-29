import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { ImgDirective } from '@common/directives';
import { GameResources } from '@common/interfaces/game.interface';

@Component({
  selector: 'resource-picker',
  imports: [
    CommonModule,
    MatMenuModule,
    ImgDirective
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

  resources = Object.values(GameResources);
  resource!: GameResources | null;

  writeValue(obj: any): void { this.resource = obj ?? null }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(): void { }

  setValue(value: GameResources | null) {
    this.resource = value;
    this.onChange(value);
  }


}
