import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, inject, Input } from '@angular/core';
import { catchError, firstValueFrom, of } from 'rxjs';

@Directive({
  selector: '[svgPath]',
})
export class SvgDirective {
  private el = inject(ElementRef);
  private http = inject(HttpClient);
  private static svgCache = new Map<string, string>();

  @Input('svgPath') set path(path: string) {
    if (!path) return;
    this.loadSvg(path);
  }

  private async loadSvg(path: string) {
    this.el.nativeElement.classList.add('svg');

    if (SvgDirective.svgCache.has(path)) {
      this.el.nativeElement.innerHTML = SvgDirective.svgCache.get(path);
      return;
    }

    const svg = await firstValueFrom(
      this.http.get(path, { responseType: 'text' }).pipe(
        catchError(() => {
          return of('<svg><!-- missing icon --></svg>');
        })
      )
    );

    SvgDirective.svgCache.set(path, svg);
    this.el.nativeElement.innerHTML = svg;
  }
}
