// HTML Elementlerini Seç
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Local Storage'dan Görevleri Yükle
document.addEventListener('DOMContentLoaded', loadTodos);

// Yeni Görev Ekleme
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = todoInput.value.trim();

    if (taskText === '') return;

    addTaskToList(taskText);
    saveToLocalStorage(taskText);
    todoInput.value = ''; // Giriş kutusunu temizle
});

// Görevi Listeye Ekle
function addTaskToList(taskText, isCompleted = false) {
    const todoItem = document.createElement('li');
    todoItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    if (isCompleted) todoItem.classList.add('completed');

    const textSpan = document.createElement('span');
    textSpan.textContent = taskText;

    const buttonGroup = document.createElement('div');

    // Tamamla Butonu
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.classList.add('btn', 'btn-success', 'btn-sm', 'me-2');
    completeButton.addEventListener('click', () => {
        todoItem.classList.toggle('completed');
        toggleCompletionInLocalStorage(taskText);
    });

    // Düzenle Butonu
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('btn', 'btn-warning', 'btn-sm', 'me-2');
    editButton.addEventListener('click', () => {
        const newText = prompt('Edit your task:', taskText);
        if (newText) {
            textSpan.textContent = newText;
            editTaskInLocalStorage(taskText, newText);
        }
    });

    // Sil Butonu
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
    deleteButton.addEventListener('click', () => {
        todoList.removeChild(todoItem);
        removeFromLocalStorage(taskText);
    });

    // Butonları Ekle
    buttonGroup.appendChild(completeButton);
    buttonGroup.appendChild(editButton);
    buttonGroup.appendChild(deleteButton);

    todoItem.appendChild(textSpan);
    todoItem.appendChild(buttonGroup);
    todoList.appendChild(todoItem);
}

// Local Storage'a Görev Ekle
function saveToLocalStorage(taskText) {
    let todos = getTodosFromLocalStorage();
    todos.push({ text: taskText, completed: false });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Local Storage'dan Görevleri Yükle
function loadTodos() {
    const todos = getTodosFromLocalStorage();
    todos.forEach(todo => addTaskToList(todo.text, todo.completed));
}

// Local Storage'dan Görev Getir
function getTodosFromLocalStorage() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

// Local Storage'dan Görev Sil
function removeFromLocalStorage(taskText) {
    let todos = getTodosFromLocalStorage();
    todos = todos.filter(todo => todo.text !== taskText);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Görev Tamamlama Durumunu Güncelle
function toggleCompletionInLocalStorage(taskText) {
    let todos = getTodosFromLocalStorage();
    todos = todos.map(todo => {
        if (todo.text === taskText) {
            todo.completed = !todo.completed;
        }
        return todo;
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Görev Düzenle
function editTaskInLocalStorage(oldText, newText) {
    let todos = getTodosFromLocalStorage();
    todos = todos.map(todo => {
        if (todo.text === oldText) {
            todo.text = newText;
        }
        return todo;
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}
