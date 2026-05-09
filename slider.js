const slider = document.querySelector('.container-slider');

document.querySelector('.next').addEventListener('click', () => {
    slider.scrollBy({
        left: 370,
        behavior: 'smooth'
    });
});

document.querySelector('.prev').addEventListener('click', () => {
    slider.scrollBy({
        left: -370,
        behavior: 'smooth'
    });
});