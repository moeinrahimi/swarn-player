const progressBar =()=>{
  let progress = document.querySelector('#player-position')
  return progress
} 
const resetProgressBar =()=>{
  let progress = progressBar()
  progress.style.width = 0
  
} 

export default {resetProgressBar,progressBar}

