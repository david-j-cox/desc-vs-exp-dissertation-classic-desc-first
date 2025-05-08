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

  const handleChoice = (selected: "option1" | "option2") => {
    setChoice(selected)
    
    // Record the trial data
    addTrialData({
      phase: "description-trials",
      condition: "classic-description",
      choice: selected,
      questionType: "probability",
    })

    // Move to next trial or complete phase
    if (currentTrial < TRIALS.length - 1) {
      setCurrentTrial(prev => prev + 1)
      setChoice(null)
    } else {
      onAdvance()
    }
  }

  const trial = TRIALS[currentTrial]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Trial {currentTrial + 1} of {TRIALS.length}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-lg font-medium">Which would you prefer?</p>
            
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={choice === "option1" ? "default" : "outline"}
                className="h-24 text-lg"
                onClick={() => handleChoice("option1")}
              >
                {trial.p1 * 100}% chance of ${trial.v1}
              </Button>
              
              <Button
                variant={choice === "option2" ? "default" : "outline"}
                className="h-24 text-lg"
                onClick={() => handleChoice("option2")}
              >
                {trial.p2 * 100}% chance of ${trial.v2}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 