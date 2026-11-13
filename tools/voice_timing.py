"""When is each line spoken? Prints the spoken parts and pauses of a voice-over, to time reel scenes to it.

Usage:  PY tools/voice_timing.py output/<voice-over>.mp3 [--json]

Uses the ffmpeg that comes with imageio-ffmpeg (installed by set-me-up). A pause is at least 0.25 s below -35 dB,
which matches the "..." pauses and line breaks in our scripts.
"""
import json
import re
import subprocess
import sys

import imageio_ffmpeg

MIN_PAUSE = 0.25
NOISE_DB = -35


def timings(path):
    ff = imageio_ffmpeg.get_ffmpeg_exe()
    out = subprocess.run(
        [ff, "-hide_banner", "-i", path, "-af", f"silencedetect=noise={NOISE_DB}dB:d={MIN_PAUSE}", "-f", "null", "-"],
        capture_output=True, text=True, encoding="utf-8", errors="replace",
    ).stderr
    m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", out)
    if not m:
        raise SystemExit(f"Can't read {path}")
    length = int(m[1]) * 3600 + int(m[2]) * 60 + float(m[3])
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", out)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", out)]
    pauses = list(zip(starts, ends + [length] * (len(starts) - len(ends))))
    spoken, t = [], 0.0
    for a, b in pauses:
        if a - t > 0.05:
            spoken.append((round(t, 2), round(a, 2)))
        t = b
    if length - t > 0.05:
        spoken.append((round(t, 2), round(length, 2)))
    inner = [(round(a, 2), round(b, 2)) for a, b in pauses if a > 0.05 and b < length - 0.05]
    return round(length, 2), spoken, inner


def main():
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    length, spoken, pauses = timings(sys.argv[1])
    if "--json" in sys.argv:
        print(json.dumps({"length": length, "spoken": spoken, "pauses": pauses}))
        return
    print(f"Length: {length} s")
    print("Spoken parts: " + ", ".join(f"{i}) {a}-{b} s" for i, (a, b) in enumerate(spoken, 1)))
    print("Pauses: " + (", ".join(f"{a}-{b} s" for a, b in pauses) or "none"))


if __name__ == "__main__":
    main()
