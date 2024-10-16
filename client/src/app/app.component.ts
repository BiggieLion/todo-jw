import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ToolbarComponent } from '@components/toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';

const MODULES = [NavMenuComponent, RouterOutlet, ToolbarComponent, MatCardModule];
@Component({
  selector: 'app-root',
  standalone: true,
  imports: MODULES,
  template: `
    <section>
      <mat-card>
        <mat-card-content>
          <app-toolbar (onNewTask)="onClickNewTask()" />
          <router-outlet />
        </mat-card-content>
      </mat-card>
    </section>
  `,
})
export class AppComponent {
  onClickNewTask(): void {
    console.log('New task clicked');
  }
}
