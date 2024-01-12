// HTMLコードを生成する関数
function generateHTML() {
    const htmlCode = `
    <div id="overlay"></div>
    <svg id="loading-overlay" class="spinner" width="65px" height="65px" viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
    <div class="overlay"></div>
    <div id="top">
        <header>
            <a href="index.php">
                <img src="../img/flat.png" id="header-img">
            </a>
            <button id="menuButton"><i class="fas fa-bars"></i></button>
        </header>
    </div>
    <div id="hamburgerMenu">
        <span id="closeButton">×</span>
        <form action="search.php" method="get">
            <div class="rule-container" style="margin-left: 16px;">
                <input type='checkbox' name='rule[]' value='single' id='single' style='margin-bottom: 4px;'>
                <label for='single' style='margin-bottom: 2px; margin-left: 2px;'>シングル</label>
                <input type='checkbox' name='rule[]' value='double' id='double'
                    style='margin-bottom: 4px; margin-left: 16px;'>
                <label for='double' style='margin-bottom: 2px; margin-left: 2px;'>ダブル</label>
            </div>
            <div id="search-bar">
                <input type="search" id="search-input" class="pokemon_input" name="pokemon0" autocomplete="off"
                    placeholder="ポケモン名で検索">
                <button type="submit" id="search-icon">
                    <i class="fas fa-search fa-fw"></i>
                </button>
            </div>
        </form>
        <div class="menu-box">
            <h3>記事検索</h3>
            <ul>
                <li>
                    <a href="search.php">
                        <span class="chevron-right">
                            <i class="fas fa-chevron-right"></i>
                        </span>
                        <span>詳細検索はこちら</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="menu-box">
            <h3>構築投稿フォーム</h3>
            <ul>
                <li>
                    <a href="#">
                        <span class="chevron-right">
                            <i class="fas fa-chevron-right"></i>
                        </span>
                        <span>ランクバトルの構築を投稿</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="menu-item">
                        <span class="chevron-right">
                            <i class="fas fa-chevron-right"></i>
                        </span>
                        <span>その他の構築を投稿</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="menu-box">
            <h3>シングル記事</h3>
            <ul>
                <li>
                    <a href="#">
                        <span class="chevron-right">
                            <i class="fas fa-chevron-right"></i>
                        </span>
                        <span>SVシーズン13シングル上位記事</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="chevron-right">
                            <i class="fas fa-chevron-right"></i>
                        </span>
                        <span>SVシーズン12シングル上位記事</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="chevron-right">
                            <i class="fas fa-chevron-right"></i>
                        </span>
                        <span>SVシーズン11シングル上位記事</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="menu-box">
            <h3>ダブル記事</h3>
            <ul>
                <li>
                    <a href="#">
                        <span class="chevron-right">
                            <i class="fas fa-chevron-right"></i>
                        </span>
                        <span>SVシーズン13ダブル上位記事</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="chevron-right">
                            <i class="fas fa-chevron-right"></i>
                        </span>
                        <span>SVシーズン12ダブル上位記事</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="chevron-right">
                            <i class="fas fa-chevron-right"></i>
                        </span>
                        <span>SVシーズン11ダブル上位記事</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="menu-box">
            <h3>問い合わせ</h3>
            <ul>
                <li>
                    <a href="inquiry.php">
                        <span class="chevron-right">
                            <i class="fas fa-chevron-right"></i>
                        </span>
                        <span>こちらから</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    `;

    // 既存のHTMLの先頭に新しいHTMLを追加
    document.body.insertAdjacentHTML('afterbegin', htmlCode);
}

// ページが読み込まれたときにHTML生成関数を実行
window.addEventListener('DOMContentLoaded', generateHTML);
