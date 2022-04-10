function ajax(config) {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", config.url, true)

    xhr.onload = e => {
        if (xhr.status === 200) {
            config.sucess(xhr.response)
        } else if (xhr.status >= 400) {
            config.error({
                code: xhr.status,
                text: xhr.statusText
            })
        }
    }

    xhr.send()
}

ajax({
    url:"data/animes.json",
    method: "GET",
    sucess(resp) {
        const animes = JSON.parse(resp)

        const rows = animes.map(anime => {
            const tdTitle = document.createElement('td')
            tdTitle.innerHTML = anime.title.text

            const tdStudio = document.createElement('td')
            tdStudio.innerHTML = anime.studio

            const tr = document.createElement('tr')

            tr.appendChild(tdTitle)
            tr.appendChild(tdStudio)
            return tr
        })

        const table = document.querySelector('table')
        rows.forEach(row => table.appendChild(row))
        const div = document.querySelector('div')
        div.appendChild(table)
    },
    error(e) {
        const msg = document.createElement(`${e.code}: ${e.text}`)
        document.body.appendChild(msg)
    }
})