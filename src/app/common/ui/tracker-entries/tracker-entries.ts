import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HexIndexDial } from '@common/interfaces';

@Component({
  selector: 'tracker-entries',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './tracker-entries.html',
  styleUrl: './tracker-entries.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TrackerEntries),
      multi: true
    }
  ]
})
export class TrackerEntries implements ControlValueAccessor {

  dial: HexIndexDial = [1, 2, 3, 4, 5, 6];

  private onChange: (v: any) => void = () => { };
  writeValue(patch: HexIndexDial): void {
    if (!patch) return;
    this.dial = patch;
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(): void { }


  changeEntry(index: number, value: string | number) {
    this.dial[index] = value;
    this.onChange(this.dial);
  }
}
