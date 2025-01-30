import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Todos } from "./todos-list/todos-list.component";

@Injectable({
    providedIn: 'root'
})
export class TodosApiService {
    readonly apiService = inject(HttpClient)
    
    getTodos(){
        return this.apiService.get<Todos[]>('https://jsonplaceholder.typicode.com/todos')
    }

}
