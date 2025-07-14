"use client";
import LifeInsuranceForm from "../components/LifeInsuranceForm";
import RecommendationResult from "../components/RecommendationResult";
import { useLifeInsuranceForm } from "../hooks/useLifeInsuranceForm";

export default function LifeInsuranceApp() {
  const form = useLifeInsuranceForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              {/* Shield icon can be placed here if needed */}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Life Insurance Advisor</h1>
              <p className="text-gray-600">Get personalized coverage recommendations</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <LifeInsuranceForm {...form} />
          <RecommendationResult {...form} />
        </div>
      </div>
    </div>
  );
}