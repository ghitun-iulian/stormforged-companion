import { Component } from '@angular/core';
import { Tools } from './tools/tools';
import { Assets } from './assets/assets';
import { Collection } from './collection/collection';

@Component({
  selector: 'asset-manager',
  imports: [Tools, Assets, Collection],
  templateUrl: './asset-manager.html',
  styleUrl: './asset-manager.scss',
})
export class AssetManager {
  toggleTheme() {
    document.querySelector('html')!.classList.toggle('theme-light');
  }
}
