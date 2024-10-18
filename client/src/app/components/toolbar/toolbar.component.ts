import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const MATERIAL_MODULES = [MatToolbarModule, MatIconModule, MatButtonModule];

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MATERIAL_MODULES],
  template: `
    <mat-toolbar color="primary">
      <a mat-button routerLink="/">
        <mat-icon>home</mat-icon>
        <span>Home</span>
      </a>

      <a mat-button routerLink="/tasks">
        <mat-icon>pending_actions</mat-icon>
        <span>Tareas</span>
      </a>

      <span class="spacer"></span>

      <a mat-button (click)="emitClick()">
        <mat-icon>add_box</mat-icon>
        <span>Crear</span>
      </a>
    </mat-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  onNewTaskEvent = output<void>();

  emitClick(): void {
    this.onNewTaskEvent.emit();
  }
}
