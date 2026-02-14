import { createClient, createAdminClient } from "@/lib/supabase/server";
import { AdminReviewActions } from "@/components/admin/admin-review-actions";
import { MessageSquare, Star, User, Calendar } from "lucide-react";

export default async function AdminReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
    await params;
    const supabase = await createClient(); // Standard client for auth
    const adminSupabase = await createAdminClient(); // Admin client for data

    // 1. Get Current User & Verify Admin Role
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await adminSupabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "admin") {
        return <div className="p-8 text-red-500 font-bold">Unauthorized Access</div>;
    }

    // 2. Fetch all reviews with author and listing info using admin client (bypasses RLS)
    const { data: reviews } = await adminSupabase
        .from("reviews")
        .select(`
            *,
            author:profiles(full_name),
            listing:listings(title)
        `)
        .order("created_at", { ascending: false });

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Moderate Reviews</h1>
                <p className="text-gray-500 mt-2">Monitor and manage user feedback across all listings.</p>
            </header>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {reviews?.map((review: any) => (
                        <div key={review.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                            <div className="flex items-start justify-between">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold">
                                            {review.author?.full_name?.charAt(0) || "U"}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                {review.author?.full_name || "Anonymous User"}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(review.created_at).toLocaleDateString()}
                                                <span>•</span>
                                                <span className="text-primary font-medium">{review.listing?.title}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < review.rating
                                                    ? "text-yellow-400 fill-current"
                                                    : "text-gray-200"
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                        {review.comment}
                                    </p>
                                </div>

                                <div className="ml-6">
                                    <AdminReviewActions reviewId={review.id} adminUserId={user.id} />
                                </div>
                            </div>
                        </div>
                    ))}
                    {!reviews?.length && (
                        <div className="p-12 text-center text-gray-500">
                            <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                            <p>No reviews found on the platform.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
