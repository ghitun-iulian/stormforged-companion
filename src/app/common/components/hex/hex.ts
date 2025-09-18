import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Asset } from 'modules/asset-manager/asssets.interface';

@Component({
  selector: 'hex',
  imports: [CommonModule],
  templateUrl: './hex.html',
  styleUrl: './hex.scss',
})
export class Hex {
  asset = input<Asset<any> | null>(null);
  editorPreview = input(false);
  showBack = input(false);

  state = computed(() => {
    const asset = this.asset();
    const editorPreview = this.editorPreview();
    const showBack = this.showBack();
    let size = (asset?.metadata?.size ?? '50') + 'mm';
    if (editorPreview) size = '50mm';

    return {
      asset,
      showBack,
      editorPreview,
      size
    };
  });
}
