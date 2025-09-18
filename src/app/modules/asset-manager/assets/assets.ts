import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Asset, AssetFilters, AssetShape, CardDataTypes, HexDataTypes } from '@common/interfaces';
import { BehaviorSubject, combineLatest, debounceTime, map, Observable, of, switchMap, tap } from 'rxjs';
import { AssetsService } from '../assets.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Hex, Card } from "@common/components";

@Component({
  selector: 'assets',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    Hex,
    Card
  ],
  templateUrl: './assets.html',
  styleUrl: './assets.scss'
})


export class Assets {

  private assetsService = inject(AssetsService);
  assetShapes = Object.values(AssetShape);
  assetTypes = [...Object.values(CardDataTypes), ...Object.values(HexDataTypes)];

  search$ = new BehaviorSubject<string>('');
  assetFilters$ = new BehaviorSubject<AssetFilters>({
    search: '',
    shape: '',
    type: ''
  });

  get assetFilters() { return this.assetFilters$.value }
  set assetFilters(filters: Partial<AssetFilters>) {
    this.assetFilters$.next({ ...this.assetFilters, ...filters as AssetFilters });
  }

  assets$: Observable<Asset<any>[]> = combineLatest({
    filters: this.assetFilters$,
    search: this.search$.pipe(debounceTime(300)),
    assetId: this.assetsService.selectedAsset$ // update when an asset is changed
  }).pipe(
    map((x: { filters: AssetFilters, search: string }) => ({ ...x.filters, search: x.search })),
    this.assetsService.assets$,
  )

  state$ = combineLatest({
    assets: this.assets$,
    selectedId: this.assetsService.selectedAsset$
  })

  selectAsset(id: string) {
    this.assetsService.selectedAsset = id;
  }
}
