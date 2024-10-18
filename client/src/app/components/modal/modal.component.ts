import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {
  MatFormFieldModule,
  MatHint,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ModalService } from './modal.service';
import { TaskStore } from '@stores/task.store';
import { SnackbarService } from '@shared/services/snackbar.service';

const MATERIAL_MODULES = [
  MatLabel,
  MatFormFieldModule,
  MatInput,
  MatDialogModule,
  MatButtonModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatHint,
  MatCheckboxModule,
];

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule, MATERIAL_MODULES],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private readonly _snackBarSvc = inject(SnackbarService);
  private readonly _modalSvc = inject(ModalService);
  private readonly _currentDate = new Date().getFullYear();
  private readonly _taskStore = inject(TaskStore);

  readonly minDate = new Date();
  readonly maxDate = new Date(this._currentDate + 2, 12, 31);

  taskForm!: FormGroup;

  ngOnInit(): void {
    this._initForm();
    if (this._matDialog.data) {
      this.taskForm.patchValue(this._matDialog.data);
    }
  }

  onSubmit() {
    if (this.taskForm.value.notes === undefined) {
      this.taskForm.value.notes = '';
    }

    const task = this.taskForm.value;
    let message = 'Tarea actualizada';
    if (this._matDialog.data) {
      this._taskStore.updateTask(task);
    } else {
      message = 'Tarea creada';
      this._taskStore.addTask(task);
    }

    this._snackBarSvc.showSnackBar(message);
    this._modalSvc.closeModal();
  }

  getTitle(): string {
    return this._matDialog.data ? 'Editar Tarea' : 'Nueva Tarea';
  }

  getButton(): string {
    return this._matDialog.data ? 'Editar' : 'Crear';
  }

  private _initForm(): void {
    const today = new Date();
    const nextDay = today.setDate(today.getDate() + 1);
    this.taskForm = this._fb.nonNullable.group({
      // Titulo: ['', Validators.required],
      // Vencimiento: [new Date(nextDay), Validators.required],
      // Notas: [''],
      // Estatus: false,
      id: [null],
      title: ['', Validators.required],
      dueDate: [new Date(nextDay), Validators.required],
      notes: [''],
      isDone: false,
    });
  }
}
