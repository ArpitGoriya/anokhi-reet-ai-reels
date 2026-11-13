# Make a voice-over. Run by double-clicking "2 Make Voice.bat".
# Asks male or female, opens Notepad for the script, then saves an MP3 in the "output" folder.
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root
$Py = Join-Path $Root ".venv\Scripts\python.exe"

try {
    if (-not (Test-Path $Py)) { throw "Setup is not done yet. Double-click '1 Setup.bat' first." }

    Write-Host ""
    Write-Host "Anokhi Reet voice maker" -ForegroundColor Cyan
    Write-Host "  1 = Male voice   (Sadachbia: warm, confident, friendly)"
    Write-Host "  2 = Female voice (Vindemiatrix: sweet, warm, gentle)"
    $choice = Read-Host "Type 1 or 2 and press Enter"
    if ($choice -eq "2") { $persona = "female"; $name = "female" }
    elseif ($choice -eq "1") { $persona = "male"; $name = "male" }
    else { throw "Please type 1 or 2." }

    $script = Join-Path $Root "scripts\current-script.txt"
    if (-not (Test-Path $script)) { New-Item -ItemType File -Path $script | Out-Null }
    Write-Host ""
    Write-Host "Notepad is opening. Write (or paste) what the voice should say, then SAVE and CLOSE Notepad."
    if ($persona -eq "female") {
        Write-Host "Tip: female lines need female Hindi, for example 'dikhane wali hoon', 'bhej doongi'." -ForegroundColor Yellow
    }
    Start-Process notepad.exe -ArgumentList "`"$script`"" -Wait

    $stamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
    $out = Join-Path $Root "output\$name-$stamp.mp3"
    Write-Host ""
    Write-Host "Making the voice-over (usually under a minute)..."
    & $Py voice\gen_voice.py $script $out --persona $persona
    if ($LASTEXITCODE -ne 0 -or -not (Test-Path $out)) { throw "The voice could not be made (see the message above)." }

    Write-Host ""
    Write-Host "Done! Saved: output\$name-$stamp.mp3" -ForegroundColor Green
    Start-Process explorer.exe -ArgumentList "/select,`"$out`""
} catch {
    Write-Host ""
    Write-Host "Stopped: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "If it says the free quota is used up, try again later (10 voice-overs per model per day)."
}
Write-Host ""
Read-Host "Press Enter to close"
