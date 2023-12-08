$(function(){
    $('.check').on('click', function() {
      if ($(this).prop('checked')){
        $('.check').prop('checked', false);
        $(this).prop('checked', true);
      }
    });
  });

$(function () {
    $("input").on("keydown", function (ev) {
        if ((ev.which && ev.which === 13) || (ev.keyCode && ev.keyCode === 13)) {
            return false;
        } else {
            return true;
        }
    });
});

$(function () {
    $("select").focus(function () {
        $(this).on("keydown", function (ev) {
            if ((ev.which && ev.which === 13) || (ev.keyCode && ev.keyCode === 13)) {
                return false;
            } else {
                return true;
            }
        });
    });
});

$(document).ready(function () {
    $("form").submit(function (event) {
        var urlInput = $("#url");
        if (urlInput.val() === "") {
            alert("URLを入力してください。");
            event.preventDefault();
        }

        if (document.querySelector('.red-background')) {
            event.preventDefault();
            alert('フォルムを選択してください。');
        }
    });
});

