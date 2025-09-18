import { Component, computed, input } from '@angular/core';
import { Asset } from 'modules/asset-manager/asssets.interface';

@Component({
  selector: 'card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {

  asset = input<Asset<any> | null>(null);
  editorPreview = input(false);
  showBack = input(false);

  state = computed(() => {
    const asset = this.asset();
    const editorPreview = this.editorPreview();
    const showBack = this.showBack();
    let size = (asset?.metadata?.size ?? '60') + 'mm';
    if (editorPreview) size = '60mm';

    return {
      asset,
      showBack,
      editorPreview,
      size
    };
  });
}
