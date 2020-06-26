import { Todo } from "./todo.class";


export class TodoList{
    constructor() {
        // this.todos =[];
        this.leerLocalStorage();
    }

    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){
        // El método filter() crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
        this.todos = this.todos.filter( todo => todo.id != id );
        this.guardarLocalStorage();     
    }

    estadoTodo( id ){
        for (const todo of this.todos) {
            if( id == todo.id){   
                todo.completado = !todo.completado;
                break;
            }
        }
        this.guardarLocalStorage();
    }

    eliminarCompletados(){
        this.todos = this.todos.filter( todo => !todo.completado );
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem( 'todo', JSON.stringify( this.todos ) );
    }

    leerLocalStorage(){
        this.todos = ( localStorage.getItem('todo') )
                        ? JSON.parse( localStorage.getItem('todo') )
                        : [];
        this.todos = this.todos.map( obj => Todo.fromJson( obj ) ); //Barremos el arreglo de objetos recuperados del localStorage
    }                                                               //y lo eviamos a una instancia para covertirlo en un arreglo nomrmal
                                                                    // y recuperar las propiedades o intancias del del arreglo
}