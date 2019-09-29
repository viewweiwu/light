import React, { useState, useEffect } from 'react'
import GitHubButton from 'react-github-btn'

function App() {
const getRandom = (min, max) => {
  return Math.floor(Math.random() * 2)
}

const getRandomData = () => {
  let list = []
  for (let i = 0; i < 3; i++) {
    let row = []
    for (let j = 0; j < 3; j++) {
      row.push(getRandom())
    }
    list.push(row)
  }
  return list
}

const [list, setList] = useState(getRandomData())

const handleClick = (i, j) => {
  let newList = [...list]
  toggleItem(newList, i, j)
  // left
  if (j > 0) {
    toggleItem(newList, i, j - 1)
  }
  // right
  if (j < newList[i].length - 1) {
    toggleItem(newList, i, j + 1)
  }
  // top
  if (i > 0) {
    toggleItem(newList, i - 1, j)
  }
  // bottom
  if (i < newList.length - 1) {
    toggleItem(newList, i + 1, j)
  }
  setList(newList)
}

const toggleItem = (newList, i, j) => {
  newList[i][j] = 1^newList[i][j]
}

const checkList = (newList) => {
  for (let i = 0; i < newList.length; i++) {
    for (let j = 0; j < newList[i].length; j++) {
      if (newList[i][j] === 0) {
        return false
      }
    }
  }
  return true
}

const startGame = () => {
  let list = getRandomData()
  setList(list)
}

useEffect(() => {
  let result = checkList(list)
  if (result) {
    alert('win')
  }
}, [list])

return (
  <div className="app">
    <button className="btn-start" onClick={ startGame }>start game</button>
    <div className="content">
      {
        list.map((row, i) => 
          row.map((item, j) => 
            <span key={ `${i}-${j}` } onClick={ () => handleClick(i, j) } className={`item ${item ? 'active' : ''}`}></span>
          )
        )
      }
    </div>
    <div className="btn-github">
      <GitHubButton href="https://github.com/viewweiwu/light" data-size="large" aria-label="Star viewweiwu/light on GitHub">View On Github</GitHubButton>
    </div>
  </div>
)
}

export default App
