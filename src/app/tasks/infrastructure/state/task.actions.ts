import { createAction, props } from '@ngrx/store';
import { Task } from '../../domain/models/task.model';

export const getAll = createAction('[Tasks Component] Get All');
export const getAllComplete = createAction('[Task Component] Tasks loaded', props<{ tasks: Task[] }>());