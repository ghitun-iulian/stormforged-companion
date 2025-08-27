import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Card, Hex } from '@common/components';
import { Asset, AssetShape, CardDataTypes, HexDataTypes } from '@common/interfaces';
import { auditTime, combineLatest, filter, map, of, startWith, tap } from 'rxjs';
import { AssetsService } from '../assets.service';
import { CardForm } from './card-form/card-form';
import { HexForm } from './hex-form/hex-form';

@Component({
  selector: 'editor',
  imports: [
    CommonModule,
    Hex,
    HexForm,
    Card,
    CardForm,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption
  ],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
})
export class Editor {
  private assetService = inject(AssetsService);
  private fb = inject(NonNullableFormBuilder);
  private destroyRef = inject(DestroyRef);


  form: FormGroup = this.fb.group({
    id: [null],
    shape: [AssetShape.HEX, Validators.required],
    type: [null, Validators.required],
    metadata: this.fb.group({
      label: ['', Validators.required],
      description: [''],
      backImage: [''],
      bgImage: [''],
      printQty: [0],
      size: [null],
    }),
    data: null,
  });

  assetMetadata = this.form.get('metadata') as FormGroup;
  asset$ = this.assetService.asset$.pipe(
    tap((asset) => {
      this.form.reset({ emitEvent: false });
      this.form.patchValue(asset, { emitEvent: false });
    }),
    startWith(this.form.getRawValue() as Asset<any>),
  );

  state$ = combineLatest({
    asset: this.asset$,
    assetId: this.assetService.selectedAsset$,
    assetShapes: of(Object.values(AssetShape)),
    hexDataTypes: of(Object.values(HexDataTypes)),
    cardDataTypes: of(Object.values(CardDataTypes)),
  })

  ngOnInit() {
    this.form.valueChanges.pipe(
      filter(() => this.form.valid),
      auditTime(300),
      map((value) => value as Asset<any>),
      this.assetService.saveAsset$,
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  createAsset() {
    this.form.reset({ emitEvent: false });
    this.assetService.selectedAsset = '';
  }

  setAssetShape = (shape: AssetShape) => {
    this.form.patchValue({ shape, type: null });
  };

  duplicateAsset() { }
  deleteAsset() { }

}
