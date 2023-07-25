
// Variables
let section = document.querySelector('.js-index-main');
let images = [];
let imageLeft;
let imageRight;

// Récupération des data json
fetch('../data.json')
    .then(response => response.json())
    .then(data => {
        images = data.images.map(image => image.url);
        new Pictures(section);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération du fichier JSON:', error);
    });


export default class Pictures{
    constructor(el){
        this.el = el;
        this.bindUi();
        this.newImages();
        // this.bindData();
        this.bindEvents();
    }

    bindUi(){
        this.ui = {
            containerLeft: this.el.querySelector('.js-image-container-left'),
            containerRight: this.el.querySelector('.js-image-container-right'),
        }
    }

    // Affichage de 2 images aléatoires
    newImages(){

        let i = Math.floor(Math.random() * images.length);
        let j = Math.floor(Math.random() * images.length);
        if (i != j) {
            // Ajouter une image à gauche
            imageLeft = document.createElement('img');
            imageLeft.src = images[i];
            this.ui.containerLeft.appendChild(imageLeft);
            imageLeft.classList.add('index-main-image');
            
            // Ajouter une image à droite
            imageRight = document.createElement('img');
            imageRight.src = images[j];
            this.ui.containerRight.appendChild(imageRight);
            imageRight.classList.add('index-main-image');
        }
    }

    bindEvents(){
        this.el.addEventListener('click', (event) => {
            if (event.target === imageLeft) {
              this.ui.containerLeft.removeChild(imageLeft);
              this.ui.containerRight.removeChild(imageRight);
              this.newImages();
            } else if (event.target === imageRight) {
              this.ui.containerLeft.removeChild(imageLeft);
              this.ui.containerRight.removeChild(imageRight);
              this.newImages();
            }
          });
    }

}
