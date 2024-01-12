//ファイルをアップロード
document.getElementById('file-input').addEventListener('click', function () {
    this.value = '';
});
document.getElementById('file-input').addEventListener('change', function () {
    document.getElementById('upload-form').submit();
    showLoading();
});
function showLoading() {
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('loading-overlay').style.display = 'flex';
}

//半角数字しか入力させない
document.addEventListener('DOMContentLoaded', function () {
    var rankInput = document.getElementById('ranking');
    rankInput.addEventListener('input', function (event) {
        var inputValue = event.target.value;
        var convertedValue = inputValue.replace(/[０-９]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
        });
        rankInput.value = convertedValue;
    });
});

//ハンバーガーメニュー
document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('menuButton');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const overlay = document.querySelector('.overlay');
    const closeButton = document.getElementById('closeButton');
    function closeMenu() {
        hamburgerMenu.style.right = '-300px';
        overlay.style.display = 'none';
    }
    menuButton.addEventListener('click', function () {
        if (hamburgerMenu.style.right === '0px') {
            closeMenu();
        } else {
            hamburgerMenu.style.right = '0px';
            overlay.style.display = 'block';
        }
    });
    closeButton.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
});

//エンターで送信させない
$(function () {
    $("#party_form").on("keydown", function (ev) {
        if ((ev.which && ev.which === 13) || (ev.keyCode && ev.keyCode === 13)) {
            return false;
        } else {
            return true;
        }
    });
});

//必須項目が空だと警告を出す
$(document).ready(function () {
    $("#party_form").submit(function (event) {

        var flags = {
            rule: false,
            season: false,
            url: false,
            name: false,
            ranking: false,
            red: false
        };

        var urlInput = $("#rule");
        if (urlInput.val() === "") {
            alert("ルールを選択してください。");
            event.preventDefault();
        } else {
            flags.rule = true;
        }

        var urlInput = $("#season");
        if (urlInput.val() === "") {
            alert("シーズンを選択してください。");
            event.preventDefault();
        } else {
            flags.season = true;
        }

        var urlInput = $("#url");
        if (urlInput.val() === "") {
            alert("URLを入力してください。");
            event.preventDefault();
        } else {
            flags.url = true;
        }

        var urlInput = $("#name");
        if (urlInput.val() === "") {
            alert("制作者名を入力してください。");
            event.preventDefault();
        } else {
            flags.name = true;
        }

        var urlInput = $("#ranking");
        var inputValue = urlInput.val();
        if (inputValue.trim() === "") {
            alert("最終順位を入力してください。");
            event.preventDefault();
        } else {
            var nonNumericPattern = /[^0-9]/;
            if (nonNumericPattern.test(inputValue)) {
                alert("順位は数字のみを入力してください。");
                event.preventDefault();
            } else {
                flags.ranking = true;
            }
        }

        if (document.querySelector('.red-background')) {
            event.preventDefault();
            alert('フォルムを選択してください。');
        } else {
            flags.red = true;
        }

        if (flags.rule && flags.season && flags.url && flags.name && flags.ranking && flags.red) {
            var confirmed = confirm("入力した内容で送信しますか？");
            if (!confirmed) {
                event.preventDefault();
            }
        }
    });
});
