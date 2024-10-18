import {
  Component,
  inject,
  OnInit,
  output,
  signal,
  ViewContainerRef,
} from '@angular/core';
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
import { TaskFront } from '@features/tasks/tasks.interfaces';
import { ListComponent } from '@features/tasks/list/list.component';
import { TaskService } from '@features/tasks/tasks.service';
import { ModalService } from './modal.service';

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
  private readonly _taskSvc = inject(TaskService);
  private readonly _modalSvc = inject(ModalService);
  private readonly _currentDate = new Date().getFullYear();

  readonly minDate = new Date();
  readonly maxDate = new Date(this._currentDate + 2, 12, 31);

  taskForm!: FormGroup;
  onSubmitOutput = output<TaskFront>();

  ngOnInit(): void {
    this._initForm();
    this.taskForm.patchValue({
      Titulo: this._matDialog.data?.Titulo,
      Vencimiento: new Date(this._matDialog.data?.Vencimiento),
      Notas: this._matDialog.data?.Notas,
      Estatus: this._matDialog.data?.Estatus === 'Completado' ? true : false,
    });
  }

  onSubmit() {
    console.log('Inside onSubmit');
    if (this.taskForm.value.Notas === undefined) {
      this.taskForm.value.Notas = '';
    }
    const task = this.taskForm.value;
    if (this._matDialog.data) {
      console.log('Inside onSubmit if');

      this._taskSvc.updateTask(this._matDialog.data.ID, task);
    } else {
      console.log('Inside onSubmit else');
      this._taskSvc.createTask(task);
    }

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
      Titulo: ['', Validators.required],
      Vencimiento: [new Date(nextDay), Validators.required],
      Notas: [''],
      Estatus: false,
    });
  }
}

// TODO: https://www.youtube.com/watch?v=56syqNBu0bg 1:39:30
// Check how to set service tasks
