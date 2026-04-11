import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

export interface Review {
  id: string;
  rating: number;
  text: string;
  traveler_type: string | null;
  visit_month: number | null;
  visit_year: number | null;
  created_at: string;
}

export function useReviews(destinationId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("reviews")
      .select("id, rating, text, traveler_type, visit_month, visit_year, created_at")
      .eq("destination_id", destinationId)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(20);

    setReviews((data as Review[]) ?? []);
    setLoading(false);
  }, [destinationId]);

  useEffect(() => {
    if (destinationId) fetchReviews();
  }, [destinationId, fetchReviews]);

  return { reviews, loading, refetch: fetchReviews };
}

export function useSubmitReview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function submitReview(params: {
    destination_id: string;
    rating: number;
    text: string;
    traveler_type: string;
    visit_month?: number | null;
    visit_year?: number | null;
  }) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setError("Please sign in to submit a review.");
        return false;
      }

      const { error: insertError } = await supabase.from("reviews").insert({
        destination_id: params.destination_id,
        user_id: session.user.id,
        rating: params.rating,
        text: params.text,
        traveler_type: params.traveler_type,
        visit_month: params.visit_month ?? null,
        visit_year: params.visit_year ?? null,
        status: "pending",
      });

      if (insertError) throw insertError;
      setSuccess(true);
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to submit review.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { submitReview, loading, error, success, reset: () => { setError(null); setSuccess(false); } };
}
