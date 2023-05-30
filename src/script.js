//verficar se o cara digitou algo
const inputTask = document.querySelector('#input-new-task')
const btnCreateTask = document.querySelector("#btn-task")
const localStorageKey = "to-do-list"

const validateIfNewTask = () => {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")

  const inputValue = inputTask.value
  let exist = values.find(x => x.name === inputValue) ;return !exist ? false : true
}

const verification = () => {
  if (!inputTask.value) {
    alert("Para que a tarefa seja criada, algo precisa ser digitado.")
  } else if (validateIfNewTask()) {
    alert('Essa tarefa já exite!')
  } else {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    values.push({
      name: inputTask.value
    })
    localStorage.setItem(localStorageKey, JSON.stringify(values) )
  }
  showValues()
  inputTask.value = ""
}

const showValues = () => {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  const list = document.querySelector('#tasks')
  list.innerHTML = ""
  for (let i = 0; i < values.length; i++) {
    list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' onclick='removeItem("${values[i]['name']}")'>ok</button></li>`
  }
}

const removeItem = (data) => {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  let index = values.findIndex(x => x.name === data)
  values.splice(index, 1)
  localStorage.setItem(localStorageKey, JSON.stringify(values) )
  showValues()
}

btnCreateTask.addEventListener('click', verification)

showValues()