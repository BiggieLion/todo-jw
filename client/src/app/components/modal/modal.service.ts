import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITaskResponse } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private readonly dialog: MatDialog) {}

  openModal<CT, T = ITaskResponse>(componentRef: ComponentType<CT>, data?: T, isEditing: boolean = false): void {
    const config = { data, isEditing };

    this.dialog.open(componentRef, {
      data: config,
      width: '800px',
    });
  }

  closeModal(): void {
    this.dialog.closeAll();
  }
}
