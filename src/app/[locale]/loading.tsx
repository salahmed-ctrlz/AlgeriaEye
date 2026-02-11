import ZelijSpinner from "@/components/ui/ZelijSpinner";

export default function Loading() {
    return (
        <div className="flex h-[50vh] w-full items-center justify-center">
            {/* The spinner visual is handled by the component's internal styles */}
            <ZelijSpinner className="h-24 w-24 text-brand animate-spin-slow" />
        </div>
    );
}
