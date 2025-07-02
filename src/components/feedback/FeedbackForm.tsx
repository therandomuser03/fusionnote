"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

const ratingEnumMap: Record<number, "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE"> = {
  1: "ONE",
  2: "TWO",
  3: "THREE",
  4: "FOUR",
  5: "FIVE",
};

export default function FeedbackForm({ userEmail = "" }: { userEmail?: string }) {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [email, setEmail] = useState(userEmail || "");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userEmail) setEmail(userEmail);
  }, [userEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return toast.error("Please select a rating.");

    setLoading(true);

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        rating: ratingEnumMap[rating],
        email: email || undefined,
      }),
    });

    if (res.ok) {
      toast.success("Feedback submitted!");
      setSubmitted(true);
      setMessage("");
      setRating(0);
      setEmail(userEmail || "");
    } else {
      toast.error("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">We’d love your feedback</h1>

      {submitted ? (
        <div className="space-y-4">
          <div className="text-green-600">Thanks for your feedback!</div>
          <Button
            variant="secondary"
            onClick={() => window.location.href = '/'}
            className="py-2"
          >
            Return to Home
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            required
            className="w-full border p-2 rounded resize-none"
            rows={5}
            placeholder="Your feedback..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="flex gap-2 items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                index={star}
                rating={rating}
                hoverRating={hoverRating}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <input
            type="email"
            className="w-full border p-2 rounded"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            variant="default"
            type="submit"
            className="w-full py-2"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      )}
    </div>
  );
}

// Star component
function Star({
  index,
  rating,
  hoverRating,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  index: number;
  rating: number;
  hoverRating: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}) {
  const filled = index <= (hoverRating || rating);
  const labels = ["Bad", "Poor", "Okay", "Good", "Best"];
  const label = labels[index - 1];

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="cursor-pointer text-yellow-500 text-2xl relative group"
      title={label}
    >
      {filled ? "★" : "☆"}
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition">
        {label}
      </span>
    </div>
  );
}
