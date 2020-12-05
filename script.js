var count = 0;
var random_count = 2;
var sound = new Audio("./curcuit.mp3");
var call_tm = 0;
var calling = true;
var cont_c = 0;
var record = new Array(0);
var img_c = 0;
var mtgi_Imgs = new Array(
  "./mtgi/mtgi-a1.png",
  "./mtgi/mtgi-2.jpg",
  "./mtgi/mtgi-a2.png",
  "./mtgi/mtgi-3.png",
  "./mtgi/mtgi-a3.png"
);

$(function () {
  $("a").click(function () {
    location.href = $(this).attr("href");
    return false;
  });
  console.log(random_count);
  setSwipe("#cont5");
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
  if (cont_c <= 4) {
    $("#cont" + cont_c).removeClass("call-cont-button");
  } else if (cont_c <= 5) {
    $("#cont" + cont_c).removeClass("call-cont-sw");
  }

  $("#cont" + cont_c).addClass("call-cont1");
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
  random_count = Math.round(Math.random() * 20) + 15; //* 幅 )+ 最小
  console.log(random_count);
  call_tm = 0;
  calling = true;
  sound.currentTime = 0;
  if (cont_c < 5) {
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
    if (startX > moveX && startX > moveX + dist) {
      // 右から左にスワイプ
    } else if (startX < moveX && startX + dist < moveX) {
      // 左から右にスワイプ
    }
  });
}

function nextImg() {
  document.getElementById("mtgi").src = mtgi_Imgs[img_c];
  img_c += 1;
  if (img_c == 2) {
    document.getElementById("mtgi-disc").innerHTML = "間違いは全部で7箇所";
  }
}
