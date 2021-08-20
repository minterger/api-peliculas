hljs.highlightAll();

const topButton = document.getElementById('topButton')

function scrollSpy(scrollY) {
  if (scrollY < 120) {
    topButton.classList.add('hide')
  } else { 
    topButton.classList.remove('hide')
  }
  console.log('test');
}

scrollSpy(window.scrollY)

window.addEventListener('scroll', (e) => {
  scrollSpy(window.scrollY)
})