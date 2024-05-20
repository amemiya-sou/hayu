//シーズンを生成
const season = 1;
const selectElement = document.getElementById("season");
for (let i = season; i >= 1; i--) {
    const option = document.createElement("option");
    option.value = `season${i}`;
    option.text = `シーズン${i}`;
    if (i === season) {
        option.selected = true;
    }
    selectElement.add(option);
}

//ルールを生成
const ruleElement = document.getElementById("rule");
const single = document.createElement("option");
const double = document.createElement("option");
single.value = 'single';
single.text = 'シングル';
double.value = 'double';
double.text = 'ダブル';
single.selected = true;
ruleElement.add(single);
ruleElement.add(double);

//レギュレーションを生成
const reguElement = document.getElementById("regulation");
var regu = [
    { value: "G", text: "レギュG" },
    { value: "F", text: "レギュF" },
    { value: "E", text: "レギュE" },
    { value: "D", text: "レギュD" },
    { value: "C", text: "レギュC" },
    { value: "B", text: "レギュB" },
    { value: "A", text: "レギュA" }
];
for (let i = 0; i < regu.length; i++) {
    const option = document.createElement("option");
    option.value = regu[i].value;
    option.text = regu[i].text;
    if (regu[i].value == "A") {
        option.selected = true;
    }
    reguElement.add(option);
}

//pokemon1～6の内容をチェック
window.onload = function () {
    for (let i = 1; i <= 6; i++) {
        const poke = document.getElementById('pokemon' + i).value;
        const moves = [];
        const correction = [{
            pokemon: "ドヒドイデ",
            correctionMove: "じごくづき",
            proper: "どくづき"
        }, {
            pokemon: "ドヒドイデ",
            correctionMove: "くすぐる",
            proper: "どくどく"
        },{
            pokemon: "ドヒドイデ",
            correctionMove: "あくのはどう",
            proper: "どくどく"
        },{
            pokemon: "ドヒドイデ",
            correctionMove: "あまごい",
            proper: "どくどく"
        },{
            pokemon: "ドヒドイデ",
            correctionMove: "マグマストーム",
            proper: "どくどく"
        }, {
            pokemon: "グライオン",
            correctionMove: "くすぐる",
            proper: "どくどく"
        }, {
            pokemon: "キュウコン",
            correctionMove: "いえき",
            proper: "ふぶき"
        },{
            pokemon: "ドオー",
            correctionMove: "じごくづき",
            proper: "どくづき"
        },{
            pokemon: "ドオー",
            correctionMove: "えだづき",
            proper: "どくづき"
        },{
            pokemon: "ドドゲザン",
            correctionMove: "ねらいうち",
            proper: "ふいうち"
        },{
            pokemon: "クレベース",
            correctionMove: "ハードプレス",
            proper: "ボディプレス"
        },{
            pokemon: "サーフゴー",
            correctionMove: "トリックフラワー",
            proper: "トリック"
        },{
            pokemon: "サーフゴー",
            correctionMove: "エナジーボール",
            proper: "シャドーボール"
        },{
            pokemon: "アーマーガア",
            correctionMove: "いてつくしせん",
            proper: "てっぺき"
        },{
            pokemon: "ガブリアス",
            correctionMove: "ドラゴンアロー",
            proper: "ドラゴンクロー"
        },{
            pokemon: "マリルリ",
            correctionMove: "やきつくす",
            proper: "じゃれつく"
        }];
        for (let j = 1; j <= 4; j++) {
            const move = document.getElementById('move' + i + j).value;
            for (let l = 0; l < correction.length; l++) {
                if (poke == correction[l].pokemon && move == correction[l].correctionMove) {
                    document.getElementById('move' + i + j).value = correction[l].proper;
                }
            }
            moves.push(move);
        }

        const pokeList = ['ウーラオス', 'ウーラオス', 'ガチグマ', 'バドレックス', 'バドレックス', 'バドレックス', 'キュウコン', 'ロトム', 'ロトム', 'ロトム', 'ロトム', 'ロトム'];
        const moveList = { 'すいりゅうれんだ': 'ウーラオス(水)', 'あんこくきょうだ': 'ウーラオス(悪)', 'ブラッドムーン': 'ガチグマ(アカツキ)', 'ブリザードランス': 'バドレックス(白)', 'アストラルビット': 'バドレックス(黒)', 'オーロラベール': 'キュウコン(アローラ)', 'オーバーヒート': 'ヒートロトム', 'ハイドロポンプ': 'ウォッシュロトム', 'ふぶき': 'フロストロトム', 'エアスラッシュ': 'スピンロトム', 'リーフストーム': 'カットロトム' };
        for (let k = 0; k < pokeList.length; k++) {
            if (poke == pokeList[k]) {
                for (var moveKey in moveList) {
                    if (moves.includes(moveKey)) {
                        document.getElementById('pokemon' + i).value = moveList[moveKey];
                    }
                }
            }
        }

        if (poke == 'オーガポン') {
            const tera = document.getElementById('tera' + i).value;
            const teraList = { 'くさ': 'オーガポン(みどり)', 'みず': 'オーガポン(いど)', 'ほのお': 'オーガポン(かまど)', 'いわ': 'オーガポン(いしずえ)' };
            for (var teraKey in teraList) {
                if (tera == teraKey) {
                    document.getElementById('pokemon' + i).value = teraList[teraKey];
                }
            }
        }
    }
    setTimeout(function () {
        for (var i = 1; i <= 6; i++) {
            checkInitialValue('pokemon' + i);
        }
    }, 100);
};

//以下のポケモンなら背景を赤くする
function checkInitialValue(elementId) {
    var inputValue = document.getElementById(elementId).value;
    var inputElement = document.getElementById(elementId);
    if (inputValue === "ライチュウ" ||
        inputValue === "サンド" ||
        inputValue === "サンドパン" ||
        inputValue === "ロコン" ||
        inputValue === "キュウコン" ||
        inputValue === "ディグダ" ||
        inputValue === "ダグトリオ" ||
        inputValue === "ニャース" ||
        inputValue === "ペルシアン" ||
        inputValue === "ガーディ" ||
        inputValue === "ウインディ" ||
        inputValue === "イシツブテ" ||
        inputValue === "ゴローン" ||
        inputValue === "ゴローニャ" ||
        inputValue === "ヤドン" ||
        inputValue === "ヤドラン" ||
        inputValue === "ベトベター" ||
        inputValue === "ベトベトン" ||
        inputValue === "ビリリダマ" ||
        inputValue === "マルマイン" ||
        inputValue === "ナッシー" ||
        inputValue === "マタドガス" ||
        inputValue === "ケンタロス" ||
        inputValue === "フリーザー" ||
        inputValue === "サンダー" ||
        inputValue === "ファイヤー" ||
        inputValue === "バクフーン" ||
        inputValue === "ウパー" ||
        inputValue === "ヤドキング" ||
        inputValue === "ハリーセン" ||
        inputValue === "ニューラ" ||
        inputValue === "デオキシス" ||
        inputValue === "カラナクシ" ||
        inputValue === "トリトドン" ||
        inputValue === "ロトム" ||
        inputValue === "ディアルガ" ||
        inputValue === "パルキア" ||
        inputValue === "ギラティナ" ||
        inputValue === "シェイミ" ||
        inputValue === "ダイケンキ" ||
        inputValue === "ドレディア" ||
        inputValue === "バスラオ" ||
        inputValue === "ゾロア" ||
        inputValue === "ゾロアーク" ||
        inputValue === "シキジカ" ||
        inputValue === "メブキジカ" ||
        inputValue === "ウォーグル" ||
        inputValue === "トルネロス" ||
        inputValue === "ボルトロス" ||
        inputValue === "ランドロス" ||
        inputValue === "ニャオニクス" ||
        inputValue === "ヌメイル" ||
        inputValue === "ヌメルゴン" ||
        inputValue === "クレベース" ||
        inputValue === "ジュナイパー" ||
        inputValue === "オドリドリ" ||
        inputValue === "ルガルガン" ||
        inputValue === "ネクロズマ" ||
        inputValue === "ストリンダー" ||
        inputValue === "イエッサン" ||
        inputValue === "ウーラオス" ||
        inputValue === "バドレックス" ||
        inputValue === "ガチグマ" ||
        inputValue === "イダイトウ" ||
        inputValue === "ラブトロス" ||
        inputValue === "パフュートン" ||
        inputValue === "イッカネズミ" ||
        inputValue === "イキリンコ" ||
        inputValue === "シャリタツ" ||
        inputValue === "コレクレー" ||
        inputValue === "オーガポン") {
        inputElement.classList.add("red-background");
        disableAutocomplete(inputElement);
    }
}

function disableAutocomplete(inputElement) {
    if (typeof $ !== 'undefined' && $.ui && $.ui.autocomplete) {
        $(inputElement).autocomplete("disable");
        inputElement.setAttribute("autocomplete", "off");
    }
}

function showPokemonSuggestions(elementId) {
    var inputElement = document.getElementById(elementId);
    if (!inputElement.classList.contains("sakuraino")) {
        //内容によって表示する候補を格納
        var inputValue = inputElement.value;
        var suggestions = [];
        if (inputValue === "ライチュウ") {
            suggestions = ["ライチュウ", "ライチュウ(アローラ)"];
        } else if (inputValue === "サンド") {
            suggestions = ["サンド", "サンド(アローラ)"];
        } else if (inputValue === "サンドパン") {
            suggestions = ["サンドパン", "サンドパン(アローラ)"];
        } else if (inputValue === "ロコン") {
            suggestions = ["ロコン", "ロコン(アローラ)"];
        } else if (inputValue === "キュウコン") {
            suggestions = ["キュウコン", "キュウコン(アローラ)"];
        } else if (inputValue === "ディグダ") {
            suggestions = ["ディグダ", "ディグダ(アローラ)"];
        } else if (inputValue === "ダグトリオ") {
            suggestions = ["ダグトリオ", "ダグトリオ(アローラ)"];
        } else if (inputValue === "ニャース") {
            suggestions = ["ニャース", "ニャース(アローラ)", "ニャース(ガラル)"];
        } else if (inputValue === "ペルシアン") {
            suggestions = ["ペルシアン", "ペルシアン(アローラ)"];
        } else if (inputValue === "ガーディ") {
            suggestions = ["ガーディ", "ガーディ(ヒスイ)"];
        } else if (inputValue === "ウインディ") {
            suggestions = ["ウインディ", "ウインディ(ヒスイ)"];
        } else if (inputValue === "イシツブテ") {
            suggestions = ["イシツブテ", "イシツブテ(アローラ)"];
        } else if (inputValue === "ゴローン") {
            suggestions = ["ゴローン", "ゴローン(アローラ)"];
        } else if (inputValue === "ゴローニャ") {
            suggestions = ["ゴローニャ", "ゴローニャ(アローラ)"];
        } else if (inputValue === "ヤドン") {
            suggestions = ["ヤドン", "ヤドン(ガラル)"];
        } else if (inputValue === "ヤドラン") {
            suggestions = ["ヤドラン", "ヤドラン(ガラル)"];
        } else if (inputValue === "ベトベター") {
            suggestions = ["ベトベター", "ベトベター(アローラ)"];
        } else if (inputValue === "ベトベトン") {
            suggestions = ["ベトベトン", "ベトベトン(アローラ)"];
        } else if (inputValue === "ビリリダマ") {
            suggestions = ["ビリリダマ", "ビリリダマ(ヒスイ)"];
        } else if (inputValue === "マルマイン") {
            suggestions = ["マルマイン", "マルマイン(ヒスイ)"];
        } else if (inputValue === "ナッシー") {
            suggestions = ["ナッシー", "ナッシー(アローラ)"];
        } else if (inputValue === "マタドガス") {
            suggestions = ["マタドガス", "マタドガス(ガラル)"];
        } else if (inputValue === "ケンタロス") {
            suggestions = ["ケンタロス", "ケンタロス(パルデア単)", "ケンタロス(パルデア炎)", "ケンタロス(パルデア水)"];
        } else if (inputValue === "フリーザー") {
            suggestions = ["フリーザー", "フリーザー(ガラル)"];
        } else if (inputValue === "サンダー") {
            suggestions = ["サンダー", "サンダー(ガラル)"];
        } else if (inputValue === "ファイヤー") {
            suggestions = ["ファイヤー", "ファイヤー(ガラル)"];
        } else if (inputValue === "バクフーン") {
            suggestions = ["バクフーン", "バクフーン(ヒスイ)"];
        } else if (inputValue === "ウパー") {
            suggestions = ["ウパー", "ウパー(パルデア)"];
        } else if (inputValue === "ヤドキング") {
            suggestions = ["ヤドキング", "ヤドキング(ガラル)"];
        } else if (inputValue === "ハリーセン") {
            suggestions = ["ハリーセン", "ハリーセン(ヒスイ)"];
        } else if (inputValue === "ニューラ") {
            suggestions = ["ニューラ", "ニューラ(ヒスイ)"];
        } else if (inputValue === "デオキシス") {
            suggestions = ["デオキシス(ノーマル)", "デオキシス(アタック)", "デオキシス(ディフェンス)", "デオキシス(スピード)"];
        } else if (inputValue === "カラナクシ") {
            suggestions = ["カラナクシ(ピンク)", "カラナクシ(水色)"];
        } else if (inputValue === "トリトドン") {
            suggestions = ["トリトドン(ピンク)", "トリトドン(水色)"];
        } else if (inputValue === "ロトム") {
            suggestions = ["ロトム", "ヒートロトム", "ウォッシュロトム", "フロストロトム", "スピンロトム", "カットロトム"];
        } else if (inputValue === "ディアルガ") {
            suggestions = ["ディアルガ", "ディアルガ(オリジン)"];
        } else if (inputValue === "パルキア") {
            suggestions = ["パルキア", "パルキア(オリジン)"];
        } else if (inputValue === "ギラティナ") {
            suggestions = ["ギラティナ(アナザー)", "ギラティナ(オリジン)"];
        } else if (inputValue === "シェイミ") {
            suggestions = ["シェイミ(ランド)", "シェイミ(スカイ)"];
        } else if (inputValue === "ダイケンキ") {
            suggestions = ["ダイケンキ", "ダイケンキ(ヒスイ)"];
        } else if (inputValue === "ドレディア") {
            suggestions = ["ドレディア", "ドレディア(ヒスイ)"];
        } else if (inputValue === "バスラオ") {
            suggestions = ["バスラオ(赤すじ)", "バスラオ(青すじ)", "バスラオ(白すじ)"];
        } else if (inputValue === "ゾロア") {
            suggestions = ["ゾロア", "ゾロア(ヒスイ)"];
        } else if (inputValue === "ゾロアーク") {
            suggestions = ["ゾロアーク", "ゾロアーク(ヒスイ)"];
        } else if (inputValue === "シキジカ") {
            suggestions = ["シキジカ(春)", "シキジカ(夏)", "シキジカ(秋)", "シキジカ(冬)"];
        } else if (inputValue === "メブキジカ") {
            suggestions = ["メブキジカ(春)", "メブキジカ(夏)", "メブキジカ(秋)", "メブキジカ(冬)"];
        } else if (inputValue === "ウォーグル") {
            suggestions = ["ウォーグル", "ウォーグル(ヒスイ)"];
        } else if (inputValue === "トルネロス") {
            suggestions = ["トルネロス(化身)", "トルネロス(霊獣)"];
        } else if (inputValue === "ボルトロス") {
            suggestions = ["ボルトロス(化身)", "ボルトロス(霊獣)"];
        } else if (inputValue === "ランドロス") {
            suggestions = ["ランドロス(化身)", "ランドロス(霊獣)"];
        } else if (inputValue === "ニャオニクス") {
            suggestions = ["ニャオニクス♂", "ニャオニクス♀"];
        } else if (inputValue === "ヌメイル") {
            suggestions = ["ヌメイル", "ヌメイル(ヒスイ)"];
        } else if (inputValue === "ヌメルゴン") {
            suggestions = ["ヌメルゴン", "ヌメルゴン(ヒスイ)"];
        } else if (inputValue === "クレベース") {
            suggestions = ["クレベース", "クレベース(ヒスイ)"];
        } else if (inputValue === "ジュナイパー") {
            suggestions = ["ジュナイパー", "ジュナイパー(ヒスイ)"];
        } else if (inputValue === "オドリドリ") {
            suggestions = ["オドリドリ(めらめら)", "オドリドリ(ふらふら)", "オドリドリ(まいまい)", "オドリドリ(ぱちぱち)"];
        } else if (inputValue === "ルガルガン") {
            suggestions = ["ルガルガン(まひる)", "ルガルガン(まよなか)", "ルガルガン(たそがれ)"];
        } else if (inputValue === "ネクロズマ") {
            suggestions = ["ネクロズマ", "ネクロズマ(日食)", "ネクロズマ(月食)"];
        } else if (inputValue === "ストリンダー") {
            suggestions = ["ストリンダー(ハイ)", "ストリンダー(ロー)"];
        } else if (inputValue === "イエッサン") {
            suggestions = ["イエッサン♂", "イエッサン♀"];
        } else if (inputValue === "ウーラオス") {
            suggestions = ["ウーラオス(悪)", "ウーラオス(水)"];
        } else if (inputValue === "バドレックス") {
            suggestions = ["バドレックス", "バドレックス(白)", "バドレックス(黒)"];
        } else if (inputValue === "ガチグマ") {
            suggestions = ["ガチグマ", "ガチグマ(アカツキ)"];
        } else if (inputValue === "イダイトウ") {
            suggestions = ["イダイトウ♂", "イダイトウ♀"];
        } else if (inputValue === "ラブトロス") {
            suggestions = ["ラブトロス(化身)", "ラブトロス(霊獣)"];
        } else if (inputValue === "パフュートン") {
            suggestions = ["パフュートン♂", "パフュートン♀"];
        } else if (inputValue === "イッカネズミ") {
            suggestions = ["イッカネズミ(3びき)", "イッカネズミ(4ひき)"];
        } else if (inputValue === "イキリンコ") {
            suggestions = ["イキリンコ(グリーン)", "イキリンコ(ブルー)", "イキリンコ(イエロー)", "イキリンコ(ホワイト)"];
        } else if (inputValue === "シャリタツ") {
            suggestions = ["シャリタツ(橙色)", "シャリタツ(赤色)", "シャリタツ(黄色)"];
        } else if (inputValue === "コレクレー") {
            suggestions = ["コレクレー(はこ)", "コレクレー(とほ)"];
        } else if (inputValue === "オーガポン") {
            suggestions = ["オーガポン(みどり)", "オーガポン(いど)", "オーガポン(かまど)", "オーガポン(いしずえ)"];
        }

        //候補を表示する場所を定義する
        var suggestionsContainer = document.getElementById(elementId + "suggestions");
        suggestionsContainer.innerHTML = "";

        //候補の数だけ繰り返し
        for (var i = 0; i < suggestions.length; i++) {
            var suggestion = suggestions[i];
            var suggestionElement = document.createElement("div");
            suggestionElement.className = "suggestion";
            suggestionElement.textContent = suggestion;

            //候補を選んだ時の処理
            suggestionElement.onclick = function () {
                document.getElementById(elementId).classList.replace("red-background", "sakuraino");
                document.getElementById(elementId).value = this.textContent;
                suggestionsContainer.innerHTML = "";
                suggestionsContainer.style.display = "none";
            };
            suggestionsContainer.appendChild(suggestionElement);
        }
        if (suggestions.length > 0) {
            suggestionsContainer.style.display = "block";
        } else {
            suggestionsContainer.style.display = "none";
        }
    }/* else {
        var inputValue = inputElement.value;
        var suggestions = [];
        if (inputValue === "ウーラオス(れんげき)") {
            suggestions = ["ウーラオス(いちげき)", "ウーラオス(れんげき)"];
        }
        //候補を表示する場所を定義する
        var suggestionsContainer = document.getElementById(elementId + "suggestions");
        suggestionsContainer.innerHTML = "";

        //候補の数だけ繰り返し
        for (var i = 0; i < suggestions.length; i++) {
            var suggestion = suggestions[i];
            var suggestionElement = document.createElement("div");
            suggestionElement.className = "suggestion";
            suggestionElement.textContent = suggestion;
            //候補を選んだ時の処理
            suggestionElement.onclick = function () {
                document.getElementById(elementId).classList.replace("sakuraino", "sakuraino");
                document.getElementById(elementId).value = this.textContent;
                suggestionsContainer.innerHTML = "";
                suggestionsContainer.style.display = "none";
            };
            suggestionsContainer.appendChild(suggestionElement);
        }
        if (suggestions.length > 0) {
            suggestionsContainer.style.display = "block";
        } else {
            suggestionsContainer.style.display = "none";
        }
    }*/
}

//フォーカスを外したら候補を消す
function myBlurFunction(elementId) {
    setTimeout(function () {
        var suggestionsContainer = document.getElementById(elementId + "suggestions");
        suggestionsContainer.style.display = "none";
    }, 200); // 200ミリ秒（0.2秒）の遅延を設定
}

function changeColor(elementId) {
    var inputValue = document.getElementById(elementId).value;
    var inputElement = document.getElementById(elementId);
    if (inputValue !== "イノ" && inputValue !== "ニナ") {
        inputElement.classList.remove("red-background");
        $(inputElement).autocomplete("enable");
        var suggestionsContainer = document.getElementById(elementId + "suggestions");
        suggestionsContainer.style.display = "none";
    }
}

//クリックするとファイルを空にする
document.getElementById('file-input').addEventListener('click', function () {
    this.value = '';
});

//ファイルの内容が変更されたらローディングを呼び出す
document.getElementById('file-input').addEventListener('change', function () {
    document.getElementById('upload-form').submit();
    showLoading();
});

//ローディングを生成する関数
function showLoading() {
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('loading-overlay').style.display = 'flex';
}

/*最終順位を入力できる条件
var seasonSelect = document.getElementById("season");
var rankingInput = document.getElementById("ranking");

function updateRankingStatus() {
    if (seasonSelect.value !== "") {
        rankingInput.disabled = false;
        rankingInput.classList.remove("disabled");
    } else {
        rankingInput.disabled = true;
        rankingInput.value = "";
        rankingInput.classList.add("disabled");
    }
}

updateRankingStatus();
seasonSelect.addEventListener("change", updateRankingStatus);

document.addEventListener("DOMContentLoaded", function () {
    var seasonSelect = document.getElementById("season");
    var regulationSelect = document.getElementById("regulation");
    var eventSelect = document.getElementById("event");
    seasonSelect.addEventListener("change", function () {
        eventSelect.selectedIndex = 0;
        updateRankingStatus();
    });
    regulationSelect.addEventListener("change", function () {
        eventSelect.selectedIndex = 0;
        updateRankingStatus();
    });
    eventSelect.addEventListener("change", function () {
        seasonSelect.selectedIndex = 0;
        regulationSelect.selectedIndex = 0;
        updateRankingStatus();
    });
});
*/

//シーズンに対応したレギュレーションを入力する
document.getElementById('season').addEventListener('change', function () {
    var seasonValue = this.value;
    var regulationElement = document.getElementById('regulation');
    var seasonMap = {
        'season1': 'A', 'season2': 'A',
        'season3': 'B', 'season4': 'B',
        'season5': 'C', 'season6': 'C', 'season7': 'C',
        'season8': 'D', 'season9': 'D', 'season10': 'D',
        'season11': 'E', 'season12': 'E', 'season13': 'E',
        'season14': 'F', 'season15': 'F', 'season16': 'F', 'season17': 'F',
        'season18': 'G', 'season19': 'G', 'season20': 'G'
    };
    if (seasonValue != '') {
        regulationElement.value = seasonMap[seasonValue] || '';
    }
});

//レギュレーションに対応したシーズンでなければ空にする
document.getElementById('regulation').addEventListener('change', function () {
    var regulationValue = this.value;
    var seasonElement = document.getElementById('season');
    var seasonMap = {
        'A': ['season1', 'season2'],
        'B': ['season3', 'season4'],
        'C': ['season5', 'season6', 'season7'],
        'D': ['season8', 'season9', 'season10'],
        'E': ['season11', 'season12', 'season13'],
        'F': ['season14', 'season15', 'season16', 'season17'],
        'F': ['season18', 'season19', 'season20']
    };
    if (seasonMap[regulationValue] && seasonMap[regulationValue].indexOf(seasonElement.value) === -1) {
        seasonElement.value = "";
    }
});

//URLからタイトルを生成
document.getElementById('generateButton').addEventListener('click', function () {
    event.preventDefault();
    let url = document.getElementById('url').value;

    if (!url) {
        document.getElementById('title').value = "";
        return;
    }

    fetch(url)
        .then(response => response.text())
        .then(html => {
            let matches = html.match(/<title>(.*?)<\/title>/i);
            let title = matches && matches[1] ? matches[1] : 'タイトルなし';
            if (url.includes('hatenablog.com') || url.includes('hatenablog.jp') || url.includes('hateblo.jp') || url.includes('hatenadiary.com') || url.includes('hatenadiary.jp')) {
                title = title.replace(/\s*-\s*[^-]*$/, '');
            }
            document.getElementById('title').value = title;
        })
        .catch(error => {
            if (url.includes('note.com')) {
                alert("noteのURLからは生成できません。コピペで貼り付けてください。");
            } else if (url.includes('youtube.com')) {
                alert("YouTubeのURLからは生成できません。コピペで貼り付けてください。");
            } else {
                alert("このURLからは生成できません。");
            }
        });
});

//タイトルフォーマットを生成
document.getElementById('formatButton').addEventListener('click', function () {
    event.preventDefault();

    let title;
    rule = document.getElementById('rule').value;
    if (rule == "single") {
        rule = "シングル";
    } else if (rule == "double") {
        rule = "ダブル";
    }

    let season = document.getElementById('season').value;
    if (season != "") {
        season = "シーズン" + season.replace("season", "");
    }

    let ranking = document.getElementById('ranking').value;
    if (ranking != "") {
        ranking = "最終" + ranking + "位";
    }

    title = "【ポケモンSV" + rule + "】" + season + ranking;
    document.getElementById('title').value = title;
});

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

//フォルム候補の横幅を変える
function setPokemonWidth() {
    for (var i = 1; i <= 6; i++) {
        var pokemonId = 'pokemon' + i;
        var suggestionsId = pokemonId + 'suggestions';

        var pokemonWidth = document.getElementById(pokemonId).offsetWidth;
        var newPokemonWidth = pokemonWidth + 1;
        document.getElementById(suggestionsId).style.width = newPokemonWidth + 'px';
    }
}
window.addEventListener('load', setPokemonWidth);
window.addEventListener('resize', setPokemonWidth);

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

        var urlInput = $("#regulation");
        var urlInput2 = $("#event");
        if ((urlInput.val() === "") && (urlInput2.val() === "")) {
            alert("レギュレーションもしくは大会などを選択してください。");
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
        var urlInput2 = $("#season");
        var inputValue = urlInput.val();
        if ((urlInput2.val() != "") && (inputValue.trim() === "")) {
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
            var confirmed = confirm("入力した内容で投稿しますか？");
            if (!confirmed) {
                event.preventDefault();
            }
        }
    });
});
