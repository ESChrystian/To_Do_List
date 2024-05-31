// Seleção de Elementos

// Adiciona o formulário
const todoForm = document.querySelector("#todo-form");

// Adiciona tarefas
const todoInput = document.querySelector("#todo-input");

// Inclui novas tarefas
const todoList = document.querySelector("#todo-list");

// Formulário de edição
const editForm = document.querySelector("#edit-form");

// Campo de edição 
const editInput = document.querySelector("#edit-input");

// Campo de cancelamento
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;



// Funções



// Armazena o texto que vem pelo valor do input
const saveTodo = (text) => {

    // Estrutura da div todo-list 
    // Div Geral
    const todo = document.createElement("div");
    todo.classList.add("todo");

    // Titulo
    const todoTitle = document.createElement("h3");
    // Aqui armazenamos o texto recepido da função saveTodo
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    // Botão Feito
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    // Em forma de texto o icone feito e introduzido aqui
    doneBtn.innerHTML = '<i class="bx bx-check"></i>';
    todo.appendChild(doneBtn);

    // Botão Editar
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = ' <i class="bx bxs-edit-alt"></i>';
    todo.appendChild(editBtn);

    // Botão Delete
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = ' <i class="bx bx-x"></i>';
    todo.appendChild(deleteBtn);
    
    // Coloca o "todo" na Lista geral que no caso é a div "todo-list"  
    todoList.appendChild(todo);

    // Após o envio o input fica vazio para adicionar mais tarefas
    todoInput.value = "";

    // E aqui a tela foca novamente no input de adicionamento de tarefas
    todoInput.focus();
};

    // Esconde os formulário, se já estiver escondido ele exibe
const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        // Guarda o título da tarefa
        let todoTitle = todo.querySelector("h3");
        
        // Encontra todo certo e altera seu texto
        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    });
};
// Finaliza funções



// Eventos




    // Enviar Formulário
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Guarda os valores inseridos no input
    const inputValue = todoInput.value;

    // Mini verificação para que o usuário não deixe o input em branco 
    if (inputValue) {
        saveTodo(inputValue);
        // Salvar Todo
    }
});

    // Indetifica em qual botão foi o click e qual elemento foi clicado e faz uma ação
document.addEventListener("click", (e) => {

    // Armazena o elemento que foi clicado, como por exemplo ele armazena botão "finish-todo"
    const targetEl = e.target;

    // armazena o elemento pai mais próximo no html, no caso, temos a div "todo"
    const parentEl = targetEl.closest("div");

    //Título da tarefa, essa variavél servirá como apoio
    // para mapear as tarefas para edição das mesmas
    let todoTitle;

    // Indentifica se parentEl existe e guarda o texto contido no h3 da tarefa
    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }
    // Finaliza Tarefas (Feito)
    if (targetEl.classList.contains("finish-todo")) {

    // Conclui e retira a conclusão
        parentEl.classList.toggle("done");
    }

    // Remove tarefas
    if (targetEl.classList.contains("remove-todo")) {

        // aciona a variável parentEl e a remove.
        // parentEl é igual a div done.
        parentEl.remove();
    }

    //    Edita Tarefas
    if (targetEl.classList.contains("edit-todo")) {

        // Ao clicar no botão de edição aciona a função,
        // essa função esconde os formulários: criar tarefa e tarefas. 
        toggleForms()

        // Preenche o input de edição com o texto que o usuário quer editar
        editInput.value = todoTitle;

        // Guarda a tarefa antes dela ser editada,
        // para caso o usuario cancelar a edição a tarefa não se alterar
        oldInputValue = todoTitle;
    }
});

    // Cancelar edição
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Esconde a edição e exibe os outros fomulários
    toggleForms();
});

// Atualiza tarefa e volta a tela inicial
editForm.addEventListener("submit", (e) => {

    e.preventDefault()

    const editInputValue = editInput.value

    if (editInputValue) {
        updateTodo(editInputValue)
    
    }
    toggleForms()
})