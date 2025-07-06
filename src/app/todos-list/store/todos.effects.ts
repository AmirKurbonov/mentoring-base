import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { TodosApiService } from '../../todos-api.service';
import { TodosActions }  from './todo.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TodosEffects {
  constructor(
    private actions$: Actions,
    private todoApiService: TodosApiService
  ) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.loadTodos), // 👉 слушаем правильный экшен
      mergeMap(() =>
        this.todoApiService.getTodos().pipe(
          map(todos => TodosActions.loadTodosSuccess({ todos })),
          catchError(error => of(TodosActions.loadTodosFailure({ error })))
        )
      )
    )
  );
}