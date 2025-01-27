$kanjiList = @('一', '二', '三', '四', '五', '六', '七', '八', '九', '十')
$baseUrl = "https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji"

# Create directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "images/kanji-svg"

foreach ($kanji in $kanjiList) {
    $hexCode = [System.Convert]::ToString([System.Text.Encoding]::Unicode.GetBytes($kanji)[1], 16)
    $url = "$baseUrl/$hexCode.svg"
    $outputFile = "images/kanji-svg/$hexCode.svg"
    
    Write-Host "Downloading $kanji from $url to $outputFile"
    Invoke-WebRequest -Uri $url -OutFile $outputFile
}
