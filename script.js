const video = document.querySelector("#video")
const input = document.querySelector("#video-link")
const button = document.querySelector("button")

button.addEventListener("click", () => {
    fetch("/api", {
        method: "POST", body: JSON.stringify({
            url: input.value
        }), headers: {
            "Content-Type": "application/json",
        }

    })
        .then(data => data.json())
        .then((data) => {
            video.src = data.video.url
            video.play()
            console.log(data.video.url)
        })
})
