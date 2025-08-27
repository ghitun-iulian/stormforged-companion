import { Component, inject } from '@angular/core';
import { AssetsService } from './assets.service';
import { Assets } from './assets/assets';
import { Editor } from './editor/editor';
import { Tools } from './tools/tools';

@Component({
  selector: 'asset-manager',
  imports: [Tools, Assets, Editor],
  templateUrl: './asset-manager.html',
  styleUrl: './asset-manager.scss',
  providers: [AssetsService],
})
export class AssetManager {
  private assetService = inject(AssetsService);

  postAsset() {
    //   const asset: Asset<any> = {
    //     label: 'Asset 1',
    //     printQty: 1,
    //     data: {},
    //   };
    //   this.assetService
    //     .postAsset(asset)
    //     .pipe(tap((x) => console.log(x)))
    //     .subscribe();
  }
}
