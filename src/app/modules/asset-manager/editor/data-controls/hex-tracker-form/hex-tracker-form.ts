
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, forwardRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TrackerHexData } from '@common/interfaces';
import { CollectionSelect } from "@common/ui/collection-select/collection-select";
import { CollectionType } from '@common/ui/collection-select/collection.interface';
import { TrackerEntries } from "@common/ui/tracker-entries/tracker-entries";
import { filter, tap } from 'rxjs';

@Component({
  selector: 'hex-tracker-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CollectionSelect,
    TrackerEntries
  ],
  templateUrl: './hex-tracker-form.html',
  styleUrl: './hex-tracker-form.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HexTrackerForm),
      multi: true
    }
  ]
})
export class HexTrackerForm implements ControlValueAccessor {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  collectionType = CollectionType.ICON;

  form: FormGroup = this.fb.group({
    dial: [[1, 2, 3, 4, 5, 6]],
    icon: [null]
  });

  private onChange: (v: TrackerHexData | null) => void = () => { };
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(): void { }
  setValue(value: TrackerHexData | null) { this.onChange(value); }

  writeValue(patch: TrackerHexData | null): void {
    if (!patch) return
    this.form.patchValue(patch, { emitEvent: false });
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      filter(() => this.form.valid),
      tap((data) => this.setValue(data as TrackerHexData | null)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
}
