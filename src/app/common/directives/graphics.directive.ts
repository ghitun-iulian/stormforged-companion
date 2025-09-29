import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, Input, computed, effect, inject, signal } from '@angular/core';
import { primaryColor } from '@common/interfaces';
import { CollectionItem2, DEFAULT_GRAPHICS_CONFIG, GraphicsConfig } from '@common/ui/collection-select/collection.interface';
import { catchError, firstValueFrom, of } from 'rxjs';

@Directive({
  selector: '[collectionItem],[graphicsConfig]',
})
export class GraphicsDirective {
  private el = inject(ElementRef);
  private http = inject(HttpClient);
  private static cache = new Map<string, string>();

  // Signals
  private item = signal<CollectionItem2 | null>(null);
  private config = signal<Partial<GraphicsConfig> | null>(null);

  // merged config
  private mergedConfig = computed(() => {
    return { ...DEFAULT_GRAPHICS_CONFIG, ...(this.config() ?? {}) };
  });

  @Input('collectionItem') set collectionItem(item: CollectionItem2 | null) {
    this.item.set(item);
  }

  @Input('graphicsConfig') set graphicsConfig(cfg: Partial<GraphicsConfig> | null) {
    this.config.set(cfg);
  }

  constructor() {
    effect(() => {
      const itemValue = this.item();
      if (!itemValue) {
        this.el.nativeElement.innerHTML = '';
        return;
      }

      const cfg = this.mergedConfig();
      this.render(itemValue, cfg);
    });
  }

  private async render(item: CollectionItem2, config: GraphicsConfig) {

    const host = this.el.nativeElement as HTMLElement;
    host.innerHTML = '';

    const path = `assets/collection/${item.type}/${item.label}.${item.filetype}`;

    if (config.renderAs === 'svg') {
      if (item.filetype == 'svg') await this.loadAndInjectSvg(path, host, item.color, config);
      else this.renderImg(path, config, item.label, host);
    }

    if (config.renderAs === 'img') this.renderImg(path, config, item.label, host);
    if (config.renderAs === 'background') this.renderBackground(path, config, host);
    if (config.renderAs === 'element') this.createElement(host, path, config);

  }

  private renderImg(path: string, config: GraphicsConfig, label: string, host: HTMLElement) {
    const img = document.createElement('img');
    img.classList.add(config.cssClass!);
    img.src = path;
    img.alt = config.altText ?? label;
    this.applyDimmensions(img, config);
    host.appendChild(img);
  }

  private renderBackground(path: string, config: GraphicsConfig, host: HTMLElement) {
    host.style.backgroundImage = `url('${path}')`;
    host.style.backgroundSize = config.backgroundSize!;
  }

  private applyDimmensions(el: HTMLElement, config: GraphicsConfig) {
    if (config.width) {
      el.style.width = typeof config.width === 'number' ? `${config.width}px` : config.width;
    }

    if (config.height) {
      el.style.height = typeof config.height === 'number' ? `${config.height}px` : config.height;
    }

    if (config.preserveAspectRatio) {
      el.style.objectFit = 'contain';
    }
  }

  private async loadAndInjectSvg(path: string, host: HTMLElement, color: string, config: GraphicsConfig) {
    let svgContent!: string;

    console.log('Loading SVG:', path);


    if (GraphicsDirective.cache.has(path))
      svgContent = GraphicsDirective.cache.get(path) ?? '';
    else {
      svgContent = await firstValueFrom(
        this.http.get(path, { responseType: 'text' }).pipe(
          catchError(() => {
            console.error(`Missing SVG: ${path}`);
            return of('');
          })
        )
      );

      GraphicsDirective.cache.set(path, svgContent);

    }

    if (!svgContent) {
      host.innerHTML = '<span class="missing-svg">⚠</span>';
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    const svgElement = doc.documentElement;

    svgElement.classList.add(config.cssClass!);

    svgElement.setAttribute('fill', color || primaryColor);
    this.applyDimmensions(svgElement, config);

    host.appendChild(svgElement);
  }

  private createElement(host: HTMLElement, path: string, config: GraphicsConfig) {
    const child = document.createElement('div');
    child.classList.add(config.cssClass!);
    child.style.backgroundImage = `url('${path}')`;
    child.style.backgroundSize = config.backgroundSize!;
    this.applyDimmensions(child, config);

    host.appendChild(child);
  }

}
