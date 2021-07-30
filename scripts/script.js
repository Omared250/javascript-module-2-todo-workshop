const el = document.querySelector('#new-todo')

el.addEventListener('submit', (event) => {
    event.preventDefault()
    const text = event.target.elements.text.value.trim()

    if (text.length > 0) {
        createTodo(text)
        event.target.elements.text.value = ''
    }

    renderTodos(todos);
})

const todos = [];

const createTodo = (text) => {
    todos.push(text)
}

const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const todoText = document.createElement('span')


    todoText.textContent = todo
    containerEl.appendChild(todoText)

    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    return todoEl
}

const renderTodos = (todos) => {
    const todoList = document.querySelector('#todos')
    todoList.innerHTML = ''

    if(todos.length > 0) {
        todos.forEach((todo) => {
            todoList.appendChild(generateTodoDOM(todo))        
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = "There are no todos to show"
        todoList.appendChild(messageEl)
    }
}

renderTodos(todos);