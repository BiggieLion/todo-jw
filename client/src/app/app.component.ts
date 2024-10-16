import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from '@components/toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';
import { ModalService } from '@components/modal/modal.service';
import { ModalComponent } from '@components/modal/modal.component';

const MODULES = [RouterOutlet, ToolbarComponent, MatCardModule];
@Component({
  selector: 'app-root',
  standalone: true,
  imports: MODULES,
  template: `
    <section>
      <mat-card>
        <mat-card-content>
          @defer {
            <app-toolbar (onNewTask)="onClickNewTask()" />
            <router-outlet />
          }
        </mat-card-content>
      </mat-card>
    </section>
  `,
})
export class AppComponent {
  constructor(private readonly modalSvc: ModalService) {}
  onClickNewTask(): void {
    this.modalSvc.openModal<ModalComponent>(ModalComponent);
  }
}
