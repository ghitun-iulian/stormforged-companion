import { Component, signal } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { Nav } from '@common/ui/nav/nav';

@Component({
  selector: 'root',
  standalone: true,
  imports: [
    RouterOutlet,
    Nav,
    MatDialogModule
  ],
  template: `
    <nav class="flex gap-m pad-s"></nav>
    <div class="flex column flex-1">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('stormforged-companion');
}
