import { Directive, ElementRef, Input, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Directive({
  selector: '[imgPath]',
})
export class ImgDirective {
  private el = inject(ElementRef);
  private http = inject(HttpClient);
  private static cache = new Map<string, string>();

  @Input('imgPath') set path(path: string | null | undefined) {
    if (!path) {
      this.el.nativeElement.innerHTML = '';
      return;
    }

    if (!path.toLowerCase().endsWith('.svg')) {
      this.el.nativeElement.classList.add('img-fallback');
      this.el.nativeElement.innerHTML = `<img src="${path}" alt="" />`;
      return;
    }

    this.loadSvg(path);
  }

  private async loadSvg(path: string) {
    this.el.nativeElement.classList.add('svg');
    this.el.nativeElement.classList.remove('img-fallback');

    if (ImgDirective.cache.has(path)) {
      this.el.nativeElement.innerHTML = ImgDirective.cache.get(path) ?? '';
      return;
    }

    const svg = await firstValueFrom(
      this.http.get(path, { responseType: 'text' }).pipe(
        catchError(() => {
          console.warn(`Missing SVG: ${path}`);
          return of('');
        })
      )
    );

    ImgDirective.cache.set(path, svg);
    this.el.nativeElement.innerHTML = svg;
  }
}
