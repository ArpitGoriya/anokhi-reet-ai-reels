# One-time setup for the Anokhi Reet voice maker. Run by double-clicking "1 Setup.bat".
# Installs uv (a small Python manager), a private Python for this folder, and the voice packages,
# then saves your free Gemini key in .env (this file never goes to GitHub).
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

function Say($msg) { Write-Host ""; Write-Host $msg -ForegroundColor Cyan }

try {
    Say "Step 1 of 3: checking uv (Python manager)..."
    $uv = Get-Command uv -ErrorAction SilentlyContinue
    if (-not $uv) {
        $local = Join-Path $env:USERPROFILE ".local\bin\uv.exe"
        if (Test-Path $local) { $uvPath = $local }
        else {
            Write-Host "Installing uv from astral.sh (official installer)..."
            powershell -NoProfile -ExecutionPolicy Bypass -Command "irm https://astral.sh/uv/install.ps1 | iex"
            $uvPath = $local
        }
    } else { $uvPath = $uv.Source }
    if (-not (Test-Path $uvPath)) { throw "uv could not be installed. Check the internet connection and try again." }

    Say "Step 2 of 3: installing Python and the voice packages (first time takes a few minutes)..."
    & $uvPath venv --python 3.11 .venv
    if ($LASTEXITCODE -ne 0) { throw "Could not create the Python environment." }
    & $uvPath pip install --python .venv\Scripts\python.exe google-genai imageio-ffmpeg
    if ($LASTEXITCODE -ne 0) { throw "Could not install the voice packages." }

    Say "Step 3 of 3: your free Gemini key"
    $envFile = Join-Path $Root ".env"
    $hasKey = (Test-Path $envFile) -and ((Get-Content $envFile -Raw) -match "GEMINI_API_KEY=\S+")
    if ($hasKey) {
        Write-Host "A key is already saved. Press Enter to keep it, or paste a new one."
    } else {
        Write-Host "Get one free at https://aistudio.google.com/apikey  (Create API key), then paste it here."
    }
    $key = Read-Host "Gemini key"
    $key = $key.Trim()
    if ($key) {
        Set-Content -Path $envFile -Value "GEMINI_API_KEY=$key" -Encoding ascii
        Write-Host "Key saved in .env (stays on this computer only)."
    } elseif (-not $hasKey) {
        throw "No key entered. Run '1 Setup.bat' again when you have it."
    }

    Say "All set! Now double-click '2 Make Voice.bat' to make a voice-over."
} catch {
    Write-Host ""
    Write-Host "Setup stopped: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Try again, or ask Claude in this folder: 'setup is not working'."
}
Write-Host ""
Read-Host "Press Enter to close"
