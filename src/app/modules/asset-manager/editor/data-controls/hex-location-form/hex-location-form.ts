
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, forwardRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LocationHexData, primaryColor } from '@common/interfaces';
import { CollectionSelect } from "@common/ui/collection-select/collection-select";
import { CollectionType } from '@common/ui/collection-select/collection.interface';
import { DockingPoints } from "@common/ui/docking-points/docking-points";
import { ResourcesSelector } from "@common/ui/resources-selector/resources-selector";
import { filter, tap } from 'rxjs';

@Component({
  selector: 'hex-location-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CollectionSelect,
    DockingPoints,
    ResourcesSelector,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './hex-location-form.html',
  styleUrl: './hex-location-form.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HexLocationForm),
      multi: true
    }
  ]
})
export class HexLocationForm implements ControlValueAccessor {

  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  iconCollectionType = CollectionType.ICON;

  form: FormGroup = this.fb.group({
    icon: [null],
    color: [primaryColor],
    dockingPoints: [null, Validators.required],
    minorReward: [null],
    majorReward: [null]
  });

  private onChange: (v: LocationHexData | null) => void = () => { };
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { }
  setValue(value: LocationHexData | null) { this.onChange(value) }

  writeValue(patch: LocationHexData | null): void {
    if (!patch) return
    this.form.patchValue(patch, { emitEvent: false });
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      filter(() => this.form.valid),
      tap((data) => this.setValue(data as LocationHexData | null)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
}
