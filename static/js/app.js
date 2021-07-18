document.addEventListener('DOMContentLoaded', function () {
    let btnSetting = document.querySelector('#btn_setting')
    let btnResult = document.querySelector('#btn_result')
    let resultForm = document.querySelector('#res')
    let form = document.querySelector('#form')
    let count = document.querySelector('#count')
    let text = document.querySelector('#text')
    let title = document.querySelector('#title')
    let btnSend = document.querySelector('.btn_send')
    let loader = document.querySelector('#loader')
    let ACTIVE_LOADER = 1

    let content = document.querySelector('#content')

    btnSetting.addEventListener('click', function () {
        if (!form.classList.contains('active_form')) {
            btnSetting.classList.add('active__btn')
            btnResult.classList.remove('active__btn')

            form.classList.add('active_form')
            resultForm.classList.remove('active_result')
        }
    })

    btnResult.addEventListener('click', function () {
        if (!resultForm.classList.contains('active_result')) {
            btnSetting.classList.remove('active__btn')
            btnResult.classList.add('active__btn')


            form.classList.remove('active_form')
            resultForm.classList.add('active_result')
        }


        if (!loader.classList.contains('disactive')) {
            loader.classList.remove('disactive')
        }
    })

    $('#title').on('input', function () {
        this.style.height = '1px';
        this.style.height = (this.scrollHeight + 1) + 'px';
    });

    count.addEventListener('input', function (e) {
        if (count.value === 'e') {
            count.value = ""
        }
    })

    btnSend.addEventListener('click', function () {
        if (count.value.trim() === '') {
            count.value = 3
        }
        ACTIVE_LOADER = 1
        let res = {
            'title': title.value.toString(),
            'text': text.value.toString(),
            'num_teasers': count.value
        }

        if (loader.classList.contains('disactive')) {
            loader.classList.remove('disactive')
        }

        btnSetting.classList.remove('active__btn')
        btnResult.classList.add('active__btn')


        form.classList.remove('active_form')
        resultForm.classList.add('active_result')

        console.log(JSON.stringify(res))
        content.innerHTML = ''

        // fetch
        fetch('https://eeeeeee.free.beeceptor.com/tester', {
            method: 'POST',
            headers: {},
            body: JSON.stringify(res)
        }).then(response => response.json())
            .then(result => {
                $('html,body').animate({
                    scrollTop: content
                }, 1000)
                setTimeout(function () {
                    loader.classList.add('disactive')
                    ACTIVE_LOADER = 0
                }, 1000)
                console.log(ACTIVE_LOADER)
                setTimeout(function () {
                    if (ACTIVE_LOADER === 0) {
                        content.innerHTML = render_blocks(result, res)
                    }
                }, 1100)
            })
    })

    function render_blocks(result, res) {
        let blockHtml = "<h4 class=\"title__container\">Тизеры</h4>"
        for (let i = 0; i < res.num_teasers; i++) {
            blockHtml += `
            <div class="block_content">${result[`teaser_${i}`]}</div> 
            `
        }
        console.log(blockHtml)
        return blockHtml
    }
});