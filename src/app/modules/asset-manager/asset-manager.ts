import { Component, inject } from '@angular/core';
import { Tools } from './tools/tools';
import { Assets } from './assets/assets';
import { Collection } from './collection/collection';
import { AssetsService } from './assets.service';
import { tap } from 'rxjs';
import { Asset, AssetType } from './asssets.interface';

@Component({
  selector: 'asset-manager',
  imports: [Tools, Assets, Collection],
  templateUrl: './asset-manager.html',
  styleUrl: './asset-manager.scss',
  providers: [AssetsService],
})
export class AssetManager {
  private assetService = inject(AssetsService);

  postAsset() {
    const asset: Asset<any> = {
      label: 'Asset 1',
      data: {},
    };

    this.assetService
      .postAsset(asset)
      .pipe(tap((x) => console.log(x)))
      .subscribe();
  }
}
