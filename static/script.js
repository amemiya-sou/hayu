document.getElementById('file-input').addEventListener('change', function () {
    document.getElementById('upload-form').submit();
});

window.addEventListener('DOMContentLoaded', function () {
    // Loop through pokemon1 to pokemon6
    for (var i = 1; i <= 6; i++) {
        var pokemonId = 'pokemon' + i;
        var suggestionsId = 'pokemon' + i + 'suggestions';

        // Get elements by their ids
        var pokemon = document.getElementById(pokemonId);
        var suggestions = document.getElementById(suggestionsId);

        // Set width of suggestions to the width of pokemon
        suggestions.style.width = getComputedStyle(pokemon).width;

        // Set left position of suggestions based on pokemon's position
        var rect = pokemon.getBoundingClientRect();
        suggestions.style.left = rect.left + 'px';
    }
});

$(function () {
    $('.check').on('click', function () {
        if ($(this).prop('checked')) {
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

$(document).ready(function () {
    $("form").submit(function (event) {
        // シングルまたはダブルのどちらかが選択されているかを確認
        if (!$(".check:checked").length) {
            alert("ルールを選択してください。");
            event.preventDefault(); // フォーム送信を阻止
        }
    });
});
