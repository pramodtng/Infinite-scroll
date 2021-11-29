const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

const count = 10;
const apiKey = '85q3hKS9v8bnzGjz-PIcFxU4rHGl82XBoG9YZ8O2_yo';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(element, atrributes){
    for (const key in atrributes){
        element.setAttribute(key, atrributes[key]);
    }
}

// Display photos to the DOM.
function displayPhotos(){
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


//Fetch photos from the Unsplash.
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        // console.log(photosArray);
    }
    catch (error) {
        console.log(error);
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
      getPhotos();
      console.log('load more');
    }
  });
getPhotos();