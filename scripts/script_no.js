var count = 0;
var random_count = 2;
var sound = new Audio("./curcuit.mp3");
var call_tm = 0;
var calling = true;
var cont_c = 0;
var record = new Array(0);

var number = new Array(
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18
);
var cont_n;

$(function () {
  $("a").click(function () {
    location.href = $(this).attr("href");
    return false;
  });
  setSwipe("#cont9");
  setSwipe("#cont10");
  setSwipe("#cont11");
  setSlide(".slide-call-icon-wrap");
  setSlide(".slide-call-icon-wrap2");
  setSlide(".slide-call-icon-wrap3");
  number.sort(() => Math.random() - 0.5);
  number.unshift(0);
  console.log(number);
}); //ホーム追加でsafari起動させない

function slideshow_timer() {
  if (cont_c == 1) {
    $(".start-btn").addClass("none");
    $(".main-cont").removeClass("none");
  }
  count++;
  if (count > random_count) {
    sound.repeat = true;
    sound.addEventListener("ended", function () {
      if (!!this.repeat) {
        this.play();
      }
    });
    $("#cont" + number[cont_c]).removeClass("none");
    if (number[cont_c] == 14 || number[cont_c] == 15) {
      $("body").css({ "background-color": "rgb(0,0,0,0.3)" });
    }
    sound.play();
    timeCount();
    return;
  }
  setTimeout("slideshow_timer()", 1000);
}

function timeCount() {
  if (calling) {
    call_tm += 1;
    setTimeout("timeCount()", 10);
  }
}

function stopSound(n) {
  sound.repeat = false;
  sound.pause();
  if (calling) {
    record.push(call_tm / 100);
  }
  calling = false;
  
  if (number[cont_c] == 14 || number[cont_c] == 15) {
    $("body").css({ "background-color": "rgb(0,0,0,0)" });
  } else if (number[cont_c] > 16) {
    $("#cont" + number[cont_c]).css({ width: "100vw" });
  }
  $(".only-icon-wrap").removeClass("none");

  if (n == "0") {
    document.getElementById("call_name" + number[cont_c]).innerHTML = "拒否";
    reset();
  } else if (n == "1") {
    document.getElementById("call_name" + number[cont_c]).innerHTML = "応答";
    $("#cont" + number[cont_c]).removeClass("call-cont-button");
    $("#cont" + number[cont_c]).removeClass("call-cont-sw");
    $("#cont" + number[cont_c]).removeClass("rl-slide");
    $("#cont" + number[cont_c]).removeClass("call-cont-bn");
    $("#cont" + number[cont_c]).removeClass("call-cont-icon");
    $("#cont" + number[cont_c]).addClass("call-cont1");
    $(".reset").removeClass("none");
    document.getElementById("call_time" + number[cont_c]).innerHTML =
    call_tm / 100;
  } else {
    document.getElementById("call_name" + number[cont_c]).innerHTML = "その他";
  }
}

function reset() {
  $("#cont" + number[cont_c]).addClass("none");
  $(".reset").addClass("none");
  count = 0;
  random_count = Math.round(Math.random() * 20) + 40; //* 幅 )+ 最小
  console.log(random_count);
  call_tm = 0;
  calling = true;
  sound.currentTime = 0;
  if (cont_c < 18) {
    //デザイン個数入力
    cont_c += 1;
    if (cont_c != 1) {
      slideshow_timer();
    }
  } else {
    record.shift(); //先頭（test）を削除
    document.getElementById("reco").innerHTML = "終わり<br/>" + record;
  }
}

//上下
function setSwipe(elem) {
  let t = document.querySelector(elem);
  let startX; // タッチ開始 x座標
  let startY; // タッチ開始 y座標
  let moveX; // スワイプ中の x座標
  let moveY; // スワイプ中の y座標
  let dist = 50; // スワイプを感知する最低距離（ピクセル単位）

  // タッチ開始時： xy座標を取得
  t.addEventListener("touchstart", function (e) {
    e.preventDefault();
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
  });

  // スワイプ中： xy座標を取得
  t.addEventListener("touchmove", function (e) {
    e.preventDefault();
    moveX = e.changedTouches[0].pageX;
    moveY = e.changedTouches[0].pageY;
  });

  // タッチ終了時： スワイプした距離から左右どちらにスワイプしたかを判定する/距離が短い場合何もしない
  t.addEventListener("touchend", function (e) {
    if (startY > moveY && startY > moveY + dist) {
      // 下から上にスワイプ
      stopSound(0);
    } else if (startY < moveY && startY + dist < moveY) {
      // 上から下にスワイプ
      stopSound(1);
    }
  });
}

//左右
function setSlide(elem) {
  let t = document.querySelector(elem);
  let pos = document.getElementById(elem);
  let startX; // タッチ開始 x座標
  let startY; // タッチ開始 y座標
  let moveX; // スワイプ中の x座標
  let moveY; // スワイプ中の y座標
  let dist = 50; // スワイプを感知する最低距離（ピクセル単位）

  // タッチ開始時： xy座標を取得
  t.addEventListener("touchstart", function (e) {
    e.preventDefault();
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
  });

  // スワイプ中： xy座標を取得
  t.addEventListener("touchmove", function (e) {
    e.preventDefault();
    moveX = e.changedTouches[0].pageX;
    moveY = e.changedTouches[0].pageY;
    if (moveX < 289 && number[cont_c] == 11) {
      document.getElementById("icon-1").style.left = moveX - 40 + "px";
    }
    if (moveX < 330 && moveX > 80) {
      if (number[cont_c] == 12) {
        document.getElementById("icon-2").style.left = moveX - 40 + "px";
      } else if (number[cont_c] == 13) {
        document.getElementById("icon-3").style.left = moveX - 40 + "px";
      } else if (number[cont_c] == 17) {
        document.getElementById("icon-4").style.left = moveX - 40 + "px";
      }
    }
  });

  // タッチ終了時： スワイプした距離から左右どちらにスワイプしたかを判定する/距離が短い場合何もしない
  t.addEventListener("touchend", function (e) {
      if(number[cont_c] == 17){
        if (startX < moveX && startX + 20 < moveX) {
            // 左から右にスワイプ
            stopSound(1);
          }else{
              stopSound(0);
          }
      }
      else{
        if (startX > moveX && startX > moveX + dist) {
            stopSound(0);
            // 右から左にスワイプ
          } else if (startX < moveX && startX + 20 < moveX) {
            // 左から右にスワイプ
            stopSound(1);
          }
      }
  });
}

var iconbar_wid;
function spreadIcon() {
  if (number[cont_c] == 17) {
    iconbar_wid = "300px";
    setSlide(".only-icon-wrap");
  } else {
    iconbar_wid = "380px";
    $(".only-icon-wrap").addClass("none");
    $(".only-stop-icon-wrap").removeClass("none");
  }
  $("#cont" + number[cont_c]).css({ width: iconbar_wid });
  $("#call_name" + number[cont_c]).css({ opacity: 1 });
}
