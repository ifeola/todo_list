const ongoingTodos = document.querySelector(".ongoing__todos .todos");
const completedTodos = document.querySelector(".completed__todos .todos");
let todoInput = document.querySelector("#todo__input");
const todoForm = document.querySelector("#todo__form");
const addTodoBtn = document.querySelector(".add__todo-btn");
const todoModal = document.querySelector(".add__todo-bg");

// create Todo object
//

class Todo {
	constructor(title, id, status) {
		this.title = title;
		this.id = id;
		this.status = status;
	}
}

class UI {
	static addTodoToOngoing(todo) {
		const todoElement = document.createElement("li");
		todoElement.classList.add("todo");
		todoElement.setAttribute("id", todo.id);
		todoElement.setAttribute("aria-label", todo.status);
		todoElement.innerHTML = `
				<label class="todo__content">
					<input type="checkbox" class="checkbox" />
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							opacity="0.4"
							d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
						<path
							class="checked"
							d="M10.5799 15.58C10.3799 15.58 10.1899 15.5 10.0499 15.36L7.21994 12.53C6.92994 12.24 6.92994 11.76 7.21994 11.47C7.50994 11.18 7.98994 11.18 8.27994 11.47L10.5799 13.77L15.7199 8.62998C16.0099 8.33998 16.4899 8.33998 16.7799 8.62998C17.0699 8.91998 17.0699 9.39998 16.7799 9.68998L11.1099 15.36C10.9699 15.5 10.7799 15.58 10.5799 15.58Z" />
					</svg>
					<h4 class="todo__title">${todo.title}</h4>
				</label>
				<div class="btns">
					<button class="btn delete__btn">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M21.07 5.23C19.46 5.07 17.85 4.95 16.23 4.86V4.85L16.01 3.55C15.86 2.63 15.64 1.25 13.3 1.25H10.68C8.35004 1.25 8.13003 2.57 7.97004 3.54L7.76004 4.82C6.83004 4.88 5.90004 4.94 4.97004 5.03L2.93004 5.23C2.51004 5.27 2.21004 5.64 2.25004 6.05C2.29004 6.46 2.65004 6.76 3.07004 6.72L5.11004 6.52C10.35 6 15.63 6.2 20.93 6.73C20.96 6.73 20.98 6.73 21.01 6.73C21.39 6.73 21.72 6.44 21.76 6.05C21.79 5.64 21.49 5.27 21.07 5.23Z" />
							<path
								opacity="0.3991"
								d="M19.23 8.14C18.99 7.89 18.66 7.75 18.32 7.75H5.67999C5.33999 7.75 4.99999 7.89 4.76999 8.14C4.53999 8.39 4.40999 8.73 4.42999 9.08L5.04999 19.34C5.15999 20.86 5.29999 22.76 8.78999 22.76H15.21C18.7 22.76 18.84 20.87 18.95 19.34L19.57 9.09C19.59 8.73 19.46 8.39 19.23 8.14Z" />
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M9.57996 17C9.57996 16.5858 9.91574 16.25 10.33 16.25H13.66C14.0742 16.25 14.41 16.5858 14.41 17C14.41 17.4142 14.0742 17.75 13.66 17.75H10.33C9.91574 17.75 9.57996 17.4142 9.57996 17Z" />
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M8.75 13C8.75 12.5858 9.08579 12.25 9.5 12.25H14.5C14.9142 12.25 15.25 12.5858 15.25 13C15.25 13.4142 14.9142 13.75 14.5 13.75H9.5C9.08579 13.75 8.75 13.4142 8.75 13Z" />
						</svg>
					</button>
					<button class="btn edit__btn">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								opacity="0.4"
								d="M15.48 3H7.52C4.07 3 2 5.06 2 8.52V16.47C2 19.94 4.07 22 7.52 22H15.47C18.93 22 20.99 19.94 20.99 16.48V8.52C21 5.06 18.93 3 15.48 3Z" />
							<path
								d="M21.0205 2.98003C19.2305 1.18003 17.4805 1.14003 15.6405 2.98003L14.5105 4.10003C14.4105 4.20003 14.3805 4.34003 14.4205 4.47003C15.1205 6.92003 17.0805 8.88003 19.5305 9.58003C19.5605 9.59003 19.6105 9.59003 19.6405 9.59003C19.7405 9.59003 19.8405 9.55003 19.9105 9.48003L21.0205 8.36003C21.9305 7.45003 22.3805 6.58003 22.3805 5.69003C22.3805 4.79003 21.9305 3.90003 21.0205 2.98003Z" />
							<path
								d="M17.8601 10.4201C17.5901 10.2901 17.3301 10.1601 17.0901 10.0101C16.8901 9.89009 16.6901 9.76009 16.5001 9.62009C16.3401 9.52009 16.1601 9.37009 15.9801 9.22009C15.9601 9.21009 15.9001 9.16009 15.8201 9.08009C15.5101 8.83009 15.1801 8.49009 14.8701 8.12009C14.8501 8.10009 14.7901 8.04009 14.7401 7.95009C14.6401 7.84009 14.4901 7.65009 14.3601 7.44009C14.2501 7.30009 14.1201 7.10009 14.0001 6.89009C13.8501 6.64009 13.7201 6.39009 13.6001 6.13009C13.4701 5.85009 13.3701 5.59009 13.2801 5.34009L7.9001 10.7201C7.5501 11.0701 7.2101 11.7301 7.1401 12.2201L6.7101 15.2001C6.6201 15.8301 6.7901 16.4201 7.1801 16.8101C7.5101 17.1401 7.9601 17.3101 8.4601 17.3101C8.5701 17.3101 8.6801 17.3001 8.7901 17.2901L11.7601 16.8701C12.2501 16.8001 12.9101 16.4701 13.2601 16.1101L18.6401 10.7301C18.3901 10.6501 18.1401 10.5401 17.8601 10.4201Z" />
						</svg>
					</button>
				</div>
		`;
		ongoingTodos.appendChild(todoElement);
	}

	static addTodoToCompleted(todo) {
		const todoElement = document.createElement("li");
		todoElement.classList.add("todo");
		todoElement.setAttribute("id", todo.id);
		todoElement.setAttribute("aria-label", todo.status);
		todoElement.innerHTML = `
				<label class="todo__content">
					<input type="checkbox" class="checkbox" />
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							opacity="0.4"
							d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
						<path
							class="checked"
							d="M10.5799 15.58C10.3799 15.58 10.1899 15.5 10.0499 15.36L7.21994 12.53C6.92994 12.24 6.92994 11.76 7.21994 11.47C7.50994 11.18 7.98994 11.18 8.27994 11.47L10.5799 13.77L15.7199 8.62998C16.0099 8.33998 16.4899 8.33998 16.7799 8.62998C17.0699 8.91998 17.0699 9.39998 16.7799 9.68998L11.1099 15.36C10.9699 15.5 10.7799 15.58 10.5799 15.58Z" />
					</svg>
					<h4 class="todo__title">${todo.title}</h4>
				</label>
				<div class="btns">
					<button class="btn delete__btn">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M21.07 5.23C19.46 5.07 17.85 4.95 16.23 4.86V4.85L16.01 3.55C15.86 2.63 15.64 1.25 13.3 1.25H10.68C8.35004 1.25 8.13003 2.57 7.97004 3.54L7.76004 4.82C6.83004 4.88 5.90004 4.94 4.97004 5.03L2.93004 5.23C2.51004 5.27 2.21004 5.64 2.25004 6.05C2.29004 6.46 2.65004 6.76 3.07004 6.72L5.11004 6.52C10.35 6 15.63 6.2 20.93 6.73C20.96 6.73 20.98 6.73 21.01 6.73C21.39 6.73 21.72 6.44 21.76 6.05C21.79 5.64 21.49 5.27 21.07 5.23Z" />
							<path
								opacity="0.3991"
								d="M19.23 8.14C18.99 7.89 18.66 7.75 18.32 7.75H5.67999C5.33999 7.75 4.99999 7.89 4.76999 8.14C4.53999 8.39 4.40999 8.73 4.42999 9.08L5.04999 19.34C5.15999 20.86 5.29999 22.76 8.78999 22.76H15.21C18.7 22.76 18.84 20.87 18.95 19.34L19.57 9.09C19.59 8.73 19.46 8.39 19.23 8.14Z" />
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M9.57996 17C9.57996 16.5858 9.91574 16.25 10.33 16.25H13.66C14.0742 16.25 14.41 16.5858 14.41 17C14.41 17.4142 14.0742 17.75 13.66 17.75H10.33C9.91574 17.75 9.57996 17.4142 9.57996 17Z" />
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M8.75 13C8.75 12.5858 9.08579 12.25 9.5 12.25H14.5C14.9142 12.25 15.25 12.5858 15.25 13C15.25 13.4142 14.9142 13.75 14.5 13.75H9.5C9.08579 13.75 8.75 13.4142 8.75 13Z" />
						</svg>
					</button>
					<button class="btn edit__btn">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								opacity="0.4"
								d="M15.48 3H7.52C4.07 3 2 5.06 2 8.52V16.47C2 19.94 4.07 22 7.52 22H15.47C18.93 22 20.99 19.94 20.99 16.48V8.52C21 5.06 18.93 3 15.48 3Z" />
							<path
								d="M21.0205 2.98003C19.2305 1.18003 17.4805 1.14003 15.6405 2.98003L14.5105 4.10003C14.4105 4.20003 14.3805 4.34003 14.4205 4.47003C15.1205 6.92003 17.0805 8.88003 19.5305 9.58003C19.5605 9.59003 19.6105 9.59003 19.6405 9.59003C19.7405 9.59003 19.8405 9.55003 19.9105 9.48003L21.0205 8.36003C21.9305 7.45003 22.3805 6.58003 22.3805 5.69003C22.3805 4.79003 21.9305 3.90003 21.0205 2.98003Z" />
							<path
								d="M17.8601 10.4201C17.5901 10.2901 17.3301 10.1601 17.0901 10.0101C16.8901 9.89009 16.6901 9.76009 16.5001 9.62009C16.3401 9.52009 16.1601 9.37009 15.9801 9.22009C15.9601 9.21009 15.9001 9.16009 15.8201 9.08009C15.5101 8.83009 15.1801 8.49009 14.8701 8.12009C14.8501 8.10009 14.7901 8.04009 14.7401 7.95009C14.6401 7.84009 14.4901 7.65009 14.3601 7.44009C14.2501 7.30009 14.1201 7.10009 14.0001 6.89009C13.8501 6.64009 13.7201 6.39009 13.6001 6.13009C13.4701 5.85009 13.3701 5.59009 13.2801 5.34009L7.9001 10.7201C7.5501 11.0701 7.2101 11.7301 7.1401 12.2201L6.7101 15.2001C6.6201 15.8301 6.7901 16.4201 7.1801 16.8101C7.5101 17.1401 7.9601 17.3101 8.4601 17.3101C8.5701 17.3101 8.6801 17.3001 8.7901 17.2901L11.7601 16.8701C12.2501 16.8001 12.9101 16.4701 13.2601 16.1101L18.6401 10.7301C18.3901 10.6501 18.1401 10.5401 17.8601 10.4201Z" />
						</svg>
					</button>
				</div>
		`;
		ongoingTodos.appendChild(todoElement);
	}

	static getTodo() {
		const todos = Store.getTodoList();
		todos.ongoing.forEach((todo) => {
			UI.addTodoToOngoing(todo);
		});
	}
}

class Store {
	static getTodoList() {
		let todos = JSON.parse(localStorage.getItem("todos")) || {
			completed: [],
			ongoing: [],
		};
		return todos;
	}

	static storeTodo(todo) {
		let todos = Store.getTodoList();

		let updateTodos = { ...todos, ongoing: [...todos.ongoing, todo] };

		localStorage.setItem("todos", JSON.stringify(updateTodos));
	}

	static addTodo() {
		const todos = Store.getTodoList();
		todos.forEach((todo) => {
			UI.addTodoToOngoing(todo);
		});
	}
}

// Toggle Add Todo Form
addTodoBtn.addEventListener("click", () => {
	todoModal.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", UI.getTodo);

// Get Todo Input
todoForm.addEventListener("submit", (e) => {
	e.preventDefault();
	if (!todoInput.value == "") {
		let todoInputValue = todoInput.value;
		let id = new Date().getTime();
		const todo = new Todo(todoInputValue, id, "ongoing");
		UI.addTodoToOngoing(todo);
		Store.storeTodo(todo);

		// clear input field after submiting
		todoInput.value = "";
	}

	todoModal.classList.remove("active");
});

// To add todo to completed
// 1. clicking on the checkbox changes the statuc from ongoing to completed
// 2. removing the todo from ongoing and adding to completed
// 3. displaying the todo in UI