import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About NakshIQ — Built by an Indian Family, for Every Traveler",
  description:
    "No investors. No sponsored content. No tourism boards. NakshIQ is built by an NRI family for their daughters — and for every traveler who deserves honest answers before they go.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">About NakshIQ</h1>
        <p className="text-sm text-muted-foreground mb-10">
          The honest answers your guidebook won't give you.
        </p>

        <div className="prose prose-invert max-w-none space-y-10">
          {/* Why this exists */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Why this exists</h2>
            <p className="text-muted-foreground leading-relaxed">
              I'm an Indian father raising two daughters abroad. They speak limited Hindi. They've
              spent more time at beaches than Indian hill stations. And one day, probably sooner than
              I think, they're going to want to see India for themselves.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              I won't always be there to take them. That's just how time works. Some of those trips
              will happen when I'm older, or busy, or — eventually — gone. They'll be going to a
              country that should feel like home but won't quite, with a language they half-understand,
              navigating roads I learned by trial and error and they never had the chance to.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              I started NakshIQ so that when that day comes, they have the guide I would have written
              for them in person if I could. Every destination scored honestly. Every road condition
              checked. Every "don't go there alone after dark" said clearly. Every trusted contact we
              can verify, listed by name. The voice of a parent who knows India and knows what their
              kids won't know.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3 font-medium text-foreground">
              That's the actual reason this exists.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              It turns out that the guide I'm writing for my daughters is also the guide a lot of
              other people have been waiting for — Indian families planning their first big trip, NRI
              parents bringing their children back, solo women travelers looking for honest answers,
              international visitors who don't trust the guidebooks anymore. Every page on NakshIQ is
              written for them too. But the standard for "is this honest enough, is this safe enough,
              is this useful enough" is set by one question:
            </p>
            <blockquote className="border-l-4 border-primary pl-4 my-6 text-lg font-medium text-foreground italic">
              Would I want my daughter to read this before she goes?
            </blockquote>
            <p className="text-muted-foreground leading-relaxed">
              If yes, it ships. If no, we rewrite it.
            </p>
          </section>

          {/* Who's building this */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Who's building this</h2>
            <p className="text-muted-foreground leading-relaxed">
              NakshIQ is built by my family. I write most of the destination pages. My wife Aurore
              writes the family-perspective and women's-safety pieces. Our extended family across India
              helps verify what's actually true on the ground.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              There is no team. There are no investors. There are no outside writers, no sponsored
              content, no tourism boards funding our recommendations. Every word on this site was
              written by one of us, fact-checked by one of us, and stands behind both of our names.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We will never accept money to recommend a destination. We will never accept free stays
              in exchange for coverage. We will never run advertising that compromises the editorial.
              These aren't marketing claims — they're the rules we wrote for ourselves on day one and
              they don't change.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              When you read that a destination scores 5/5 on NakshIQ, no one paid for that score. When
              you read that another destination scores 1/5, no one paid for that either. When the Skip
              List says "don't bother with this place," it's because we genuinely think you shouldn't
              bother. That's the only thing that makes any of this worth reading.
            </p>
          </section>

          {/* What we actually do */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">What we actually do</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We score every destination in our coverage area honestly, every month, across the things
              that actually matter:
            </p>
            <div className="space-y-4">
              <div className="rounded-xl border border-border p-5">
                <h3 className="font-semibold">Monthly suitability scores</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Every place is rated 1-5 for every month of the year. Not "best time to visit:
                  March-June" — that's lazy and it's everywhere already. We tell you March is 5/5
                  because spring flowers and clear views and 15-25°C, and July is 1/5 because monsoon
                  floods the approach road and there are leeches on every trail. Specificity is the point.
                </p>
              </div>
              <div className="rounded-xl border border-border p-5">
                <h3 className="font-semibold">Family and safety intelligence</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Every destination has a kids rating that accounts for altitude, medical access, road
                  safety, phone signal, and infrastructure — not just "it's pretty so it must be
                  family-friendly." If the nearest hospital is four hours away, we tell you. If the
                  altitude is risky for children under a certain age, we explain why. If we wouldn't
                  take our own daughters there, we tell you that too.
                </p>
              </div>
              <div className="rounded-xl border border-border p-5">
                <h3 className="font-semibold">Honest infrastructure data</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Working ATMs. Phone signal by carrier. Nearest hospital and police station with
                  travel times. Fuel stations. Card acceptance. The practical reality nobody else
                  publishes because it isn't glamorous.
                </p>
              </div>
              <div className="rounded-xl border border-border p-5">
                <h3 className="font-semibold">The Skip List</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  We've documented dozens of overhyped places we'd actively recommend skipping, with
                  honest reasons. This is the stuff tourism boards hate. It's also the stuff that saves
                  people from wasting their trip on the wrong destination at the wrong time of year.
                </p>
              </div>
              <div className="rounded-xl border border-border p-5">
                <h3 className="font-semibold">"Before you decide" alternatives</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  When you open a mainstream tourist destination, we show you what's nearby that you're
                  missing. Not to stop you going there — but so you know the options exist before you
                  default to where everyone else goes.
                </p>
              </div>
            </div>
          </section>

          {/* What we cover */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">What we cover</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every major Himalayan destination. The complete Buddhist Circuit. Rajasthan's heritage
              trail. The entire Northeast. India's UNESCO sites. Pilgrimage circuits. Motorcycle routes.
              Treks from single-day walks to expedition-level climbs. Weekend getaways and two-week
              itineraries. Scored for every month, rated for families, assessed for safety — all with
              the same depth.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We'd rather be the most honest source for the destinations we cover than a mediocre
              source for all of India. When we expand, it will be with the same depth we bring to
              everything else. No padding, no half-measures.
            </p>
          </section>

          {/* What we're building */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">What we're always building</h2>
            <p className="text-muted-foreground leading-relaxed">
              More verified safety contacts. More local voices. Deeper international traveler guidance
              for first-timers and NRI families. Better emergency data for every destination. More
              honest motorcycle route intelligence. More collections that challenge the defaults.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              The standard is always the same: if it's not honest enough for our daughters, it doesn't
              ship. If it's not verified enough to stake our name on, it waits until it is.
            </p>
          </section>

          {/* A note to fellow parents */}
          <section className="rounded-xl border border-primary/20 bg-primary/5 p-6">
            <h2 className="text-2xl font-semibold mb-3">A note to fellow parents</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you're reading this and you're a parent worrying about a trip your child is planning,
              or a daughter you can't always travel with — we built this with you in mind. We can't
              make every road safe. We can't be there when you can't be. But we can give you the most
              honest information available, the most carefully verified safety resources we can build,
              and a voice that sounds like one parent talking to another.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              That's what NakshIQ is. That's the whole reason it exists.
            </p>
          </section>

          {/* Signature */}
          <div className="pt-4 text-right">
            <p className="text-muted-foreground italic">— A.T.</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Editor, NakshIQ</p>
          </div>

          {/* Footer note */}
          <div className="border-t border-border/30 pt-6">
            <p className="text-xs text-muted-foreground/50 leading-relaxed text-center">
              NakshIQ is built by a family-owned company. We have no outside investors, no employees,
              and no commercial relationships with the destinations we cover. If you'd like to support
              us, the most useful thing you can do is share NakshIQ with someone planning a trip.
            </p>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-center gap-3 pb-4">
            <Link
              href="/en/explore"
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Start exploring
            </Link>
            <Link
              href="/en/methodology"
              className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              How we score
            </Link>
            <Link
              href="/en/editorial-policy"
              className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              Editorial policy
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
