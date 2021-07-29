let todos = [];

const createTodo = (text) => {
    todos.push(text)
}

const el = document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.text.value.trim()

    if (text.length > 0) {
        createTodo(text)
        e.target.elements.text.value = ''
    }

    console.log(todos);
})