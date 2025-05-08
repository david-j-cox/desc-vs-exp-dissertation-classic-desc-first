import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ExperimentData } from "@/components/experiment"

type DescriptionTrial = {
  p1: number
  v1: number
  p2: number
  v2: number
}

const TRIALS: DescriptionTrial[] = [
  { p1: 1, v1: 50, p2: 0.5, v2: 100 },
  { p1: 1, v1: 50, p2: 0.35, v2: 100 },
  { p1: 1, v1: 50, p2: 0.85, v2: 100 },
  { p1: 1, v1: 50, p2: 0.5, v2: 100 },
]

interface DescriptionTrialsProps {
  onAdvance: () => void
  addTrialData: (data: Omit<ExperimentData["trials"][0], "timestamp" | "trialNumber">) => void
}

export default function DescriptionTrials({ onAdvance, addTrialData }: DescriptionTrialsProps) {
  const [currentTrial, setCurrentTrial] = useState(0)
  const [choice, setChoice] = useState<"option1" | "option2" | null>(null)
  const [isInterval, setIsInterval] = useState(false)

  const handleChoice = (selected: "option1" | "option2") => {
    setChoice(selected)
    setIsInterval(true)
    // Record the trial data
    addTrialData({
      phase: "description-trials",
      condition: "classic-description",
      choice: selected,
      questionType: "probability",
    })

    setTimeout(() => {
      setIsInterval(false)
      if (currentTrial < TRIALS.length - 1) {
        setCurrentTrial(prev => prev + 1)
        setChoice(null)
      } else {
        onAdvance()
      }
    }, 500)
  }

  const trial = TRIALS[currentTrial]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
        </CardHeader>
        <CardContent>
          <div className="text-center flex flex-col items-center space-y-4">
            <p className="text-2xl font-medium text-center">Which would you prefer?</p>
            {isInterval ? (
              <div className="h-64 flex items-center justify-center w-full">
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={choice === "option1" ? "default" : "outline"}
                  className="w-64 h-64 bg-white border border-gray-300 text-lg"
                  onClick={() => handleChoice("option1")}
                  disabled={isInterval}
                >
                  {trial.p1 * 100}% chance of ${trial.v1}
                </Button>
                
                <Button
                  variant={choice === "option2" ? "default" : "outline"}
                  className="w-64 h-64 bg-white border border-gray-300 text-lg"
                  onClick={() => handleChoice("option2")}
                  disabled={isInterval}
                >
                  {trial.p2 * 100}% chance of ${trial.v2}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 