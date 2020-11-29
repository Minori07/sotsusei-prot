var count = 0;
var random_count = Math.round(Math.random() * 6) + 4; //* 幅 )+ 最小
// slideshow_timer();
var sound = new Audio("./curcuit.mp3");
var call_tm = 0;
var calling = true;
// var cont = new Array("call-cont0", "call-cont1", "call-cont2", "call-cont3");
var cont_c = 0;
var record = new Array(0);

$(function () {
  $("a").click(function () {
    location.href = $(this).attr("href");
    return false;
  });
  console.log(random_count);
  setSwipe("#cont3");
}); //ホーム追加でsafari起動させない

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
    $(".call-cont" + cont_c).css({ visibility: "visible" });
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
  $("#cont" + cont_c).removeClass("call-cont" + cont_c);
  $("#cont" + cont_c).addClass("call-cont1");
  if (n == "0") {
    document.getElementById("call_name" + cont_c).innerHTML = "拒否";
  } else if (n == "1") {
    document.getElementById("call_name" + cont_c).innerHTML = "応答";
  } else {
    document.getElementById("call_name" + cont_c).innerHTML = "その他";
  }

  document.getElementById("call_time" + cont_c).innerHTML = call_tm / 100;
  $(".reset").css({ visibility: "visible" });
  record.push(call_tm / 100);
}

function reset() {
  if (cont_c == 0) {
    $(".call-cont0").css({ visibility: "hidden" });
  }
  $(".call-cont1").css({ visibility: "hidden" });
  $(".reset").css({ visibility: "hidden" });
  count = 0;
  random_count = Math.round(Math.random() * 6) + 4;
  console.log(random_count);
  call_tm = 0;
  calling = true;
  sound.currentTime = 0;
  if (cont_c < 3) {
    cont_c += 1;
  } else {
    record.shift(); //先頭（test）を削除
    document.getElementById("reco").innerHTML = record;
  }
}

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
    // console.log(moveY);
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
