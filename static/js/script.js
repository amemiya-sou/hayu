document.getElementById('file-input').addEventListener('change', function () {
    document.getElementById('upload-form').submit();
});

document.getElementById('file-input').addEventListener('change', function () {
    showLoading();
});
function showLoading() {
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('loading-overlay').style.display = 'flex';
}

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

function adjustPokemonSuggestions() {
    for (var i = 1; i <= 6; i++) {
        var pokemonId = 'pokemon' + i;
        var suggestionsId = 'pokemon' + i + 'suggestions';
        var pokemon = document.getElementById(pokemonId);
        var suggestions = document.getElementById(suggestionsId);
        suggestions.style.width = getComputedStyle(pokemon).width;
        var rect = pokemon.getBoundingClientRect();
        suggestions.style.left = rect.left + 'px';
    }
}

$(function () {
    $('.check').on('click', function () {
        if ($(this).prop('checked')) {
            $('.check').prop('checked', false);
            $(this).prop('checked', true);
        }
    });
});

$(function () {
    $("#party_form").on("keydown", function (ev) {
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
    $("#party_form").submit(function (event) {

        var urlInput = $("#rule");
        if (urlInput.val() === "") {
            alert("ルールを選択してください。");
            event.preventDefault();
        }

        var urlInput = $("#season");
        if (urlInput.val() === "") {
            alert("シーズンを選択してください。");
            event.preventDefault();
        }

        var urlInput = $("#url");
        if (urlInput.val() === "") {
            alert("URLを入力してください。");
            event.preventDefault();
        }

        var urlInput = $("#name");
        if (urlInput.val() === "") {
            alert("制作者名を入力してください。");
            event.preventDefault();
        }

        var urlInput = $("#rank");
        var inputValue = urlInput.val();
        if (inputValue.trim() === "") {
            alert("最終順位を入力してください。");
            event.preventDefault();
        } else {
            var nonNumericPattern = /[^0-9]/;
            if (nonNumericPattern.test(inputValue)) {
                alert("順位は数字のみを入力してください。");
                event.preventDefault();
            }
        }


        if (document.querySelector('.red-background')) {
            event.preventDefault();
            alert('フォルムを選択してください。');
        }
    });
});
