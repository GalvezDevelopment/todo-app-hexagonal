import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlobalState } from '../state/global-state.interface';
import { Observable } from 'rxjs';
import { Task } from './domain/models/task.model';
import { selectTasks } from './infrastructure/state/task.selectors';
import * as taskActions from './infrastructure/state/task.actions';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(private store: Store<GlobalState>) {
    this.tasks$ = store.select(selectTasks);
  }

  ngOnInit(): void {
    this.store.dispatch(taskActions.getAll());
  }
}
