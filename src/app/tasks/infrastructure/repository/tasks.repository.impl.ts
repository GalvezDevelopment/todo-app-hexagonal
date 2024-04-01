import { Injectable } from '@angular/core';
import { TasksApi } from '../../domain/api/tasks.api';
import { Observable, from } from 'rxjs';
import { Task } from '../../domain/models/task.model';
import { Axios } from 'axios';
import { TaskDto } from '../mapper/task.dto';
import { TaskMapper } from '../mapper/task.mapper';

@Injectable({
    providedIn: 'root'
})
export class TasksRepositoryImplementation extends TasksApi {
    private instance: Axios;

    constructor() {
        super();
        this.instance = new Axios({
            baseURL: 'http://localhost:3000/tasks/',
            responseType: 'json'
        });
    }

    override add(task: Task): Observable<Task> {
        return from(this.instance.post('', task).then(r => r.data));
    }

    override getAll(): Observable<Task[]> {
        return from(this.instance.get<TaskDto[]>('').then(r => r.data.map(TaskMapper.fromDtoToModel.bind(this))));
    }

    override getById(id: string): Observable<Task> {
        return from(this.instance.get(id).then(r => r.data));
    }

    override modify(task: Task): Observable<Task> {
        return from(this.instance.patch('', task).then(r => r.data));
    }

    override removeById(id: string): Observable<boolean> {
        return from(this.instance.delete(id).then(r => r.data));
    }
}