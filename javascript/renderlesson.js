console.log(document.URL);
var lesson = localStorage.getItem("lesson");
var heading = document.getElementById("lesson-title");
var baseImg = document.getElementById("base-pic");
var onTopImg = document.getElementById("on-top-pic");
var textContent = document.getElementById("text-content");
function getLessonData(lessonUrl) {  
    fetch("/api/v1/library/lesson/"+lessonUrl)
    .then(response => response.json())
    .then(data => {
        heading.innerHTML = data.lesson_title;
        textContent.innerHTML = data.text_content;
        baseImg.src = data.base_url;
        onTopImg.src = data.on_top_url;
        baseImg.alt = data.base_alt;
        onTopImg.alt = data.on_top_alt;
    });
}

getLessonData(lesson)