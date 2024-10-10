import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavMenuComponent, RouterOutlet],
  template: `
      <body>
        <app-nav-menu />
        <div class="container">
          <router-outlet />
        </div>
      </body>
  `,
})
export class AppComponent {}
