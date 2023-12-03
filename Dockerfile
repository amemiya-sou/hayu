# ベースイメージを指定
FROM python:3.8

# システムのパッケージを更新し、OpenCVに必要なライブラリをインストール
RUN apt-get update && apt-get install -y libgl1-mesa-glx tesseract-ocr

# tesseractの言語データを追加
RUN apt-get install -y tesseract-ocr-jpn

# 作業ディレクトリを設定
WORKDIR /app

# アプリケーションの依存関係をコピーしてインストール
COPY requirements.txt .

# 依存関係のインストール
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションのファイルをコピー
COPY . .

# アプリケーションを実行
CMD ["python", "app.py"]
