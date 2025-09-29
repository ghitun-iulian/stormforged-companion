import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HexDialIndexes, HexIndexDial } from '@common/interfaces';

@Component({
  selector: 'docking-points',
  imports: [],
  templateUrl: './docking-points.html',
  styleUrl: './docking-points.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DockingPoints),
      multi: true
    }
  ]
})
export class DockingPoints implements ControlValueAccessor {

  dockingPoints: HexIndexDial = []
  indexes = Array.from({ length: 6 }, (_, i) => i) as HexDialIndexes[];

  private onChange: (v: any) => void = () => { };
  writeValue(value: HexIndexDial): void { this.dockingPoints = value ?? []; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(): void { }

  setValue(value: HexIndexDial | null) {
    this.dockingPoints = value ?? [];
    this.onChange(value);
  }

  editPoints(index: HexDialIndexes) {
    if (!this.dockingPoints.includes(index))
      this.dockingPoints.push(index);
    else
      this.dockingPoints = this.dockingPoints.filter(i => i !== index);

    this.setValue(this.dockingPoints);
  }

}
