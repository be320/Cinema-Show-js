var myReview = document.getElementById("my-review-div");
var reviewBtn = document.getElementById("review-button");
var authForm = document.getElementById("form-container");
var authButton = document.getElementById("cat-auth");
var cancelReview = document.getElementById("cancel-review");
var starsContainer = document.getElementById("stars");
var email = document.getElementById("auth-txt-email");
var password = document.getElementById("auth-txt-password");
var name = document.getElementById("auth-txt-name");
var loginForm = document.getElementById("login-form-body");
var signupForm = document.getElementById("signup-form-body");
var switchToSignUp = document.getElementById("switchToSignUp");
var switchToLogin = document.getElementById("switchToLogin");
var reviewTextArea = document.getElementById("review-textarea");
var stars = [];
var rated = false;
var rate_num = 0;

authButton.onclick = function() {
  name.value = "";
  email.value = "";
  password.value = "";
  authForm.style.display = "block";
};

switchToLogin.onclick = function() {
  name.value = "";
  email.value = "";
  password.value = "";
  signupForm.style.display = "none";
  loginForm.style.display = "block";
};

switchToSignUp.onclick = function() {
  name.value = "";
  email.value = "";
  password.value = "";
  loginForm.style.display = "none";
  signupForm.style.display = "block";
};

window.onclick = function(event) {
  if (event.target == authForm) {
    authForm.style.display = "none";
  } else if (event.target == myReview) {
    myReview.style.display = "none";
  }
};

for (let i = 0; i < 10; i++) {
  stars[i] = document.getElementById("star_" + i);
  stars[i].style.cursor = "pointer";
}

for (let i = 0; i < 10; i++) {
  stars[i].onclick = function() {
    rate_num = i + 1;
    console.log(i + 1);
    rated = true;
    for (let j = 0; j <= i; j++) {
      stars[j].style.color = "orange";
    }
    for (let j = i + 1; j < 10; j++) {
      stars[j].style.color = "gray";
    }
  };

  stars[i].onmouseover = function() {
    for (let j = 0; j <= i; j++) {
      if (rated === false) {
        stars[j].style.color = "orange";
      }
    }
  };

  stars[i].onmouseleave = function() {
    for (let j = i; j < 10; j++) {
      if (rated === false) {
        stars[j].style.color = "gray";
      }
    }
  };
}

cancelReview.onclick = function() {
  myReview.style.display = "none";
};

reviewBtn.onclick = function() {
  reviewTextArea.value = "";
  for (let i = 0; i < 10; i++) {
    stars[i].style.color = "gray";
  }
  myReview.style.display = "block";
};

starsContainer.onmouseleave = function() {
  for (let i = 0; i < 10; i++) {
    if (rated === false) {
      stars[i].style.color = "gray";
    }
  }
};
