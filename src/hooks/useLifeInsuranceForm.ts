import { useState, useCallback } from "react";
import { z } from "zod";
import type { LifeInsuranceFormValues } from "../components/LifeInsuranceForm";

interface RecommendationResponse {
  success: boolean;
  recommendation: string;
  explanation: string;
}

const schema = z.object({
  age: z.number().min(18).max(100),
  income: z.number().min(1),
  dependents: z.number().min(0),
  riskTolerance: z.enum(["low", "medium", "high"]),
});

export function useLifeInsuranceForm() {
  const [age, setAge] = useState<number | "">(18);
  const [income, setIncome] = useState<number | "">(50000);
  const [dependents, setDependents] = useState<number | "">(1);
  const [riskTolerance, setRiskTolerance] = useState<string>("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<RecommendationResponse | null>(null);
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof LifeInsuranceFormValues, string>>>({});

  const validate = useCallback(() => {
    const parsed = schema.safeParse({
      age: typeof age === "string" || age === null ? NaN : age,
      income: typeof income === "string" || income === null ? NaN : income,
      dependents: typeof dependents === "string" || dependents === null ? NaN : dependents,
      riskTolerance,
    });
    if (!parsed.success) {
      const errors: Partial<Record<keyof LifeInsuranceFormValues, string>> = {};
      parsed.error.errors.forEach(err => {
        if (err.path[0]) errors[err.path[0] as keyof LifeInsuranceFormValues] = err.message;
      });
      setValidationErrors(errors);
      return false;
    }
    setValidationErrors({});
    return true;
  }, [age, income, dependents, riskTolerance]);

  const handleSubmit = useCallback(async () => {
    setError("");
    setResult(null);
    if (!validate()) return;
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      const depNum = Number(dependents);
      const coverageMultiplier = depNum > 0 ? 8 + depNum : 6;
      const recommendedCoverage = Number(income) * coverageMultiplier;
      const monthlyPremium = Math.round((recommendedCoverage / 1000) * 0.5 * (Number(age) / 30));
      const riskFactors = {
        low: "Term Life Insurance",
        medium: "Whole Life Insurance",
        high: "Universal Life Insurance",
      };
      const mockResult: RecommendationResponse = {
        success: true,
        recommendation: `${riskFactors[riskTolerance as keyof typeof riskFactors]} - $${recommendedCoverage.toLocaleString()} coverage`,
        explanation: `Based on your age (${age}), income ($${Number(income).toLocaleString()}), and ${dependents} dependent(s), we recommend ${riskFactors[riskTolerance as keyof typeof riskFactors]} with approximately $${recommendedCoverage.toLocaleString()} in coverage. Estimated monthly premium: $${monthlyPremium}.`,
      };
      setResult(mockResult);
    } catch (err: any) {
      setError(err.message || "Failed to fetch recommendation");
    } finally {
      setLoading(false);
    }
  }, [age, income, dependents, riskTolerance, validate]);

  const handleReset = useCallback(() => {
    setAge(18);
    setIncome(50000);
    setDependents(1);
    setRiskTolerance("medium");
    setResult(null);
    setError("");
    setValidationErrors({});
  }, []);

  return {
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
    result,
    validationErrors,
    onSubmit: handleSubmit,
    onReset: handleReset,
  };
} 