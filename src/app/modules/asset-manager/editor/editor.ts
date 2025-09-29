import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Card, Hex } from '@common/components';
import { Asset, AssetShape, CardDataTypes, HexDataTypes } from '@common/interfaces';
import { CollectionSelect } from "@common/ui/collection-select/collection-select";
import { ConfirmDialog } from '@common/ui/confirm-dialog/confirm-dialog';
import { auditTime, combineLatest, filter, map, of, startWith, tap } from 'rxjs';
import { AssetsService } from '../assets.service';
import { CardResourceForm } from './data-controls/card-resource-form/card-resource-form';
import { CardEventForm } from "./data-controls/card-event/card-event-form";
import { CardStormForm } from "./data-controls/card-storm-form/card-storm-form";
import { CardRelicForm } from "./data-controls/card-relic-form/card-relic-form";
import { HexResourceForm } from "./data-controls/hex-resource-form/hex-resource-form";
import { HexPlatformForm } from "./data-controls/hex-platform-form/hex-platform-form";
import { HexLocationForm } from "./data-controls/hex-location-form/hex-location-form";
import { HexExplorationForm } from "./data-controls/hex-exploration-form/hex-exploration-form";
import { HexTrackerForm } from "./data-controls/hex-tracker-form/hex-tracker-form";
import { CollectionItem2, CollectionType, GraphicsConfig } from '@common/ui/collection-select/collection.interface';
import { GraphicsDirective } from '@common/directives';

@Component({
  selector: 'editor',
  imports: [
    CommonModule,
    Hex,
    Card,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    CollectionSelect,
    // Data Controls
    CardResourceForm,
    CardEventForm,
    CardStormForm,
    CardRelicForm,
    HexResourceForm,
    HexPlatformForm,
    HexLocationForm,
    HexExplorationForm,
    HexTrackerForm,

    GraphicsDirective
  ],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
})
export class Editor {
  private assetService = inject(AssetsService);
  private fb = inject(NonNullableFormBuilder);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);

  form: FormGroup = this.fb.group({
    id: [null],
    shape: [AssetShape.HEX, Validators.required],
    type: [null, Validators.required],
    metadata: this.fb.group({
      label: ['', Validators.required],
      description: [''],
      backImage: [null],
      bgImage: [null],
      printQty: [0],
      size: [null],
    }),
    data: null,
  });


  assetDataType$ = combineLatest({
    shape: this.form.get('shape')!.valueChanges.pipe(startWith(this.form.get('shape')!.value)),
    type: this.form.get('type')!.valueChanges.pipe(startWith(this.form.get('type')!.value)),
  }).pipe(
    map((x) => `${x.shape}-${x.type}`),
  )

  assetMetadata = this.form.get('metadata') as FormGroup;
  asset$ = this.assetService.asset$.pipe(
    tap((asset: Asset<any>) => {
      this.form.reset({ emitEvent: false });
      if (!asset) return;
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
    assetDataType: this.assetDataType$,
  })

  ngOnInit() {
    this.form.valueChanges.pipe(
      filter(() => this.form.valid),
      auditTime(100),
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

  duplicateAsset(asset: Asset<any>) {
    this.assetService.duplicateAsset(asset)
  }

  deleteAsset() {
    const confirm = this.dialog.open(ConfirmDialog);
    confirm.componentInstance.confirmDialogData = {
      value: this.assetService.selectedAsset,
      message: 'Are you sure you want to delete this asset?'
    };

    confirm.afterClosed().pipe(
      filter((x) => !!x),
      this.assetService.deleteAsset$,
    ).subscribe()

  }

}
