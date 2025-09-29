
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, forwardRef, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { PlatformHexData } from '@common/interfaces';
import { CollectionType } from '@common/ui/collection-select/collection.interface';
import { filter } from 'rxjs/internal/operators/filter';
import { tap } from 'rxjs/internal/operators/tap';
import { CollectionSelect } from "@common/ui/collection-select/collection-select";
import { TrackerEntries } from "@common/ui/tracker-entries/tracker-entries";

@Component({
  selector: 'hex-platform-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    CollectionSelect,
    TrackerEntries
  ],
  templateUrl: './hex-platform-form.html',
  styleUrl: './hex-platform-form.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HexPlatformForm),
      multi: true
    }
  ]
})
export class HexPlatformForm implements ControlValueAccessor {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  collectionType = CollectionType.ICON;

  form: FormGroup = this.fb.group({
    level: [0],
    icon: [null],
    dial: [[1, 2, 3, 4, 5, 6], Validators.required]
  });

  private onChange: (v: PlatformHexData | null) => void = () => { };
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(): void { }
  setValue(value: PlatformHexData | null) { this.onChange(value); }

  writeValue(patch: PlatformHexData | null): void {
    if (!patch) return
    this.form.patchValue(patch, { emitEvent: false });
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      filter(() => this.form.valid),
      tap((data) => this.setValue(data as PlatformHexData | null)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
}
