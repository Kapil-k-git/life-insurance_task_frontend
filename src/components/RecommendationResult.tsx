import React from "react";

interface RecommendationResponse {
  success: boolean;
  recommendation: string;
  explanation: string;
}

interface Props {
  result: RecommendationResponse | null;
  loading: boolean;
  onReset: () => void;
}

const RecommendationResult: React.FC<Props> = ({ result, loading, onReset }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-2/3 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-1/2" />
      </div>
    );
  }
  if (!result) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          {/* Icon placeholder */}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Ready to Get Started?</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Fill out the form to receive a personalized life insurance recommendation based on your unique situation.
        </p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          {/* Success icon placeholder */}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Your Recommendation</h3>
          <p className="text-gray-600">Tailored to your specific needs</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Recommended Coverage</h4>
          <p className="text-blue-800">{result.recommendation}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Explanation</h4>
          <p className="text-gray-700 leading-relaxed">{result.explanation}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
      >
        Start Over
      </button>
    </div>
  );
};

export default RecommendationResult; 