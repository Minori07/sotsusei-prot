//= require serviceworker-companion #追加
$(function () {
  $("a").click(function () {
    location.href = $(this).attr("href");
    return false;
  });
});

var count = 0;
var random_count = Math.round(Math.random() * 6) + 4; //* 幅 )+ 最小
// slideshow_timer();
var sound = new Audio("./curcuit.mp3");
var call_tm = 0;
var calling = true;
var cont = new Array(".call-cont1", ".call-cont2");
var cont_c = 0;

console.log(random_count);

function slideshow_timer() {
  count++;
  // console.log(count);
  if (count > 2) {
    sound.repeat = true;
    sound.addEventListener("ended", function () {
      if (!!this.repeat) {
        this.play();
      }
    });
    $(cont[cont_c]).css({ visibility: "visible" });
    sound.play();
    timeCount();
    return;
  }
  setTimeout("slideshow_timer()", 1000);
}

function timeCount() {
  if (calling) {
    call_tm += 1;
    // console.log(call_tm);
    setTimeout("timeCount()", 10);
  }
}

function stopSound(n) {
  sound.repeat = false;
  sound.pause();
  calling = false;
  if (n == "0") {
    document.getElementById("call_name" + cont_c).innerHTML = "拒否";
  } else if (n == "1") {
    document.getElementById("call_name" + cont_c).innerHTML = "応答";
  } else {
    document.getElementById("call_name" + cont_c).innerHTML = "その他";
  }

  document.getElementById("call_time" + cont_c).innerHTML = call_tm / 100;
  $(".reset").css({ visibility: "visible" });
}

function reset() {
  $(cont[cont_c]).css({ visibility: "hidden" });
  $(".reset").css({ visibility: "hidden" });
  count = 0;
  random_count = Math.round(Math.random() * 6) + 4;
  console.log(random_count);
  call_tm = 0;
  calling = true;
  sound.currentTime = 0;
  cont_c = 1;
}
