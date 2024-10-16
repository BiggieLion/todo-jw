import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { TaskService } from '@core/services/task.service';
import { ModalService } from './modal.service';
import { MatFormFieldModule, MatLabel, MatHint } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';

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
  templateUrl: './modal.template.html',
  styleUrls: ['./modal.styles.scss'],
})
export class ModalComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly matDialog = inject(MAT_DIALOG_DATA);
  private readonly taskSvc = inject(TaskService);
  private readonly modalSvc = inject(ModalService);
  private readonly _currentDate = new Date().getFullYear();

  readonly minDate = new Date();
  readonly maxDate = new Date(this._currentDate + 2, 12, 31);

  taskForm!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
    this.taskForm.patchValue({
      Titulo: this.matDialog.data?.Titulo,
      Vencimiento: new Date(this.matDialog.data?.Vencimiento),
      Notas: this.matDialog.data?.Notas,
      Estatus: this.matDialog.data?.Estatus === 'Completado' ? true : false,
    });
  }

  onSubmit(): void {
    let message = 'Tarea editada correctamente';

    if (this.matDialog.data) {
      this.taskSvc.updateTask(this.matDialog.data.ID, this.taskForm.value);
    } else {
      this.taskSvc.createTask(this.taskForm.value);
      message = 'Tarea creada correctamente';
    }

    this.modalSvc.closeModal();
  }

  getTitle(): string {
    return this.matDialog.data ? 'Actualizar Tarea' : 'Crear Tarea';
  }

  getButton(): string {
    return this.matDialog.data ? 'Actualizar' : 'Crear';
  }

  private buildForm(): void {
    const today = new Date();
    const nextDay = today.setDate(today.getDate() + 1);
    this.taskForm = this.formBuilder.nonNullable.group({
      Titulo: ['', Validators.required],
      Vencimiento: [new Date(nextDay), Validators.required],
      Notas: [''],
      Estatus: false,
    });
  }
}
