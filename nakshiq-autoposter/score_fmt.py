"""Display-scale helper: NakshIQ destination scores are stored 0-5 and shown 0-10.

Solo-female and kids ratings stay on /5 (a different methodology), so only
destination/month scores go through here. Mirrors format_score() in autoposter.py.
"""


def score10(raw) -> str:
    """Raw 0-5 destination score -> '8/10'. Unparseable -> '—/10'."""
    try:
        if raw is None or raw == "":
            return "—/10"
        v = float(raw) * 2
        return f"{int(v) if v == int(v) else round(v, 1)}/10"
    except (TypeError, ValueError):
        return "—/10"
