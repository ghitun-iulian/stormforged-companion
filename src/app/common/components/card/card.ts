import { Component, Input, HostBinding } from '@angular/core';
import { Asset } from 'modules/asset-manager/asssets.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {

  @Input() set asset(asset: Asset<any>) {
    this.asset$.next(asset);
    this.size = (asset?.metadata?.size || '60') + 'mm';
  };
  @Input() showBack = false;
  @HostBinding('style.--size') size!: string;
  asset$ = new BehaviorSubject<null | Asset<any>>(null);
}
