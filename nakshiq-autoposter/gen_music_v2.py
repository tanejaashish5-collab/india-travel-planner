#!/usr/bin/env python3
"""
gen_music_v2.py — NakshIQ v2 music generator
Generates 10 production-quality music tracks using numpy/scipy.
Output: 30s, 44100Hz, mono, int16 WAV files in assets/yt_music/
"""

import os
import numpy as np
from scipy.signal import butter, lfilter
from scipy.io import wavfile

SR = 44100
DUR = 30
TOTAL_SAMPLES = SR * DUR
OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "yt_music")

# ─── Utility functions ───────────────────────────────────────────────

def note_freq(name, octave):
    """Get frequency for a note name and octave."""
    notes = {'C': -9, 'C#': -8, 'Db': -8, 'D': -7, 'D#': -6, 'Eb': -6,
             'E': -5, 'F': -4, 'F#': -3, 'Gb': -3, 'G': -2, 'G#': -1,
             'Ab': -1, 'A': 0, 'A#': 1, 'Bb': 1, 'B': 2}
    semitone = notes[name] + (octave - 4) * 12
    return 440.0 * (2.0 ** (semitone / 12.0))


def sine(freq, duration, phase=0.0):
    """Generate sine wave."""
    n = max(1, int(SR * duration))
    t = np.arange(n) / SR
    return np.sin(2 * np.pi * freq * t + phase)


def saw(freq, duration, harmonics=15):
    """Generate saw wave — direct formula, O(n) instant."""
    n = max(1, int(SR * duration))
    t = np.arange(n) / SR
    phase = (freq * t) % 1.0
    return 2.0 * phase - 1.0


def square(freq, duration, harmonics=15):
    """Generate square wave — direct formula, O(n) instant."""
    n = max(1, int(SR * duration))
    t = np.arange(n) / SR
    phase = (freq * t) % 1.0
    return np.where(phase < 0.5, 1.0, -1.0)


def triangle(freq, duration, harmonics=15):
    """Generate triangle wave — direct formula, O(n) instant."""
    n = max(1, int(SR * duration))
    t = np.arange(n) / SR
    phase = (freq * t) % 1.0
    return 4.0 * np.abs(phase - 0.5) - 1.0


def noise(duration):
    """White noise."""
    n = max(1, int(SR * duration))
    return np.random.randn(n)


_filter_cache = {}

def _get_filter(cutoff, btype, order=4):
    """Cached butter filter coefficients."""
    key = (round(cutoff, 1), btype, order)
    if key not in _filter_cache:
        nyq = SR / 2.0
        c = float(cutoff)
        if c >= nyq: c = nyq * 0.99
        if c <= 0: c = 1.0
        _filter_cache[key] = butter(order, c / nyq, btype=btype)
    return _filter_cache[key]


def lowpass(sig, cutoff, order=4):
    """Butterworth low-pass filter (cached coefficients)."""
    b, a = _get_filter(float(cutoff), 'low', order)
    return lfilter(b, a, sig)


def highpass(sig, cutoff, order=4):
    """Butterworth high-pass filter (cached coefficients)."""
    b, a = _get_filter(float(cutoff), 'high', order)
    return lfilter(b, a, sig)


def bandpass(sig, low, high, order=4):
    """Butterworth band-pass filter."""
    low, high = float(low), float(high)
    nyq = SR / 2.0
    low = max(1.0, min(low, nyq * 0.98))
    high = max(low + 1.0, min(high, nyq * 0.99))
    b, a = butter(order, [low / nyq, high / nyq], btype='band')
    return lfilter(b, a, sig)


def reverb(sig, decay_time=0.5, wet=0.3):
    """Lightweight reverb — short delay feedback instead of convolution (10x faster)."""
    delay_samples = int(SR * 0.03)  # 30ms pre-delay
    out = sig.copy()
    feedback = 0.4 * wet
    for tap in [delay_samples, delay_samples * 2, delay_samples * 3]:
        if tap < len(sig):
            decay = np.exp(-np.arange(len(sig) - tap) / (SR * decay_time))
            out[tap:] += sig[:len(sig) - tap] * feedback * decay
            feedback *= 0.5
    return out


def sidechain_envelope(length, kick_positions, attack=0.005, release=0.15, depth=0.5):
    """Vectorized sidechain compression envelope (fast)."""
    env = np.ones(length)
    release_samples = int(SR * release)
    for pos in kick_positions:
        sp = int(pos * SR)
        if sp >= length:
            continue
        end = min(sp + release_samples, length)
        ramp = np.linspace(1.0 - depth, 1.0, end - sp)
        env[sp:end] = np.minimum(env[sp:end], ramp)
    return env


def _make_kick():
    n = max(1, int(SR * 0.15))
    t = np.arange(n) / SR
    freq = 50 + 100 * np.exp(-t * 30)
    phase = np.cumsum(2 * np.pi * freq / SR)
    sig = np.sin(phase) * np.exp(-t * 12)
    click = noise(0.005) * np.exp(-np.arange(max(1, int(SR * 0.005))) / (SR * 0.001))
    sig[:len(click)] += click * 0.3
    return sig

def kick_drum(duration=0.15):
    """Kick drum (cached)."""
    return _cached_drum('kick', _make_kick)


def _make_snare():
    n = max(1, int(SR * 0.12))
    t = np.arange(n) / SR
    body = np.sin(2 * np.pi * 200 * t) * np.exp(-t * 25)
    nz = noise(0.12) * np.exp(-t * 15)
    nz = highpass(nz, 2000.0)
    return body * 0.5 + nz * 0.5

def snare_drum(duration=0.12):
    """Snare drum (cached)."""
    return _cached_drum('snare', _make_snare)


def _make_clap():
    n = max(1, int(SR * 0.1))
    t = np.arange(n) / SR
    sig = np.zeros(n)
    for offset in [0, 0.01, 0.02]:
        start = int(offset * SR)
        burst_len = min(int(0.008 * SR), n - start)
        if burst_len > 0:
            sig[start:start + burst_len] += np.random.randn(burst_len) * 0.5
    sig *= np.exp(-t * 20)
    sig = bandpass(sig, 800.0, 6000.0)
    return sig

def clap(duration=0.1):
    """Clap (cached)."""
    return _cached_drum('clap', _make_clap)


_drum_cache = {}

def _cached_drum(name, gen_fn):
    """Cache drum sounds — generate once, copy on use."""
    if name not in _drum_cache:
        _drum_cache[name] = gen_fn()
    return _drum_cache[name].copy()


def _make_hh_closed():
    n = max(1, int(SR * 0.04))
    t = np.arange(n) / SR
    sig = noise(0.04) * np.exp(-t * 80)
    return highpass(sig, 6000.0)

def hihat_closed(duration=0.04):
    """Closed hihat (cached)."""
    return _cached_drum('hh_closed', _make_hh_closed)


def _make_hh_open():
    n = max(1, int(SR * 0.15))
    t = np.arange(n) / SR
    sig = noise(0.15) * np.exp(-t * 12)
    return highpass(sig, 5000.0)

def hihat_open(duration=0.15):
    """Open hihat (cached)."""
    return _cached_drum('hh_open', _make_hh_open)


def _make_shaker():
    n = max(1, int(SR * 0.03))
    t = np.arange(n) / SR
    sig = noise(0.03) * np.exp(-t * 60)
    return highpass(sig, 8000.0) * 0.3

def shaker(duration=0.03):
    """Shaker hit (cached)."""
    return _cached_drum('shaker', _make_shaker)


def _make_ride():
    n = max(1, int(SR * 0.3))
    t = np.arange(n) / SR
    sig = noise(0.3) * np.exp(-t * 5)
    return bandpass(sig, 3000.0, 10000.0) * 0.25

def ride(duration=0.3):
    """Ride cymbal (cached)."""
    return _cached_drum('ride', _make_ride)


def cowbell(duration=0.08):
    """Cowbell."""
    n = max(1, int(SR * duration))
    t = np.arange(n) / SR
    sig = (np.sin(2 * np.pi * 587 * t) + np.sin(2 * np.pi * 845 * t)) * np.exp(-t * 20)
    return sig


def vinyl_crackle(duration):
    """Vinyl crackle noise layer."""
    n = max(1, int(SR * duration))
    sig = np.zeros(n)
    # Random pops
    num_pops = int(duration * 30)
    for _ in range(num_pops):
        pos = np.random.randint(0, n)
        pop_len = min(np.random.randint(5, 50), n - pos)
        if pop_len > 0:
            sig[pos:pos + pop_len] += np.random.randn(pop_len) * np.random.uniform(0.02, 0.1)
    # Constant low rumble
    rumble = lowpass(np.random.randn(n) * 0.01, 500.0)
    return sig + rumble


def pad_chord(freqs, duration, wave='sine', detune_cents=3):
    """Generate a pad chord with detuning for thickness."""
    n = max(1, int(SR * duration))
    sig = np.zeros(n)
    for f in freqs:
        # Main oscillator
        if wave == 'sine':
            sig += sine(f, duration)
        elif wave == 'saw':
            sig += saw(f, duration)
        elif wave == 'triangle':
            sig += triangle(f, duration)
        elif wave == 'square':
            sig += square(f, duration)
        # Detuned layer for thickness
        detune_ratio = 2 ** (detune_cents / 1200.0)
        if wave == 'sine':
            sig += sine(f * detune_ratio, duration) * 0.5
            sig += sine(f / detune_ratio, duration) * 0.5
        elif wave == 'saw':
            sig += saw(f * detune_ratio, duration) * 0.5
            sig += saw(f / detune_ratio, duration) * 0.5
    return sig / max(1, len(freqs))


def arp_pattern(freqs, duration, bpm, subdivision=4, wave='sine'):
    """Arpeggiate through chord tones with velocity variation."""
    n = max(1, int(SR * duration))
    sig = np.zeros(n)
    beat_dur = 60.0 / bpm
    step_dur = beat_dur / subdivision
    step_samples = int(step_dur * SR)
    if step_samples < 10:
        return sig
    num_steps = n // step_samples
    for i in range(num_steps):
        freq = freqs[i % len(freqs)]
        velocity = np.random.uniform(0.6, 1.0)
        start = i * step_samples
        end = min(start + step_samples, n)
        seg_dur = (end - start) / SR
        if seg_dur < 0.005:
            continue
        note = sine(freq, seg_dur) * velocity
        # Apply note envelope
        env = np.exp(-np.arange(len(note)) / (SR * step_dur * 0.5))
        note *= env
        sig[start:start + len(note)] += note
    return sig


def bass_note(freq, duration, style='saw'):
    """Bass with sub-bass layer and optional portamento."""
    n = max(1, int(SR * duration))
    if style == 'saw':
        main = saw(freq, duration, harmonics=8)
        main = lowpass(main, min(float(freq * 4), 4000.0))
    elif style == '808':
        t = np.arange(n) / SR
        # 808 pitch drop
        pitch = freq + 20 * np.exp(-t * 15)
        phase = np.cumsum(2 * np.pi * pitch / SR)
        main = np.sin(phase)
        # Distortion
        main = np.tanh(main * 2)
    else:
        main = sine(freq, duration)
    # Sub-bass layer (one octave below)
    sub = sine(freq / 2, duration) * 0.6
    return main * 0.7 + sub * 0.3


def fade_in_out(sig, fade_in=1.0, fade_out=2.0):
    """Apply fade in and fade out."""
    n = len(sig)
    fi = int(SR * fade_in)
    fo = int(SR * fade_out)
    if fi > 0:
        sig[:fi] *= np.linspace(0, 1, fi)
    if fo > 0:
        sig[-fo:] *= np.linspace(1, 0, fo)
    return sig


def master_compress(sig):
    """Soft-clip master compression."""
    return np.tanh(sig * 1.5) / np.tanh(1.5)


def normalize(sig, peak=0.9):
    """Normalize to peak level."""
    mx = np.max(np.abs(sig))
    if mx > 0:
        sig = sig * (peak / mx)
    return sig


def save_track(sig, filename):
    """Normalize, compress, fade, convert to int16 and save."""
    sig = np.copy(sig)
    # Ensure correct length
    if len(sig) > TOTAL_SAMPLES:
        sig = sig[:TOTAL_SAMPLES]
    elif len(sig) < TOTAL_SAMPLES:
        sig = np.pad(sig, (0, TOTAL_SAMPLES - len(sig)))
    sig = fade_in_out(sig)
    sig = normalize(sig, 0.9)
    sig = master_compress(sig)
    sig = normalize(sig, 0.9)
    sig_int16 = (sig * 32767).astype(np.int16)
    filepath = os.path.join(OUT_DIR, filename)
    wavfile.write(filepath, SR, sig_int16)
    print(f"  Saved: {filepath}")


def mix_to_length(*layers):
    """Mix multiple layers, padding each to TOTAL_SAMPLES."""
    out = np.zeros(TOTAL_SAMPLES)
    for layer in layers:
        if len(layer) > TOTAL_SAMPLES:
            layer = layer[:TOTAL_SAMPLES]
        out[:len(layer)] += layer
    return out


def place(sig, position_sec, target_len=TOTAL_SAMPLES):
    """Place a sound at a specific time position in a buffer."""
    out = np.zeros(target_len)
    start = int(position_sec * SR)
    if start >= target_len:
        return out
    end = min(start + len(sig), target_len)
    out[start:end] = sig[:end - start]
    return out


def get_kick_positions(bpm, pattern='four_on_floor'):
    """Get kick positions in seconds for 30 seconds."""
    beat_dur = 60.0 / bpm
    positions = []
    if pattern == 'four_on_floor':
        t = 0
        while t < DUR:
            positions.append(t)
            t += beat_dur
    elif pattern == 'half':
        t = 0
        while t < DUR:
            positions.append(t)
            t += beat_dur * 2
    elif pattern == 'trap':
        bar_dur = beat_dur * 4
        t = 0
        while t < DUR:
            positions.append(t)
            positions.append(t + beat_dur * 2.5)
            t += bar_dur
    elif pattern == 'offbeat':
        t = 0
        while t < DUR:
            positions.append(t)
            positions.append(t + beat_dur * 1.5)
            positions.append(t + beat_dur * 3)
            t += beat_dur * 4
    return positions


# ─── Chord definitions ───────────────────────────────────────────────

def chord(root, quality='major', octave=4):
    """Build a chord from root note name."""
    r = note_freq(root, octave)
    if quality == 'major':
        return [r, r * 2**(4/12), r * 2**(7/12)]
    elif quality == 'minor':
        return [r, r * 2**(3/12), r * 2**(7/12)]
    elif quality == 'maj7':
        return [r, r * 2**(4/12), r * 2**(7/12), r * 2**(11/12)]
    elif quality == 'min7':
        return [r, r * 2**(3/12), r * 2**(7/12), r * 2**(10/12)]
    elif quality == 'dom7':
        return [r, r * 2**(4/12), r * 2**(7/12), r * 2**(10/12)]
    elif quality == 'dim':
        return [r, r * 2**(3/12), r * 2**(6/12)]
    elif quality == 'sus4':
        return [r, r * 2**(5/12), r * 2**(7/12)]
    return [r]


# ─── Track generators ────────────────────────────────────────────────

def gen_amapiano_deep():
    """Track 1: Deep amapiano — log drum, sidechain pads, 115 BPM."""
    print("  Generating amapiano_deep...")
    bpm = 115
    beat = 60.0 / bpm
    bar = beat * 4

    # Chord progression: Am -> F -> C -> G
    chords = [
        chord('A', 'minor', 3), chord('F', 'major', 3),
        chord('C', 'major', 3), chord('G', 'major', 3)
    ]

    # Pads
    pads = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        seg = pad_chord(c, min(bar, DUR - t), wave='saw', detune_cents=4)
        seg = lowpass(seg, 2000.0)
        pads = pads + place(seg * 0.25, t)
        chord_idx += 1
        t += bar

    # Log drum (characteristic amapiano element) — tuned percussion
    log_drum_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    while t < DUR:
        # Log drum pattern: syncopated
        for offset in [0, beat * 1.5, beat * 2.5, beat * 3]:
            pos = t + offset
            if pos < DUR:
                n = int(SR * 0.2)
                tt = np.arange(n) / SR
                # Wooden resonant tone
                log_tone = np.sin(2 * np.pi * 280 * tt) * np.exp(-tt * 15)
                log_tone += np.sin(2 * np.pi * 420 * tt) * np.exp(-tt * 20) * 0.5
                log_drum_layer = log_drum_layer + place(log_tone * 0.35, pos)
        t += bar

    # Kicks
    kick_pos = get_kick_positions(bpm, 'four_on_floor')
    kick_layer = np.zeros(TOTAL_SAMPLES)
    for pos in kick_pos:
        kick_layer = kick_layer + place(kick_drum(0.2) * 0.9, pos)

    # Sidechain the pads
    sc_env = sidechain_envelope(TOTAL_SAMPLES, kick_pos, depth=0.55, release=0.15)
    pads *= sc_env

    # Hihats — bouncy pattern
    hh_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    step = beat / 2
    i = 0
    while t < DUR:
        if i % 4 == 2:  # open hat on upbeats
            hh_layer = hh_layer + place(hihat_open(0.1) * 0.2, t)
        else:
            hh_layer = hh_layer + place(hihat_closed() * 0.25, t)
        i += 1
        t += step

    # Shaker 16ths
    shaker_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    while t < DUR:
        shaker_layer = shaker_layer + place(shaker() * 0.15, t)
        t += beat / 4

    # Snare/clap on 2 and 4
    snare_layer = np.zeros(TOTAL_SAMPLES)
    t = beat
    while t < DUR:
        snare_layer = snare_layer + place(snare_drum() * 0.4, t)
        snare_layer = snare_layer + place(clap() * 0.3, t)
        t += beat * 2

    # Ghost snares
    ghost_layer = np.zeros(TOTAL_SAMPLES)
    t = beat * 0.75
    while t < DUR:
        ghost_layer = ghost_layer + place(snare_drum(0.06) * 0.08, t)
        t += beat

    # Bass — bouncy amapiano bass
    bass_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        root = c[0]
        # Bouncy pattern
        for offset in [0, beat * 1.5, beat * 3]:
            pos = t + offset
            if pos < DUR:
                b = bass_note(root / 2, 0.2, style='saw')
                bass_layer = bass_layer + place(b * 0.4, pos)
        chord_idx += 1
        t += bar

    # Arp
    arp_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        arp_freqs = [f * 2 for f in c]  # octave up
        seg = arp_pattern(arp_freqs, min(bar, DUR - t), bpm, 4, 'sine')
        arp_layer = arp_layer + place(seg * 0.15, t)
        chord_idx += 1
        t += bar
    arp_layer = reverb(arp_layer, 0.5, 0.3)

    pads = reverb(pads, 0.6, 0.35)

    mix = mix_to_length(pads, log_drum_layer, kick_layer, hh_layer, shaker_layer,
                        snare_layer, ghost_layer, bass_layer, arp_layer)
    return mix


def gen_cinematic_rise():
    """Track 2: Cinematic build with strings pad + epic drums, 90 BPM."""
    print("  Generating cinematic_rise...")
    bpm = 90
    beat = 60.0 / bpm
    bar = beat * 4

    # Cm -> Ab -> Eb -> Bb
    chords = [
        chord('C', 'minor', 3), chord('Ab', 'major', 3),
        chord('Eb', 'major', 3), chord('Bb', 'major', 3)
    ]

    # Strings pad — layered saws with heavy reverb
    pads = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        dur = min(bar, DUR - t)
        seg = pad_chord(c, dur, wave='saw', detune_cents=5)
        seg = lowpass(seg, 1500.0)
        # Rising intensity: gradual volume increase
        rise = np.linspace(0.15 + 0.15 * (t / DUR), 0.3 + 0.3 * (t / DUR), len(seg))
        seg *= rise
        pads = pads + place(seg, t)
        chord_idx += 1
        t += bar
    pads = reverb(pads, 0.8, 0.4)

    # Epic drums — building over time
    kick_layer = np.zeros(TOTAL_SAMPLES)
    snare_layer = np.zeros(TOTAL_SAMPLES)
    # First half: sparse, second half: full
    t = 0
    while t < DUR:
        intensity = t / DUR
        kick_layer = kick_layer + place(kick_drum(0.25) * (0.5 + 0.5 * intensity), t)
        if intensity > 0.3:
            # Snare on beats 2 and 4
            snare_layer = snare_layer + place(snare_drum(0.15) * (0.3 + 0.4 * intensity), t + beat)
            snare_layer = snare_layer + place(clap(0.1) * (0.2 + 0.3 * intensity), t + beat)
            if t + beat * 3 < DUR:
                snare_layer = snare_layer + place(snare_drum(0.15) * (0.3 + 0.4 * intensity), t + beat * 3)
        t += bar

    # Timpani-like hits that build
    timpani = np.zeros(TOTAL_SAMPLES)
    t = DUR * 0.5
    while t < DUR:
        n = int(SR * 0.4)
        tt = np.arange(n) / SR
        timp = np.sin(2 * np.pi * 80 * tt) * np.exp(-tt * 6) * 0.5
        timpani = timpani + place(timp, t)
        t += bar

    # Rising noise sweep
    rise_noise = np.zeros(TOTAL_SAMPLES)
    sweep_start = int(TOTAL_SAMPLES * 0.6)
    sweep_len = TOTAL_SAMPLES - sweep_start
    ns = noise(sweep_len / SR)
    # Sweep filter up
    for i in range(0, sweep_len, SR // 4):
        progress = i / sweep_len
        cutoff = 200 + 8000 * progress
        chunk_end = min(i + SR // 4, sweep_len)
        chunk = ns[i:chunk_end]
        if len(chunk) > 100:
            chunk = lowpass(chunk, float(cutoff))
            rise_noise[sweep_start + i:sweep_start + i + len(chunk)] = chunk * progress * 0.15

    # Cymbal roll at the end
    cymbal_layer = np.zeros(TOTAL_SAMPLES)
    t = DUR - 4
    step = 0.1
    while t < DUR:
        cymbal_layer = cymbal_layer + place(ride(0.15) * 0.3, t)
        t += step
        step *= 0.97

    # Sub bass drone
    sub = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        root = c[0] / 2
        dur = min(bar, DUR - t)
        s = sine(root, dur) * 0.3
        sub = sub + place(s, t)
        chord_idx += 1
        t += bar

    mix = mix_to_length(pads, kick_layer, snare_layer, timpani, rise_noise, cymbal_layer, sub)
    return mix


def gen_lofi_sunset():
    """Track 3: Lofi with vinyl crackle + jazz chords + dusty drums, 75 BPM."""
    print("  Generating lofi_sunset...")
    bpm = 75
    beat = 60.0 / bpm
    bar = beat * 4

    # Cmaj7 -> Am7 -> Dm7 -> G7
    chords = [
        chord('C', 'maj7', 3), chord('A', 'min7', 3),
        chord('D', 'min7', 3), chord('G', 'dom7', 3)
    ]

    # Rhodes-like keys (sine + slight harmonics)
    keys = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        dur = min(bar, DUR - t)
        # Rhodes: sine with 2nd harmonic
        seg = np.zeros(max(1, int(SR * dur)))
        for f in c:
            seg += sine(f, dur) * 0.7
            seg += sine(f * 2, dur) * 0.15  # 2nd harmonic
            seg += sine(f * 3, dur) * 0.05  # 3rd harmonic
        seg /= len(c)
        # Gentle envelope
        env_len = len(seg)
        env = np.exp(-np.arange(env_len) / (SR * 1.5))
        seg *= env * 0.3
        keys = keys + place(seg, t)
        chord_idx += 1
        t += bar
    keys = lowpass(keys, 3000.0)
    keys = reverb(keys, 0.6, 0.3)

    # Dusty drums
    kick_layer = np.zeros(TOTAL_SAMPLES)
    snare_layer = np.zeros(TOTAL_SAMPLES)
    hh_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    while t < DUR:
        # Boom bap pattern
        kick_layer = kick_layer + place(kick_drum(0.15) * 0.7, t)
        kick_layer = kick_layer + place(kick_drum(0.15) * 0.5, t + beat * 1.75)
        kick_layer = kick_layer + place(kick_drum(0.15) * 0.6, t + beat * 2.5)
        # Snare on 2 and 4
        if t + beat < DUR:
            snare_layer = snare_layer + place(snare_drum(0.1) * 0.45, t + beat)
        if t + beat * 3 < DUR:
            snare_layer = snare_layer + place(snare_drum(0.1) * 0.45, t + beat * 3)
        # Ghost snares
        if t + beat * 2.25 < DUR:
            snare_layer = snare_layer + place(snare_drum(0.05) * 0.1, t + beat * 2.25)
        t += bar

    # Hihats with swing
    t = 0
    i = 0
    while t < DUR:
        swing = 0.02 if i % 2 == 1 else 0
        hh_layer = hh_layer + place(hihat_closed(0.03) * np.random.uniform(0.15, 0.25), t + swing)
        i += 1
        t += beat / 2
    snare_layer = lowpass(snare_layer, 5000.0)  # Dusty

    # Vinyl crackle
    crackle = vinyl_crackle(DUR) * 0.08

    # Soft bass
    bass_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        root = c[0] / 2
        dur = min(bar, DUR - t)
        b = sine(root, dur)
        env = np.exp(-np.arange(len(b)) / (SR * 0.8))
        b *= env * 0.3
        bass_layer = bass_layer + place(b, t)
        chord_idx += 1
        t += bar
    bass_layer = lowpass(bass_layer, 800.0)

    mix = mix_to_length(keys, kick_layer, snare_layer, hh_layer, crackle, bass_layer)
    # Lofi: bitcrush simulation — reduce bit depth slightly
    mix = lowpass(mix, 8000.0)
    return mix


def gen_desi_trap():
    """Track 4: Indian scale (Bhairav) + 808 bass + trap hihats, 140 BPM."""
    print("  Generating desi_trap...")
    bpm = 140
    beat = 60.0 / bpm
    bar = beat * 4

    # Bhairav scale: C Db E F G Ab B — exotic intervals
    # Chords: Am -> Dm -> E -> Am (harmonic minor feel)
    chords = [
        chord('A', 'minor', 3), chord('D', 'minor', 3),
        [note_freq('E', 3), note_freq('G#', 3), note_freq('B', 3)],  # E major
        chord('A', 'minor', 3)
    ]

    # Melody using Bhairav intervals
    bhairav_notes = [
        note_freq('A', 4), note_freq('Bb', 4), note_freq('C#', 5),
        note_freq('D', 5), note_freq('E', 5), note_freq('F', 5),
        note_freq('G#', 5), note_freq('A', 5)
    ]

    melody = np.zeros(TOTAL_SAMPLES)
    t = 0
    while t < DUR:
        # Melodic phrase
        for i in range(8):
            pos = t + i * beat / 2
            if pos >= DUR:
                break
            note_idx = np.random.choice(len(bhairav_notes))
            freq = bhairav_notes[note_idx]
            n = max(1, int(SR * beat / 2))
            tt = np.arange(n) / SR
            # Sitar-like: triangle wave with quick decay
            mel = triangle(freq, beat / 2)
            mel *= np.exp(-tt * 6)
            melody = melody + place(mel * 0.2, pos)
        t += bar
    melody = reverb(melody, 0.4, 0.25)

    # 808 bass
    bass_layer = np.zeros(TOTAL_SAMPLES)
    kick_pos = get_kick_positions(bpm, 'trap')
    for pos in kick_pos:
        b = bass_note(note_freq('A', 1), 0.4, style='808')
        bass_layer = bass_layer + place(b * 0.5, pos)

    # Kicks
    kick_layer = np.zeros(TOTAL_SAMPLES)
    for pos in kick_pos:
        kick_layer = kick_layer + place(kick_drum(0.2) * 0.8, pos)

    # Trap hihats — rapid rolls
    hh_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    while t < DUR:
        # Regular 8th notes with occasional rolls
        for i in range(8):
            pos = t + i * beat / 2
            if pos >= DUR:
                break
            hh_layer = hh_layer + place(hihat_closed(0.03) * 0.2, pos)
        # Roll on beat 4
        roll_start = t + beat * 3
        for j in range(8):
            pos = roll_start + j * beat / 8
            if pos >= DUR:
                break
            hh_layer = hh_layer + place(hihat_closed(0.02) * (0.15 + 0.05 * (j / 8)), pos)
        t += bar

    # Snare/clap on 2 and 4
    snare_layer = np.zeros(TOTAL_SAMPLES)
    t = beat
    while t < DUR:
        snare_layer = snare_layer + place(snare_drum() * 0.5, t)
        snare_layer = snare_layer + place(clap() * 0.4, t)
        t += beat * 2
    snare_layer = reverb(snare_layer, 0.3, 0.2)

    # Dark pad
    pad_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        dur = min(bar, DUR - t)
        seg = pad_chord(c, dur, wave='saw', detune_cents=4)
        seg = lowpass(seg, 1200.0)
        pad_layer = pad_layer + place(seg * 0.12, t)
        chord_idx += 1
        t += bar
    pad_layer = reverb(pad_layer, 0.5, 0.3)
    sc_env = sidechain_envelope(TOTAL_SAMPLES, kick_pos, depth=0.5)
    pad_layer *= sc_env

    mix = mix_to_length(melody, bass_layer, kick_layer, hh_layer, snare_layer, pad_layer)
    return mix


def gen_afrobeats_groove():
    """Track 5: Afrobeats percussion + bouncy bass + bright pads, 105 BPM."""
    print("  Generating afrobeats_groove...")
    bpm = 105
    beat = 60.0 / bpm
    bar = beat * 4

    # Bright major progression
    chords = [
        chord('C', 'major', 4), chord('G', 'major', 3),
        chord('A', 'minor', 3), chord('F', 'major', 3)
    ]

    # Bright pads
    pads = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        dur = min(bar, DUR - t)
        seg = pad_chord(c, dur, wave='triangle', detune_cents=3)
        seg = lowpass(seg, 4000.0)
        pads = pads + place(seg * 0.2, t)
        chord_idx += 1
        t += bar
    pads = reverb(pads, 0.4, 0.25)

    # Percussion — afro-style
    kick_layer = np.zeros(TOTAL_SAMPLES)
    snare_layer = np.zeros(TOTAL_SAMPLES)
    perc_layer = np.zeros(TOTAL_SAMPLES)

    t = 0
    while t < DUR:
        # Kick on 1 and "and of 2"
        kick_layer = kick_layer + place(kick_drum() * 0.8, t)
        if t + beat * 1.5 < DUR:
            kick_layer = kick_layer + place(kick_drum() * 0.6, t + beat * 1.5)
        if t + beat * 2.5 < DUR:
            kick_layer = kick_layer + place(kick_drum() * 0.7, t + beat * 2.5)
        # Snare on 2 and 4
        if t + beat < DUR:
            snare_layer = snare_layer + place(snare_drum() * 0.4, t + beat)
            snare_layer = snare_layer + place(clap() * 0.3, t + beat)
        if t + beat * 3 < DUR:
            snare_layer = snare_layer + place(snare_drum() * 0.4, t + beat * 3)
            snare_layer = snare_layer + place(clap() * 0.3, t + beat * 3)
        # Shaker pattern — 16ths
        for i in range(16):
            pos = t + i * beat / 4
            if pos < DUR:
                perc_layer = perc_layer + place(shaker() * np.random.uniform(0.1, 0.2), pos)
        # Conga-like hits
        for offset in [beat * 0.75, beat * 1.25, beat * 2.75, beat * 3.25]:
            pos = t + offset
            if pos < DUR:
                n = int(SR * 0.08)
                tt = np.arange(n) / SR
                conga = np.sin(2 * np.pi * 350 * tt) * np.exp(-tt * 30)
                perc_layer = perc_layer + place(conga * 0.2, pos)
        t += bar

    # Hihats
    hh_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    i = 0
    while t < DUR:
        if i % 4 == 3:
            hh_layer = hh_layer + place(hihat_open(0.1) * 0.15, t)
        else:
            hh_layer = hh_layer + place(hihat_closed() * 0.2, t)
        i += 1
        t += beat / 2

    # Bouncy bass
    bass_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        root = c[0] / 2
        for offset in [0, beat * 1.5, beat * 2.5]:
            pos = t + offset
            if pos < DUR:
                b = bass_note(root, 0.15, style='saw')
                bass_layer = bass_layer + place(b * 0.4, pos)
        chord_idx += 1
        t += bar

    # Guitar-like arp
    arp_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        arp_freqs = c + [c[0] * 2]
        seg = arp_pattern(arp_freqs, min(bar, DUR - t), bpm, 4, 'triangle')
        arp_layer = arp_layer + place(seg * 0.12, t)
        chord_idx += 1
        t += bar

    kick_pos = get_kick_positions(bpm, 'offbeat')
    sc_env = sidechain_envelope(TOTAL_SAMPLES, kick_pos, depth=0.4)
    pads *= sc_env

    mix = mix_to_length(pads, kick_layer, snare_layer, perc_layer, hh_layer, bass_layer, arp_layer)
    return mix


def gen_future_bass_drop():
    """Track 6: Supersaw chords + sidechain + arp buildup, 150 BPM."""
    print("  Generating future_bass_drop...")
    bpm = 150
    beat = 60.0 / bpm
    bar = beat * 4

    # Emotional progression
    chords = [
        chord('F', 'major', 4), chord('A', 'minor', 3),
        chord('C', 'major', 4), chord('G', 'major', 3)
    ]

    # Supersaw chords
    supersaw = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        dur = min(bar, DUR - t)
        # Multiple detuned saws for "super" effect
        seg = np.zeros(max(1, int(SR * dur)))
        for f in c:
            for detune in [-7, -3, 0, 3, 7]:
                ratio = 2 ** (detune / 1200.0)
                seg += saw(f * ratio, dur) * 0.1
        seg = lowpass(seg, 5000.0)
        # In the "drop" section (after 50%), louder
        if t > DUR * 0.5:
            seg *= 0.35
        else:
            seg *= 0.15
        supersaw = supersaw + place(seg, t)
        chord_idx += 1
        t += bar
    supersaw = reverb(supersaw, 0.5, 0.3)

    # Buildup section — rising arp in first half
    arp_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR * 0.5:
        c = chords[chord_idx % 4]
        arp_freqs = sorted(c + [c[0] * 2])
        dur = min(bar, DUR * 0.5 - t)
        if dur < 0.1:
            break
        seg = arp_pattern(arp_freqs, dur, bpm, 4, 'saw')
        seg = lowpass(seg, 3000.0 + 5000 * (t / (DUR * 0.5)))
        arp_layer = arp_layer + place(seg * 0.15, t)
        chord_idx += 1
        t += bar
    arp_layer = reverb(arp_layer, 0.4, 0.25)

    # Kick — four on floor in drop
    kick_pos = []
    kick_layer = np.zeros(TOTAL_SAMPLES)
    t = DUR * 0.5
    while t < DUR:
        kick_pos.append(t)
        kick_layer = kick_layer + place(kick_drum(0.2) * 0.9, t)
        t += beat

    # Build kick (half time before drop)
    t = 0
    while t < DUR * 0.5:
        kick_layer = kick_layer + place(kick_drum(0.15) * 0.5, t)
        kick_pos.append(t)
        t += beat * 2

    # Sidechain
    sc_env = sidechain_envelope(TOTAL_SAMPLES, kick_pos, depth=0.6, release=0.12)
    supersaw *= sc_env

    # Snare builds — accelerating before drop
    snare_layer = np.zeros(TOTAL_SAMPLES)
    # Normal snare in drop
    t = DUR * 0.5 + beat
    while t < DUR:
        snare_layer = snare_layer + place(snare_drum() * 0.5, t)
        snare_layer = snare_layer + place(clap() * 0.35, t)
        t += beat * 2
    # Snare roll before drop
    roll_dur = 4.0  # 4 seconds of roll
    roll_start = DUR * 0.5 - roll_dur
    t = roll_start
    interval = 0.3
    while t < DUR * 0.5:
        snare_layer = snare_layer + place(snare_drum(0.08) * 0.3, t)
        interval *= 0.93
        t += max(interval, 0.05)

    # Rise FX
    rise_layer = np.zeros(TOTAL_SAMPLES)
    n = int(SR * DUR * 0.5)
    rise = noise(DUR * 0.5) * np.linspace(0, 0.15, n)
    rise = highpass(rise, 1000.0)
    rise_layer[:n] = rise[:n]

    # Drop impact
    impact_pos = int(DUR * 0.5 * SR)
    if impact_pos + SR < TOTAL_SAMPLES:
        impact = noise(1.0) * np.exp(-np.arange(SR) / (SR * 0.3)) * 0.3
        impact = lowpass(impact, 500.0)
        rise_layer[impact_pos:impact_pos + SR] += impact

    # Bass in drop
    bass_layer = np.zeros(TOTAL_SAMPLES)
    t = DUR * 0.5
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        root = c[0] / 2
        dur = min(bar, DUR - t)
        b = bass_note(root, dur, style='saw')
        bass_layer = bass_layer + place(b * 0.35, t)
        chord_idx += 1
        t += bar

    # Hihats in drop
    hh_layer = np.zeros(TOTAL_SAMPLES)
    t = DUR * 0.5
    while t < DUR:
        hh_layer = hh_layer + place(hihat_closed() * 0.2, t)
        t += beat / 2

    mix = mix_to_length(supersaw, arp_layer, kick_layer, snare_layer, rise_layer, bass_layer, hh_layer)
    return mix


def gen_minimal_tech():
    """Track 7: Minimal techno, hypnotic loop, sidechain, 125 BPM."""
    print("  Generating minimal_tech...")
    bpm = 125
    beat = 60.0 / bpm
    bar = beat * 4

    # Minimal: just Am and Dm
    chords = [
        chord('A', 'minor', 3), chord('A', 'minor', 3),
        chord('D', 'minor', 3), chord('D', 'minor', 3)
    ]

    # Hypnotic pad — filtered saw
    pad_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        dur = min(bar * 2, DUR - t)  # Long chords
        seg = pad_chord(c, dur, wave='saw', detune_cents=3)
        # Slowly evolving filter
        progress = t / DUR
        seg = lowpass(seg, 800.0 + 2000.0 * progress)
        pad_layer = pad_layer + place(seg * 0.18, t)
        chord_idx += 2
        t += bar * 2
    pad_layer = reverb(pad_layer, 0.7, 0.35)

    # Relentless kick
    kick_pos = get_kick_positions(bpm, 'four_on_floor')
    kick_layer = np.zeros(TOTAL_SAMPLES)
    for pos in kick_pos:
        kick_layer = kick_layer + place(kick_drum(0.2) * 0.85, pos)

    # Sidechain everything
    sc_env = sidechain_envelope(TOTAL_SAMPLES, kick_pos, depth=0.55, release=0.15)
    pad_layer *= sc_env

    # Closed hihats — offbeat
    hh_layer = np.zeros(TOTAL_SAMPLES)
    t = beat / 2
    while t < DUR:
        hh_layer = hh_layer + place(hihat_closed(0.03) * 0.22, t)
        t += beat

    # Ride every 2 beats
    ride_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    while t < DUR:
        ride_layer = ride_layer + place(ride(0.2) * 0.15, t)
        t += beat * 2

    # Minimal snare — clap on 2 and 4
    clap_layer = np.zeros(TOTAL_SAMPLES)
    t = beat
    while t < DUR:
        clap_layer = clap_layer + place(clap() * 0.35, t)
        t += beat * 2
    clap_layer = reverb(clap_layer, 0.4, 0.2)

    # Hypnotic stab — short chord stab repeating
    stab_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        # Stab on the "and" of beat 3
        pos = t + beat * 2.5
        if pos < DUR:
            stab = pad_chord(c, 0.08, wave='saw')
            stab *= np.exp(-np.arange(len(stab)) / (SR * 0.03))
            stab_layer = stab_layer + place(stab * 0.2, pos)
        chord_idx += 1
        t += bar
    stab_layer = reverb(stab_layer, 0.3, 0.3)
    stab_layer *= sc_env

    # Perc loop — rimshot-like
    perc_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    while t < DUR:
        for offset in [beat * 0.75, beat * 2.25, beat * 3.75]:
            pos = t + offset
            if pos < DUR:
                n = int(SR * 0.02)
                tt = np.arange(n) / SR
                rim = np.sin(2 * np.pi * 800 * tt) * np.exp(-tt * 100)
                perc_layer = perc_layer + place(rim * 0.12, pos)
        t += bar

    # Sub bass — pulsing
    bass_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        root = c[0] / 2
        for i in range(4):
            pos = t + i * beat
            if pos < DUR:
                b = sine(root, beat * 0.5) * 0.3
                env = np.exp(-np.arange(len(b)) / (SR * 0.15))
                b *= env
                bass_layer = bass_layer + place(b, pos)
        chord_idx += 1
        t += bar

    mix = mix_to_length(pad_layer, kick_layer, hh_layer, ride_layer, clap_layer,
                        stab_layer, perc_layer, bass_layer)
    return mix


def gen_bollywood_modern():
    """Track 8: Modern Bollywood pop feel, bright + emotional, 110 BPM."""
    print("  Generating bollywood_modern...")
    bpm = 110
    beat = 60.0 / bpm
    bar = beat * 4

    # Bright emotional progression
    chords = [
        chord('C', 'major', 4), chord('A', 'minor', 3),
        chord('F', 'major', 3), chord('G', 'major', 3)
    ]

    # Bright string pad
    pad_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        dur = min(bar, DUR - t)
        seg = pad_chord(c, dur, wave='saw', detune_cents=4)
        seg = lowpass(seg, 3500.0)
        pad_layer = pad_layer + place(seg * 0.18, t)
        chord_idx += 1
        t += bar
    pad_layer = reverb(pad_layer, 0.5, 0.3)

    # Melody — pentatonic-ish Bollywood feel
    melody_notes = [
        note_freq('C', 5), note_freq('D', 5), note_freq('E', 5),
        note_freq('G', 5), note_freq('A', 5), note_freq('C', 6),
        note_freq('B', 5)
    ]
    melody = np.zeros(TOTAL_SAMPLES)
    np.random.seed(42)
    t = 0
    while t < DUR:
        # Phrase of 4-8 notes
        phrase_len = np.random.randint(4, 8)
        for i in range(phrase_len):
            dur = beat * np.random.choice([0.5, 0.5, 1.0, 0.25])
            if t >= DUR:
                break
            freq = np.random.choice(melody_notes)
            n = max(1, int(SR * dur))
            tt = np.arange(n) / SR
            # Flute-like: sine with vibrato
            vibrato = 1 + 0.005 * np.sin(2 * np.pi * 5 * tt)
            mel = np.sin(2 * np.pi * freq * vibrato * tt)
            mel *= np.exp(-tt * (3 if dur > 0.3 else 8))
            melody = melody + place(mel * 0.15, t)
            t += dur
        t += beat  # Gap between phrases
    melody = reverb(melody, 0.4, 0.25)

    # Drums — Bollywood pop
    kick_layer = np.zeros(TOTAL_SAMPLES)
    snare_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    while t < DUR:
        kick_layer = kick_layer + place(kick_drum() * 0.8, t)
        kick_layer = kick_layer + place(kick_drum() * 0.5, t + beat * 1.75)
        if t + beat < DUR:
            snare_layer = snare_layer + place(snare_drum() * 0.45, t + beat)
            snare_layer = snare_layer + place(clap() * 0.3, t + beat)
        if t + beat * 3 < DUR:
            snare_layer = snare_layer + place(snare_drum() * 0.45, t + beat * 3)
            snare_layer = snare_layer + place(clap() * 0.3, t + beat * 3)
        t += bar

    # Dholak-like percussion
    dholak = np.zeros(TOTAL_SAMPLES)
    t = 0
    while t < DUR:
        # "Dha" — low hit
        for offset in [0, beat * 2]:
            pos = t + offset
            if pos < DUR:
                n = int(SR * 0.1)
                tt = np.arange(n) / SR
                hit = np.sin(2 * np.pi * 150 * tt) * np.exp(-tt * 25)
                dholak = dholak + place(hit * 0.2, pos)
        # "Ti" — high hit
        for offset in [beat * 0.75, beat * 1.5, beat * 2.75, beat * 3.5]:
            pos = t + offset
            if pos < DUR:
                n = int(SR * 0.05)
                tt = np.arange(n) / SR
                hit = np.sin(2 * np.pi * 400 * tt) * np.exp(-tt * 40)
                dholak = dholak + place(hit * 0.15, pos)
        t += bar

    # Hihats
    hh_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    while t < DUR:
        hh_layer = hh_layer + place(hihat_closed() * 0.18, t)
        t += beat / 2

    # Bass
    bass_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        root = c[0] / 2
        b = bass_note(root, beat, style='saw')
        bass_layer = bass_layer + place(b * 0.35, t)
        if t + beat * 2 < DUR:
            bass_layer = bass_layer + place(bass_note(root, beat * 0.5, style='saw') * 0.25, t + beat * 2)
        chord_idx += 1
        t += bar

    # Tambourine
    tamb = np.zeros(TOTAL_SAMPLES)
    t = beat / 4
    while t < DUR:
        tamb = tamb + place(shaker(0.02) * 0.1, t)
        t += beat / 2

    kick_pos = get_kick_positions(bpm, 'four_on_floor')
    sc_env = sidechain_envelope(TOTAL_SAMPLES, kick_pos, depth=0.4)
    pad_layer *= sc_env

    mix = mix_to_length(pad_layer, melody, kick_layer, snare_layer, dholak, hh_layer,
                        bass_layer, tamb)
    return mix


def gen_chill_ambient():
    """Track 9: Ambient pads + gentle arp + nature-like textures, 80 BPM."""
    print("  Generating chill_ambient...")
    bpm = 80
    beat = 60.0 / bpm
    bar = beat * 4

    # Dreamy progression
    chords = [
        chord('C', 'maj7', 3), chord('E', 'minor', 3),
        chord('A', 'min7', 3), chord('F', 'maj7', 3)
    ]

    # Lush ambient pad — heavily reverbed
    pad_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        dur = min(bar * 2, DUR - t)
        seg = pad_chord(c, dur, wave='sine', detune_cents=5)
        # Slow tremolo
        trem = 0.8 + 0.2 * np.sin(2 * np.pi * 0.3 * np.arange(len(seg)) / SR)
        seg *= trem
        seg = lowpass(seg, 2000.0)
        pad_layer = pad_layer + place(seg * 0.25, t)
        chord_idx += 2
        t += bar * 2
    pad_layer = reverb(pad_layer, 0.8, 0.45)

    # Second pad layer — higher octave, quieter
    pad2 = np.zeros(TOTAL_SAMPLES)
    t = bar
    chord_idx = 1
    while t < DUR:
        c = chords[chord_idx % 4]
        c_high = [f * 2 for f in c]
        dur = min(bar * 2, DUR - t)
        seg = pad_chord(c_high, dur, wave='triangle', detune_cents=4)
        seg = lowpass(seg, 3000.0)
        pad2 = pad2 + place(seg * 0.1, t)
        chord_idx += 2
        t += bar * 2
    pad2 = reverb(pad2, 0.8, 0.4)

    # Gentle arp
    arp_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        arp_freqs = sorted([f * 2 for f in c])
        dur = min(bar, DUR - t)
        if dur < 0.1:
            break
        seg = arp_pattern(arp_freqs, dur, bpm, 2, 'sine')
        arp_layer = arp_layer + place(seg * 0.1, t)
        chord_idx += 1
        t += bar
    arp_layer = reverb(arp_layer, 0.7, 0.4)

    # Nature-like textures — wind
    wind = np.zeros(TOTAL_SAMPLES)
    ns = noise(DUR)
    ns = bandpass(ns, 200.0, 2000.0)
    # Modulate amplitude slowly
    mod = 0.5 + 0.5 * np.sin(2 * np.pi * 0.15 * np.arange(TOTAL_SAMPLES) / SR)
    wind = ns[:TOTAL_SAMPLES] * mod * 0.04

    # Water-like texture — filtered random clicks
    water = np.zeros(TOTAL_SAMPLES)
    np.random.seed(99)
    for _ in range(200):
        pos = np.random.uniform(0, DUR)
        n = int(SR * 0.01)
        tt = np.arange(n) / SR
        drop = np.sin(2 * np.pi * np.random.uniform(2000, 5000) * tt) * np.exp(-tt * 200)
        water = water + place(drop * np.random.uniform(0.01, 0.04), pos)

    # Very subtle kick — more like a pulse
    kick_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    while t < DUR:
        kick_layer = kick_layer + place(kick_drum(0.2) * 0.3, t)
        t += bar

    # Soft bass drone
    bass_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        root = c[0] / 2
        dur = min(bar * 2, DUR - t)
        b = sine(root, dur) * 0.2
        bass_layer = bass_layer + place(b, t)
        chord_idx += 2
        t += bar * 2

    mix = mix_to_length(pad_layer, pad2, arp_layer, wind, water, kick_layer, bass_layer)
    return mix


def gen_phonk_drift():
    """Track 10: Cowbell + distorted 808 + dark melody, 130 BPM."""
    print("  Generating phonk_drift...")
    bpm = 130
    beat = 60.0 / bpm
    bar = beat * 4

    # Dark minor progression
    chords = [
        chord('A', 'minor', 3), chord('F', 'major', 3),
        chord('D', 'minor', 3), [note_freq('E', 3), note_freq('G#', 3), note_freq('B', 3)]
    ]

    # Cowbell pattern — signature phonk
    cb_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    while t < DUR:
        for i in range(8):
            pos = t + i * beat / 2
            if pos < DUR:
                vel = 0.35 if i % 2 == 0 else 0.2
                cb_layer = cb_layer + place(cowbell() * vel, pos)
        t += bar

    # Distorted 808
    bass_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        root = c[0] / 4  # Very low
        # 808 slides
        for offset in [0, beat * 2]:
            pos = t + offset
            if pos < DUR:
                b = bass_note(root, beat * 1.5, style='808')
                # Extra distortion
                b = np.tanh(b * 3) * 0.5
                bass_layer = bass_layer + place(b, pos)
        chord_idx += 1
        t += bar

    # Kick
    kick_pos = get_kick_positions(bpm, 'half')
    kick_layer = np.zeros(TOTAL_SAMPLES)
    for pos in kick_pos:
        kick_layer = kick_layer + place(kick_drum(0.2) * 0.8, pos)

    # Snare — hard hitting
    snare_layer = np.zeros(TOTAL_SAMPLES)
    t = beat
    while t < DUR:
        snare_layer = snare_layer + place(snare_drum(0.15) * 0.6, t)
        snare_layer = snare_layer + place(clap() * 0.4, t)
        t += beat * 2

    # Hihats — rapid
    hh_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    while t < DUR:
        hh_layer = hh_layer + place(hihat_closed(0.02) * 0.2, t)
        t += beat / 4

    # Dark melody — minor scale, eerie
    melody = np.zeros(TOTAL_SAMPLES)
    dark_notes = [
        note_freq('A', 4), note_freq('C', 5), note_freq('D', 5),
        note_freq('E', 5), note_freq('F', 5), note_freq('G#', 5)
    ]
    np.random.seed(77)
    t = 0
    while t < DUR:
        for i in range(4):
            pos = t + i * beat
            if pos >= DUR:
                break
            freq = dark_notes[np.random.randint(len(dark_notes))]
            dur = beat * 0.8
            n = max(1, int(SR * dur))
            tt = np.arange(n) / SR
            mel = square(freq, dur, harmonics=6) * 0.5 + sine(freq, dur) * 0.5
            mel *= np.exp(-tt * 5)
            mel = lowpass(mel, 3000.0)
            melody = melody + place(mel * 0.12, pos)
        t += bar
    melody = reverb(melody, 0.35, 0.25)

    # Dark pad
    pad_layer = np.zeros(TOTAL_SAMPLES)
    t = 0
    chord_idx = 0
    while t < DUR:
        c = chords[chord_idx % 4]
        dur = min(bar, DUR - t)
        seg = pad_chord(c, dur, wave='saw', detune_cents=5)
        seg = lowpass(seg, 1000.0)
        pad_layer = pad_layer + place(seg * 0.1, t)
        chord_idx += 1
        t += bar
    pad_layer = reverb(pad_layer, 0.5, 0.3)

    sc_env = sidechain_envelope(TOTAL_SAMPLES, kick_pos, depth=0.5)
    pad_layer *= sc_env

    # Vinyl texture for phonk vibe
    crackle = vinyl_crackle(DUR) * 0.05

    mix = mix_to_length(cb_layer, bass_layer, kick_layer, snare_layer, hh_layer,
                        melody, pad_layer, crackle)
    return mix


# ─── Main ────────────────────────────────────────────────────────────

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    print(f"Output directory: {OUT_DIR}\n")

    tracks = [
        ("v2_amapiano_deep.wav", gen_amapiano_deep),
        ("v2_cinematic_rise.wav", gen_cinematic_rise),
        ("v2_lofi_sunset.wav", gen_lofi_sunset),
        ("v2_desi_trap.wav", gen_desi_trap),
        ("v2_afrobeats_groove.wav", gen_afrobeats_groove),
        ("v2_future_bass_drop.wav", gen_future_bass_drop),
        ("v2_minimal_tech.wav", gen_minimal_tech),
        ("v2_bollywood_modern.wav", gen_bollywood_modern),
        ("v2_chill_ambient.wav", gen_chill_ambient),
        ("v2_phonk_drift.wav", gen_phonk_drift),
    ]

    for i, (filename, gen_func) in enumerate(tracks, 1):
        out_path = os.path.join(OUT_DIR, filename)
        if os.path.exists(out_path):
            print(f"[{i}/10] {filename} — already exists, skipping")
            continue
        print(f"[{i}/10] {filename}")
        mix = gen_func()
        save_track(mix, filename)
        print()

    print("Done! All 10 v2 tracks generated.")


if __name__ == "__main__":
    main()
