const lockPage = document.getElementById("lock-page");
const passwordInput = document.getElementById("password-input");
const togglePass = document.getElementById("toggle-pass");
const unlockBtn = document.getElementById("unlock-btn");
const errorMsg = document.getElementById("error-msg");
const PASSWORD = "kyr";

// Header
const header = document.querySelector(".header");
header.style.display = "none"; // hidden initially

// Toggle password visibility
togglePass.onclick = () => {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
};

// Unlock page
unlockBtn.onclick = () => {
    if(passwordInput.value === PASSWORD){
        lockPage.style.display = "none";
    } else {
        errorMsg.textContent = "Incorrect password!";
        passwordInput.value = "";
    }
};

// Surprise box
const giftBox = document.getElementById("giftBox");
const surprise = document.getElementById("surprise");
const book = document.getElementById("book");
const pages = document.querySelectorAll(".page");

giftBox.onclick = () => {
    giftBox.style.transition = "transform 2s ease, opacity 2s ease";
    giftBox.style.transform = "scale(1.5) rotate(360deg)";
    giftBox.style.opacity = "0";

    // Show header now
    header.style.display = "block";
    setTimeout(() => header.classList.add("show"), 50);

    heartRain();

    setTimeout(()=>{
        surprise.style.display = "none";
        book.style.display = "block";
        revealPages();
    },2000);
};

// Header hide/show on scroll
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
    let st = window.scrollY;
    if(header.style.display !== "none"){
        if(st > lastScrollTop && st > 50){
            header.classList.remove("show");
        } else {
            header.classList.add("show");
        }
    }
    lastScrollTop = st <= 0 ? 0 : st;
});

// Heart rain
function heartRain(){
    const heartCount = 150;
    for(let i=0;i<heartCount;i++){
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.textContent = "❤";
        heart.style.left = Math.random()*window.innerWidth + "px";
        heart.style.top = Math.random()*window.innerHeight + "px";
        heart.style.fontSize = 12+Math.random()*24 + "px";
        heart.style.opacity = 1;
        heart.style.zIndex = 50;
        heart.style.pointerEvents = "none";
        heart.style.transition = "transform 2s ease-out, opacity 2s ease-out";
        document.body.appendChild(heart);
        setTimeout(()=>{
            heart.style.transform = `translateY(-${150 + Math.random()*200}px) scale(${0.5 + Math.random()}) rotate(${Math.random()*360}deg)`;
            heart.style.opacity = 0;
        },50);
        setTimeout(()=>heart.remove(),2000);
    }
}

// Reveal pages
function revealPages(){
    const trigger = window.innerHeight * 0.85;
    let lastPageVisible = false;
    pages.forEach((page,index)=>{
        if(page.getBoundingClientRect().top < trigger){
            page.style.transition = "all 2s ease";
            page.classList.add("visible");
            if(index === pages.length-1){
                lastPageVisible = true;
            }
        }
    });
    // Reveal video surprise
    if(lastPageVisible){
        const videoSurprise = document.querySelector(".video-surprise");
        if(videoSurprise){
            videoSurprise.style.display = "flex";
            videoSurprise.style.transition = "all 2s ease";
        }
    }
}

window.addEventListener("scroll",revealPages);
window.addEventListener("load",revealPages);

// Floating hearts
function createHeart(){
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "❤";
    heart.style.left = Math.random()*window.innerWidth + "px";
    heart.style.fontSize = 12+Math.random()*18 + "px";
    heart.style.transition = "transform 2s ease-out, opacity 2s ease-out";
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),2000);
}
setInterval(createHeart,500);

// Video surprise
const videoBox = document.getElementById("videoBox");
const videoContainer = document.getElementById("videoContainer");

if(videoBox){
    videoBox.onclick = () => {
        videoBox.style.transition = "transform 2s ease, opacity 2s ease";
        videoBox.style.display = "none";

        // Show video without scaling
        videoContainer.classList.add("show");

        const video = videoContainer.querySelector("video");
        video.play();

        video.onended = () => {
            videoContainer.classList.remove("show");

            videoBox.style.display = "flex";
            videoBox.style.transition = "transform 2s ease, opacity 2s ease";
            videoBox.style.transform = "scale(1) rotate(0deg)";
        };
    };
}