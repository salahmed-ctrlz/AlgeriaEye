function Merge-Json {
    param($jsonPath, $newContentPath)
    $newContent = Get-Content $newContentPath -Raw
    $current = Get-Content $jsonPath -Raw
    $lines = $current -split "`r?`n"
    # Remove last two lines (the closing braces)
    # We assume the file ends with:
    #   }
    # }
    $base = $lines[0..($lines.Length-3)] -join "`n"
    $final = $base + ",`n" + $newContent + "`n}"
    Set-Content $jsonPath $final
}

Merge-Json -jsonPath "messages\en.json" -newContentPath "messages\subscriptions_en.txt"
Merge-Json -jsonPath "messages\fr.json" -newContentPath "messages\subscriptions_fr.txt"
