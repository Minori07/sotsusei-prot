var count = 0;
var random_count = 2;
var sound = new Audio("./curcuit.mp3");
var call_tm = 0;
var calling = true;
var cont_c = 0;
var record = new Array(0);
var img_c = 0;
var mtgi_Imgs = new Array(
  "./mtgi/mtgi-a2.png",
  "./mtgi/mtgi-3.png",
  "./mtgi/mtgi-a3.png",
  "./mtgi/mtgi-1.png",
  "./mtgi/mtgi-a1.png"
);

$(function () {
  $("a").click(function () {
    location.href = $(this).attr("href");
    return false;
  });
  console.log(random_count);
  setSwipe("#cont9");
  setSwipe("#cont10");
  setSwipe("#cont11");
  setSlide(".slide-call-icon-wrap");
  setSlide(".slide-call-icon-wrap2");
  setSlide(".slide-call-icon-wrap3");
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
    $("#cont" + cont_c).removeClass("none");
    if (cont_c == 14 || cont_c == 15) {
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
  console.log(cont_c);
  sound.repeat = false;
  sound.pause();
  if (calling) {
    record.push(call_tm / 100);
  }
  calling = false;
  $("#cont" + cont_c).removeClass("call-cont-button");
  $("#cont" + cont_c).removeClass("call-cont-sw");
  $("#cont" + cont_c).removeClass("rl-slide");
  $("#cont" + cont_c).removeClass("call-cont-bn");
  $("#cont" + cont_c).removeClass("call-cont-icon");
  $("#cont" + cont_c).addClass("call-cont1");
  if (cont_c == 14 || cont_c == 15) {
    $("body").css({ "background-color": "rgb(0,0,0,0)" });
  } else if (cont_c > 16) {
    $("#cont" + cont_c).css({ width: "100vw" });
  }
  if (n == "0") {
    document.getElementById("call_name" + cont_c).innerHTML = "拒否";
  } else if (n == "1") {
    document.getElementById("call_name" + cont_c).innerHTML = "応答";
  } else {
    document.getElementById("call_name" + cont_c).innerHTML = "その他";
  }

  document.getElementById("call_time" + cont_c).innerHTML = call_tm / 100;
  $(".reset").removeClass("none");
}

function reset() {
  $("#cont" + cont_c).addClass("none");
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
    document.getElementById("reco").innerHTML = record;
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
  console.log(elem);
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
    if (moveX < 289 && cont_c == 11) {
      document.getElementById("icon-1").style.left = moveX - 40 + "px";
    }
    if (moveX < 330 && moveX > 80) {
      if (cont_c == 12) {
        document.getElementById("icon-2").style.left = moveX - 40 + "px";
      } else if (cont_c == 13) {
        document.getElementById("icon-3").style.left = moveX - 40 + "px";
      } else if (cont_c == 17) {
        document.getElementById("icon-4").style.left = moveX - 40 + "px";
      }
    }
  });

  // タッチ終了時： スワイプした距離から左右どちらにスワイプしたかを判定する/距離が短い場合何もしない
  t.addEventListener("touchend", function (e) {
    if (startX > moveX && startX > moveX + dist) {
      stopSound(0);
      // 右から左にスワイプ
    } else if (startX < moveX && startX + 20 < moveX) {
      // 左から右にスワイプ
      stopSound(1);
    }
  });
}

var iconbar_wid;
function spreadIcon() {
  if (cont_c == 17) {
    iconbar_wid = "300px";
    setSlide(".only-icon-wrap");
  } else {
    iconbar_wid = "380px";
    $(".only-icon-wrap").addClass("none");
    $(".only-stop-icon-wrap").removeClass("none");
  }
  $("#cont" + cont_c).css({ width: iconbar_wid });
  $("#call_name" + cont_c).css({ opacity: 1 });
}

function nextImg() {
  document.getElementById("mtgi").src = mtgi_Imgs[img_c];
  img_c += 1;
  if (img_c == 2) {
    document.getElementById("mtgi-disc").innerHTML = "間違いは全部で7箇所";
  }
}
