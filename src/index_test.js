// Begin setup

const mainNode = document.getElementById('main')
const toggleNode = document.getElementById('toggle')

toggleNode.addEventListener('click', function() {
    mainNode.classList.toggle('--blue')
})

// End setup

function callback(mutationsList, observer) {
    console.log('Mutations:', mutationsList)
    console.log('Observer:', observer)
    mutationsList.forEach(mutation => {
        if (mutation.attributeName === 'class') {
            alert('Ch-ch-ch-changes!')
        }
    })
}

const mutationObserver = new MutationObserver(callback)

mutationObserver.observe(mainNode, { attributes: true })
