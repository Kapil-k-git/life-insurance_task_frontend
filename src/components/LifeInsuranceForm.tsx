import React from "react";
import { z } from "zod";

const schema = z.object({
  age: z.number().min(18, "Must be at least 18").max(100, "Max age is 100"),
  income: z.number().min(1, "Income required"),
  dependents: z.number().min(0, "Cannot be negative"),
  riskTolerance: z.enum(["low", "medium", "high"]),
});

export type LifeInsuranceFormValues = z.infer<typeof schema>;

interface Props {
  age: number | "";
  setAge: (v: number | "") => void;
  income: number | "";
  setIncome: (v: number | "") => void;
  dependents: number | "";
  setDependents: (v: number | "") => void;
  riskTolerance: string;
  setRiskTolerance: (v: string) => void;
  loading: boolean;
  error: string;
  onSubmit: () => void;
  validationErrors: Partial<Record<keyof LifeInsuranceFormValues, string>>;
}

const LifeInsuranceForm: React.FC<Props> = ({
  age,
  setAge,
  income,
  setIncome,
  dependents,
  setDependents,
  riskTolerance,
  setRiskTolerance,
  loading,
  error,
  onSubmit,
  validationErrors,
}) => {
  return (
    <form
      className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
      aria-label="Life Insurance Form"
    >
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Help us understand your needs better</p>
      </div>
      {/* Age */}
      <div className="space-y-1">
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          Age
        </label>
        <input
          id="age"
          name="age"
          type="number"
          min={18}
          max={100}
          value={age}
          onChange={e => setAge(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your age"
          required
          aria-invalid={!!validationErrors.age}
          aria-describedby={validationErrors.age ? "age-error" : undefined}
        />
        {validationErrors.age && (
          <span id="age-error" className="text-xs text-red-600">{validationErrors.age}</span>
        )}
      </div>
      {/* Income */}
      <div className="space-y-1">
        <label htmlFor="income" className="block text-sm font-medium text-gray-700">
          Annual Income
        </label>
        <input
          id="income"
          name="income"
          type="number"
          min={1}
          value={income}
          onChange={e => setIncome(e.target.value === "" ? "" : Number(e.target.value.replace(/^0+/, "")))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your annual income"
          required
          aria-invalid={!!validationErrors.income}
          aria-describedby={validationErrors.income ? "income-error" : undefined}
        />
        {validationErrors.income && (
          <span id="income-error" className="text-xs text-red-600">{validationErrors.income}</span>
        )}
      </div>
      {/* Dependents */}
      <div className="space-y-1">
        <label htmlFor="dependents" className="block text-sm font-medium text-gray-700">
          Number of Dependents
        </label>
        <input
          id="dependents"
          name="dependents"
          type="number"
          min={0}
          value={dependents}
          onChange={e => setDependents(e.target.value === "" ? "" : Number(e.target.value.replace(/^0+/, "")))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Number of dependents"
          required
          aria-invalid={!!validationErrors.dependents}
          aria-describedby={validationErrors.dependents ? "dependents-error" : undefined}
        />
        {validationErrors.dependents && (
          <span id="dependents-error" className="text-xs text-red-600">{validationErrors.dependents}</span>
        )}
      </div>
      {/* Risk Tolerance */}
      <div className="space-y-1">
        <label htmlFor="riskTolerance" className="block text-sm font-medium text-gray-700">
          Risk Tolerance
        </label>
        <select
          id="riskTolerance"
          name="riskTolerance"
          value={riskTolerance}
          onChange={e => setRiskTolerance(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="low">Low - Conservative approach</option>
          <option value="medium">Medium - Balanced approach</option>
          <option value="high">High - Growth-focused</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        aria-busy={loading}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Analyzing...</span>
          </>
        ) : (
          <span>Get My Recommendation</span>
        )}
      </button>
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700" role="alert">
          {error}
        </div>
      )}
    </form>
  );
};

export default LifeInsuranceForm; 