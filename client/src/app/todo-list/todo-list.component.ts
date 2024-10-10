import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';
import { environment } from '@environment';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
    <h1 id="tableLabel">Todo List</h1>

    <p *ngIf="!todos"><em>Loading...</em></p>

    <div *ngIf="todos" class="todo-list">
      <div *ngFor="let todo of todos"><input type="checkbox" [checked]="todo.isDone" /> {{ todo.text }}</div>
    </div>
  `,
  styles: ['body { margin: 10px; }'],
})
export class TodoListComponent {
  todos: Todo[] = [];

  constructor(http: HttpClient) {
    http.get<any>(`${environment.baseUrl}/todos`).subscribe({
      next: (result) => {
        this.todos = result;
      },
      error: (error) => console.error(error)
    });
  }
}

interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}
