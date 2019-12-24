document.addEventListener('DOMContentLoaded', function () {
    let header = document.querySelector('header');
    let prevScroll = pageYOffset;
    let scroll = pageYOffset;
    let hidden = false;

    window.addEventListener('scroll', function () {
        if (!header)
            return;

        scroll = pageYOffset;

        console.log(scroll - prevScroll);

        if ((scroll - prevScroll > 0) && !hidden) {
            header.classList.add('hidden');
            hidden = true;
            prevScroll = scroll
        }

        if ((scroll - prevScroll <= -35) && hidden) {
            header.classList.remove('hidden');
            hidden = false;
            prevScroll = scroll
        }

        prevScroll = scroll
    })
});

document.addEventListener('DOMContentLoaded', function () {
    let marqueeBlocks = document.querySelectorAll('.marquee-block');
    for (let i = 0; i < marqueeBlocks.length; i++){
        createMarqueeBlock(marqueeBlocks[i]);
    }
    let noPaddingMarqueeBlocks = document.querySelectorAll('.no-padding-marquee-block');
    for (let i = 0; i < marqueeBlocks.length; i++){
        createMarqueeBlock(noPaddingMarqueeBlocks[i]);
    }

    function createMarqueeBlock(block) {
        if (!block) return;

        let divs = block.querySelectorAll('div');

        let width = 0;

        let count = 1;

        function resize() {
            width = window.innerWidth;
            if (block)
                block.style.width = `98.6vw`;
        }

        resize();


        for (let i = 0; i < divs.length; i++){
            createMarqueeDiv(divs[i]);
        }

        function createMarqueeDiv(div) {
            if (!div) return;

            document.addEventListener('resize', resize);

            const innerHTML = div.innerHTML;

            function recount() {
                let wrapperWidth = 100;

                const wrapper = div.querySelector('.wrapper');
                if (wrapper)
                    wrapperWidth = wrapper.clientWidth;

                count = width / wrapperWidth + 2;

                div.innerHTML = innerHTML;

                let extender = '';
                for (let i = 0; i < count; i++)
                    extender += div.innerHTML;

                div.innerHTML = extender;
            }

            recount();


            window.addEventListener('resize', recount);
        }

        window.addEventListener('resize', resize);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    let topp = document.getElementById('top');
    let shadowRdclr = document.getElementById('RDCLR-shadow');
    let shadowHome = document.getElementById('HOME-shadow');

    let left = 0;
    let ttop = 0;

    let nLeft = 0;
    let nTop = 0;

    function animate() {
        left += (nLeft - left) / 20;
        ttop += (nTop - ttop) / 20;

        if (shadowHome) {
            shadowHome.style.transform = 'translateY(' + ttop + 'px)' +
                ' translateX(' + left + 'px)';
        }

        if (shadowRdclr) {
            shadowRdclr.style.transform = 'translateY(' + ttop + 'px)' +
                ' translateX(' + left + 'px)';
        }

        requestAnimationFrame(animate);
    }

    topp.addEventListener('mousemove' || 'touchmove', function(event) {
        let centerX = window.innerWidth / 2;
        let centerY = 800 / 2;

        nLeft = -17 * Math.tanh((event.clientX - centerX) / 500);
        nTop = -11 * Math.tanh((event.clientY - centerY) / 100);
    });

    animate();
});

document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form');
    const messageField = document.querySelector('.message-text');
    const overlay = document.querySelector('.overlay');

    if (!messageField || !overlay) return;

    overlay.addEventListener('click', function () {
        document.documentElement.classList.remove('popupActive');
    });

    Array.from(forms).forEach(form => createForm(form, messageField));
});

function createForm(form, mess) {
    const action = form.action;
    const elements = form.elements;

    if (!action || !elements.length) return;

    function validate() {
        let result = true;

        for (let i = 0; elements.length > i; i++) {
            let el = elements[i];

            if (!el.dataset['required']) continue;

            if (el.type === 'email' ||
                el.type === 'tel') {
                if (!el.value) {
                    el.classList.add('error');
                    el.addEventListener('input', () => {
                        el.classList.remove('error')
                    });
                    result = false;
                }
            }

            if (el.type === 'checkbox') {
                if (!el.checked) {
                    el.classList.add('error');
                    el.addEventListener('input', () => {
                        el.classList.remove('error')
                    });
                    result = false;
                }
            }

            if (el.tagName.toLocaleLowerCase() === 'select' && !el.getAttribute('multiply')){
                if (el.selectedIndex === 0){
                    el.value = "student"
                }
            }
        }

        return result;
    }

    let overlay = document.querySelector('.overlay');
    let textmess = document.querySelector('.message-text');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!validate()) {
            overlay.style.display = 'block';
            textmess.innerHTML = '<button></button><b>Ошибка!</b><p>Проверьте корректность<br> вводимых данных</p>';
            let p = textmess.querySelector('p');
            let b = textmess.querySelector('b');
            p.style.color = "#EC3332";
            b.style.color = "#EC3332";
            document.body.style.overflow = "hidden";

            let button = textmess.querySelector('button');
            button.addEventListener('click', function () {
                overlay.style.display = 'none';
                document.body.style.overflow = "scroll";
            })
        }
        else
        {
            overlay.style.display = 'block';
            textmess.innerHTML = '<button></button><b>Поздравляем!</b><p>Вы записались<br> на RDCLR.HOME</p>';
            textmess.style.color = "#000000";
            document.body.style.overflow = "hidden";

            let button = textmess.querySelector('button');
            button.addEventListener('click', function () {
                overlay.style.display = 'none';
                document.body.style.overflow = "scroll";
            });

        }

    })
}

document.addEventListener('DOMContentLoaded', function () {
    let button = document.querySelector('button');
    let menu = document.querySelector('nav');
    let action = false;

    button.addEventListener('click', function() {
        if (action === false) {
            if (menu) menu.classList.add('active');
            if (button) button.classList.add('active');
            action = true;
            document.body.style.overflow = 'hidden';
        } else {
            if (menu) menu.classList.remove('active');
            if (button) button.classList.remove('active');
            document.body.style.overflow = 'scroll';
            action = false;
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const sliders = document.querySelectorAll('.slider');

    for (let i = 0; i < sliders.length; i++) {
        createSlider(sliders[i]);
    }

    function createSlider(slider) {
        const slides = slider.querySelectorAll('.slide');

        if (slides.length < 2) return;

        const wrapper = slider.querySelector('.slider-wrapper');
        const prevButton = slider.querySelector('.button-prev');
        const nextButton = slider.querySelector('.button-next');
        const sliderCounter = slider.querySelector('.slider-counter');

        if (!prevButton && !nextButton) return;

        let width = 0;

        function resize() {
            width = slider.clientWidth;
        }

        resize();

        let activeSlide = 0;

        slides[activeSlide].classList.add('active');

        if (sliderCounter) sliderCounter.innerHTML =`<p><span>${activeSlide + 1}</span>&nbsp;/&nbsp;${slides.length}</p>`;

        if (prevButton) prevButton.addEventListener('click', function () {
            console.log(width);
            activeSlide--;

            if (activeSlide < 0) activeSlide = slides.length - 1;

            if (sliderCounter) sliderCounter.innerHTML =`<p><span style="color: #EC3332">${activeSlide + 1}</span>&nbsp;/&nbsp;${slides.length}</p>`;

            wrapper.style.transform = `translate3d(-${width * activeSlide}px, 0, 0)`;
            console.log(width * activeSlide);
        });

        if (nextButton) nextButton.addEventListener('click', function () {

            activeSlide++;
            console.log(width);

            if (activeSlide > slides.length - 1) activeSlide = 0;

            if (sliderCounter) sliderCounter.innerHTML =`<p><span style="color: #EC3332">${activeSlide + 1}</span>&nbsp;/&nbsp;${slides.length}</p>`;

            wrapper.style.transform = `translate3d(-${width * activeSlide}px, 0, 0)`;
        });

        document.addEventListener('resize', resize);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    let video = document.querySelector('.video');
    let playbtn = video.querySelector('.video_button');
    let mask = video.querySelector('img');
    let  divc = video.querySelector('.play');
    let vid = document.getElementById('vid');

    if (!video || !playbtn || !mask || !divc || !vid) return;

    playbtn.addEventListener('click',function () {
            mask.style.display = 'none';
            divc.style.display = 'none';
            if (vid.paused)
            {
                vid.play();
            }
            else
            {   vid.load();
                vid.play();
            }

            vid.onpause = function(){
                mask.style.display = 'block';
                divc.style.display = 'block';
            }
    });

});
