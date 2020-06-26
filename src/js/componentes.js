import { Todo } from "../classes";
import { todoList } from "../index";

// Referencias al HTML
const divTodoList    = document.querySelector('.todo-list');
const txtInput       = document.querySelector('.new-todo');
const btnBorrarCompletados = document.querySelector('.clear-completed');
const ulFiltros      = document.querySelector('.filters');
const enlacesFiltros = document.querySelectorAll('.filtro');
const pendientes = document.querySelector('strong');


export const crearTodoHtml = (todo) => {
  const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${ todo.id }">
		    <div class="view">
			      <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
			      <label>${ todo.tarea }</label>
			      <button class="destroy"></button>
		    </div>
		  <input class="edit" value="Create a TodoMVC template">
    </li>`;

  const div = document.createElement( 'div' );
        div.innerHTML = htmlTodo;

  divTodoList.append( div.firstElementChild );

  countPendientes();
  return div.firstElementChild;
}

export const countPendientes = () => {
  const Pend = todoList.todos.filter( todo => !todo.completado ).length;
  pendientes.innerText = Pend;
};


//Eventos
txtInput.addEventListener('keyup', ( event ) => {
  
  if( event.keyCode === 13 && txtInput.value.length > 0 ){

    const nuevoTodo = new Todo( txtInput.value ); //Creamos el nuevo todo: se agregan sus propiedades [id, fecha, estado, etc] 
    todoList.nuevoTodo( nuevoTodo ); //Se inserta en el arreglo
    crearTodoHtml( nuevoTodo  );     //Se insertar en el HTML

    txtInput.value = ''; //Se limpia el input
    countPendientes();
  }
});

divTodoList.addEventListener( 'click', ( event )=>{

    const nombreElemento = event.target.localName; //input || label || button
    const todoElemento   = event.target.parentElement.parentElement; // Obtenemos todo el elemento 'li' del html
    const todoId         = todoElemento.getAttribute('data-id'); // obtenemos el valor del atribito 'data-id' del elemnto 'li' previamente obtenido

    if( nombreElemento.includes('input') ){
      todoList.estadoTodo( todoId );  // Cambiamos el estado del elemento en el arreglo
      todoElemento.classList.toggle('completed'); // Agregamos o quitamos la clase 'completed' al elemento'
      countPendientes();

    }else if( nombreElemento.includes('button') ){
      todoList.eliminarTodo( todoId ); // Enviamos el id del elemento y lo eliminarlo del arreglo
      divTodoList.removeChild( todoElemento ); //Eliminamos el elemento del HTML
      countPendientes();
    }    
    
});

btnBorrarCompletados.addEventListener( 'click', ( event )=>{
  todoList.eliminarCompletados(); // Eliminado todos los completados del arreglo

  for (let i = divTodoList.children.length-1; i >=0 ; i--) { //Hacemos un barrido de los elemetos HTML a la inversa
    const elemento = divTodoList.children[i]; //almacenamos el elemento en una constante
    
    if( elemento.classList.contains('completed') ){ //Veridicamos si el elemento contienen la clases 'completed'
      divTodoList.removeChild( elemento );          //Eliminamos el elemento del HTMl que si cumple con al condicion del if
    }
  }
  countPendientes();
});

ulFiltros.addEventListener( 'click', (event) =>{
 
  const filtro = event.target.text;
  if( !filtro ){ return; }
  
  enlacesFiltros.forEach( a => a.classList.remove('selected'));
  event.target.classList.add('selected');
  

  for ( const elemento of divTodoList.children ) {
      elemento.classList.remove('hidden');
      const completado = elemento.classList.contains('completed');

      switch( filtro ){
        case 'Pendientes':
          if(completado){
            elemento.classList.add('hidden');
          }
        break;

        case 'Completados':
          if( !completado ){
            elemento.classList.add('hidden');
          }
        break;
      }
  }

});