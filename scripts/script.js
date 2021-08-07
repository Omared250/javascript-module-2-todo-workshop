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

const filterInput = document.querySelector('#search-text')
filterInput.addEventListener('input', (event) => {
    setFilters({
        searchTitle: event.target.value
    })
    renderTodos(todos);
})

const checkFinished = document.querySelector('#show-finished')
checkFinished.addEventListener('change', (event) => {
    setFilters({
        showFinished: event.target.value
    })
    renderTodos(todos)
})

const checkUnfinished = document.querySelector('#show-unfinished')
checkUnfinished.addEventListener('change', (event) => {
    setFilters({
        showUnfinished: event.target.value
    })
    renderTodos(todos)
})

const todos = [];

const filters = {
    searchTitle: '',
    showFinished: false,
    showUnfinished: false
}

const createTodo = (text) => {
    todos.push({
        title: text,
        completed: false
    })
}

const generateTodoDOM = (todoObj) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const todoText = document.createElement('span')

    const checkboxEl = document.createElement('input')
    checkboxEl.setAttribute('type', 'checkbox')
    checkboxEl.checked = todoObj.completed
    containerEl.appendChild(checkboxEl)
    containerEl.addEventListener('change', () => {
        toggleTodo(todoObj.title)
        renderTodos(todos)
    })

    todoText.textContent = todoObj.title
    containerEl.appendChild(todoText)

    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // setup remove button
    const  removeButton = document.createElement('button')
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todoObj.title)
        renderTodos(todos)
    })

    return todoEl
}

const renderTodos = (todos) => {
    const filteredTodos = todos.filter((todo) => todo.title.toLowerCase().icludes(filters.searchTitle.toLowerCase()))
    if(filters.showFinished && filters.showUnfinished) {
        // do nothing
    } else if(filters.showFinished) {
        filteredTodos = filteredTodos.filter((todo) => todo.completed)
    } else if(filters.showUnfinished) {
        filteredTodos = filteredTodos.filter((todo) => !todo.completed)
    }

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

const toggleTodo = (title) => {
    const todo = todos.find((todo) => todo.title.toLowerCase() === title.toLowerCase())
    if(todo) {
        todo.completed = !todo.completed
    }
}

const setFilters = (updates) => {
    if(typeof updates.searchTitle === 'string') {
        filters.searchTitle = updates.searchTitle
    }
    if(typeof updates.showFinished === 'boolean') {
        filters.showFinished = updates.showFinished
    }
    if(typeof updates.showUnfinished === 'boolean') {
        filters.showUnfinished = updates.showUnfinished
    }
    console.log(filters);
}

const removeTodo = (title) => {
    const todoIndex = todos.findIndex((todo) => {
        return todo.title.toLowerCase() === title.toLowerCase()
    })
    if(todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

