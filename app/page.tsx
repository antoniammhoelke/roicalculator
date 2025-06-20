"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function Page() {
  const [dataSources, setDataSources] = useState([5])
  const [hoursPerWeek, setHoursPerWeek] = useState([10])
  const [hourlyCost, setHourlyCost] = useState([50])
  const [usingDataTool, setUsingDataTool] = useState(false)
  const [monthlyToolCost, setMonthlyToolCost] = useState([500])

  // Calculations
  const [results, setResults] = useState({
    annualSavings: 0,
    threeYearSavings: 0,
    fiveYearSavings: 0,
    roi: 0,
  })

  useEffect(() => {
    // Calculate annual cost of current data management
    const weeklyHours = hoursPerWeek[0]
    const hourlyRate = hourlyCost[0]
    // const sources = dataSources[0]; // dataSources is not directly used in calculation in the old version, but kept for future use
    const toolCost = usingDataTool ? monthlyToolCost[0] : 0

    // Annual labor cost (assuming 52 weeks per year)
    const annualLaborCost = weeklyHours * hourlyRate * 52

    // Annual tool cost
    const annualToolCost = toolCost * 12

    // Total annual cost
    const totalAnnualCost = annualLaborCost + annualToolCost

    // Assume 70% efficiency improvement with the solution
    const efficiencyImprovement = 0.7
    const annualSavings = totalAnnualCost * efficiencyImprovement

    // Multi-year projections
    const threeYearSavings = annualSavings * 3
    const fiveYearSavings = annualSavings * 5

    // ROI calculation (assuming solution cost is 10% of current annual cost)
    // For a more realistic ROI, let's assume a hypothetical solution cost.
    // This part might need to be an input or a more sophisticated calculation based on Funnel.io's pricing model if we were fully emulating.
    // For now, we'll keep a simplified version or make it more transparent.
    // Let's assume solution cost is a fixed percentage of the *savings* or a new input.
    // To maintain simplicity from the previous version:
    const solutionCost = totalAnnualCost * 0.1 // This was the original assumption for solution cost
    const roi = solutionCost > 0 ? Math.round((annualSavings / solutionCost) * 100) : 0

    setResults({
      annualSavings: Math.round(annualSavings),
      threeYearSavings: Math.round(threeYearSavings),
      fiveYearSavings: Math.round(fiveYearSavings),
      roi,
    })
  }, [dataSources, hoursPerWeek, hourlyCost, usingDataTool, monthlyToolCost])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-[#013f33] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-left">
          <h1 className="text-4xl font-bold text-white mb-3">Your personal Funnel ROI calculator</h1>
          <p className="text-gray-200 text-lg">
            This calculator helps you get an idea of what your savings could be.
            For a detailed quote, please book a demo or talk to sales.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Input Section - spans 2 columns */}
          <div className="lg:col-span-2 space-y-10">
            {/* Number of Accounts (Data Sources) */}
            <div className="space-y-3">
              <div>
                <Label className="text-base font-semibold text-gray-100 block mb-1">
                  Number of data sources
                </Label>
                <p className="text-gray-300">
                  Total number of data sources you want to connect (e.g., databases, APIs, files)
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setDataSources([Math.max(1, dataSources[0] - 1)])}
                  className="border-gray-300 text-white hover:bg-gray-700"
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={dataSources[0]}
                  onChange={(e) => setDataSources([Math.max(1, Number.parseInt(e.target.value) || 1)])}
                  className="w-20 text-center bg-gray-700 border-gray-600 text-white"
                  min={1}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setDataSources([dataSources[0] + 1])}
                  className="border-gray-300 text-white hover:bg-gray-700"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Hours per week */}
            <div className="space-y-3">
              <div>
                <Label className="text-base font-semibold text-gray-100 block mb-1">
                  Hours per week spent managing data
                </Label>
                <p className="text-gray-300">
                  Include time for integration, cleaning, and troubleshooting.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Slider
                  value={hoursPerWeek}
                  onValueChange={setHoursPerWeek}
                  max={80}
                  min={1}
                  step={1}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={hoursPerWeek[0]}
                  onChange={(e) => setHoursPerWeek([Number.parseInt(e.target.value) || 1])}
                  className="w-24 text-center bg-gray-700 border-gray-600 text-white"
                  min={1}
                  max={80}
                />
              </div>
            </div>

            {/* Hourly cost */}
            <div className="space-y-3">
              <div>
                <Label className="text-base font-semibold text-gray-100 block mb-1">
                  Estimated hourly cost (€/hour)
                </Label>
                <p className="text-gray-300">
                  Average fully-loaded cost (salary, benefits, overhead).
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Slider
                  value={hourlyCost}
                  onValueChange={setHourlyCost}
                  max={200}
                  min={20}
                  step={5}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={hourlyCost[0]}
                  onChange={(e) => setHourlyCost([Number.parseInt(e.target.value) || 20])}
                  className="w-24 text-center bg-gray-700 border-gray-600 text-white"
                  min={20}
                  max={200}
                />
              </div>
            </div>
            
            {/* Additional Requirements Section */}
            <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-100 block mb-1">
                  Additional tools & costs
                </Label>
                <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700">
                    <div className="flex items-center space-x-3 mb-1">
                        <Switch 
                            id="data-tool-switch" 
                            checked={usingDataTool} 
                            onCheckedChange={setUsingDataTool}
                        />
                        <Label htmlFor="data-tool-switch" className="text-sm font-medium text-gray-200">
                            Are you using another data tool?
                        </Label>
                    </div>
                    <p className="text-gray-400 pl-9">
                        Include costs for existing data integration or management platforms.
                    </p>
                </div>
            </div>

            {/* Monthly tool cost - conditional */}
            {usingDataTool && (
              <div className="space-y-3 pl-4 border-l-2 border-[#f86c54ff]/30 ml-1">
                <div>
                  <Label className="text-base font-semibold text-gray-100 block mb-1">
                    Current monthly tool cost (€)
                  </Label>
                  <p className="text-gray-300">
                    Total monthly cost for your current data management solution.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    value={monthlyToolCost}
                    onValueChange={setMonthlyToolCost}
                    max={5000}
                    min={50}
                    step={50}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={monthlyToolCost[0]}
                    onChange={(e) => setMonthlyToolCost([Number.parseInt(e.target.value) || 50])}
                    className="w-24 text-center bg-gray-700 border-gray-600 text-white"
                    min={50}
                    max={5000}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Results Section - 1 column */}
          <div className="lg:col-span-1">
            <Card className="sticky top-10 bg-gray-800/50 border-gray-700 shadow-xl">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-1">Your Estimated Savings</h2>
                    <p className="text-gray-300">Based on your inputs, here's a potential outlook:</p>
                  </div>

                  <Separator className="bg-gray-600" />

                  <div className="space-y-5">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Annual Savings</p>
                      <p className="text-4xl font-bold text-white">{formatCurrency(results.annualSavings)}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">3-Year Savings</p>
                      <p className="text-2xl font-semibold text-gray-200">{formatCurrency(results.threeYearSavings)}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">5-Year Savings</p>
                      <p className="text-2xl font-semibold text-gray-200">{formatCurrency(results.fiveYearSavings)}</p>
                    </div>
                    
                    {/* ROI Display */}
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Estimated ROI</p>
                        <p className="text-4xl font-bold text-[#f86c54ff]">{results.roi}%</p>
                        <p className="text-xs text-gray-400 mt-1">Calculated with an assumed solution investment.</p>
                    </div>
                  </div>
                  
                  <Separator className="bg-gray-600" />

                  <p className="text-xs text-gray-400 text-center">
                    This is an estimation. Your actual ROI may vary. Please book a demo for a detailed quote.
                  </p>

                  <Button className="w-full bg-[#f86c54ff] hover:bg-[#f86c54ff]/90 text-white py-3 text-base font-semibold">
                    Talk to sales here
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
