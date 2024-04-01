import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { Task } from '../../domain/models/task.model';
import { TasksRepositoryImplementation } from '../repository/tasks.repository.impl';
import { getAll, getAllComplete } from './task.actions';

@Injectable({
    providedIn: 'root'
})
export class TaskEffects {
    getAll$ = createEffect(() => this.actions.pipe(
        ofType(getAll),
        exhaustMap(() => this.tasksService.getAll().pipe(
            map((tasks: Task[]) => getAllComplete({ tasks }))
        ))
    ));

    constructor(
        private tasksService: TasksRepositoryImplementation,
        private actions: Actions
    ) { }
}
