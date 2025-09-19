import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  CheckCircle, 
  Play, 
  FileText, 
  Video, 
  Award,
  ArrowRight,
  ArrowLeft,
  Home
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const WasteBasicsModule = () => {
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: number}>({});

  const lessons = [
    {
      id: 0,
      title: "What is Waste?",
      duration: "10 min",
      type: "reading",
      content: {
        introduction: "Waste is any material that is discarded after primary use, or is worthless, defective and of no use. In India, we generate approximately 62 million tonnes of waste annually.",
        keyPoints: [
          "Waste is generated from households, industries, commercial establishments, and institutions",
          "India generates about 1.7 lakh tonnes of solid waste daily",
          "Only 54% of waste is scientifically treated in India",
          "Improper waste management leads to environmental and health issues"
        ],
        detailedContent: `
Waste management has become one of India's most pressing environmental challenges. With rapid urbanization and population growth, our cities are generating unprecedented amounts of waste.

**Types of Waste Generation:**
• **Household Waste**: Kitchen scraps, packaging materials, old clothes
• **Commercial Waste**: Offices, shops, restaurants, markets
• **Industrial Waste**: Manufacturing byproducts, chemicals, metals
• **Construction Waste**: Building materials, demolition debris
• **E-waste**: Electronic devices, batteries, circuits

**The Current Situation in India:**
India's waste generation is expected to increase to 165 million tonnes by 2030. Cities like Delhi, Mumbai, and Bengaluru generate the highest amounts of waste. The challenge is not just quantity but also the composition - increasing plastic waste and electronic waste pose new challenges.

**Environmental Impact:**
Improper waste disposal leads to:
- Soil contamination
- Water pollution
- Air pollution through burning
- Greenhouse gas emissions
- Loss of biodiversity
        `,
        quiz: {
          question: "How much solid waste does India generate daily?",
          options: [
            "1.2 lakh tonnes",
            "1.7 lakh tonnes", 
            "2.1 lakh tonnes",
            "2.5 lakh tonnes"
          ],
          correct: 1
        }
      }
    },
    {
      id: 1,
      title: "The 3 R's: Reduce, Reuse, Recycle",
      duration: "15 min",
      type: "interactive",
      content: {
        introduction: "The 3 R's are the foundation of waste management. This hierarchy helps us minimize waste and maximize resource efficiency.",
        principles: [
          {
            title: "REDUCE",
            description: "Minimize waste generation at the source",
            examples: [
              "Use digital receipts instead of paper",
              "Choose products with minimal packaging",
              "Buy only what you need",
              "Use refillable water bottles"
            ],
            impact: "Can reduce household waste by up to 30%"
          },
          {
            title: "REUSE", 
            description: "Find new purposes for items before disposing",
            examples: [
              "Use glass jars for storage",
              "Convert old clothes into cleaning rags",
              "Repurpose cardboard boxes",
              "Donate items in good condition"
            ],
            impact: "Extends product lifespan by 50-80%"
          },
          {
            title: "RECYCLE",
            description: "Process materials to create new products",
            examples: [
              "Separate paper, plastic, glass, and metal",
              "Compost organic waste",
              "Recycle electronic devices properly",
              "Use recycled products when possible"
            ],
            impact: "Saves 60-70% of energy compared to new production"
          }
        ],
        quiz: {
          question: "Which R should be the first priority in waste management?",
          options: ["Recycle", "Reuse", "Reduce", "All are equal"],
          correct: 2
        }
      }
    },
    {
      id: 2,
      title: "Waste Segregation - The Indian Way",
      duration: "20 min", 
      type: "video",
      content: {
        introduction: "India follows a color-coded system for waste segregation. Learn the correct way to separate waste at source.",
        videoUrl: "/videos/waste-segregation-india.mp4",
        categories: [
          {
            color: "Green",
            type: "Wet Waste (Biodegradable)",
            description: "Organic waste that decomposes naturally",
            examples: [
              "Fruit and vegetable peels",
              "Cooked food leftovers", 
              "Tea bags and coffee grounds",
              "Garden waste like leaves",
              "Dairy products",
              "Meat and fish waste"
            ],
            treatment: "Composting or biogas generation",
            percentage: "50-60% of household waste"
          },
          {
            color: "Blue",
            type: "Dry Waste (Recyclable)",
            description: "Materials that can be recycled or reused",
            examples: [
              "Paper and cardboard",
              "Plastic bottles and containers",
              "Glass bottles and jars",
              "Metal cans and foils",
              "Textiles and clothing",
              "Rubber and leather items"
            ],
            treatment: "Recycling facilities",
            percentage: "30-40% of household waste"
          },
          {
            color: "Red",
            type: "Hazardous Waste",
            description: "Dangerous materials requiring special handling",
            examples: [
              "Batteries and e-waste",
              "Medical waste and syringes", 
              "Chemicals and pesticides",
              "Paint and solvent containers",
              "Fluorescent bulbs",
              "Expired medicines"
            ],
            treatment: "Specialized disposal facilities",
            percentage: "5-10% of household waste"
          }
        ],
        quiz: {
          question: "Coconut shells should go into which bin?",
          options: ["Green (Wet)", "Blue (Dry)", "Red (Hazardous)", "Any bin"],
          correct: 1
        }
      }
    }
  ];

  const handleCompleteLesson = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      toast.success(`Lesson "${lessons[lessonId].title}" completed!`);
    }
  };

  const handleQuizAnswer = (lessonId: number, answerIndex: number) => {
    setQuizAnswers({...quizAnswers, [lessonId]: answerIndex});
    const lesson = lessons[lessonId];
    if (answerIndex === lesson.content.quiz.correct) {
      toast.success("Correct answer!");
      handleCompleteLesson(lessonId);
    } else {
      toast.error("Incorrect. Try again!");
    }
  };

  const progressPercentage = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary">Waste Management Basics</h1>
            <p className="text-muted-foreground">Understanding the fundamentals of waste management</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Home
          </Button>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium">Course Progress</span>
              <Badge variant="secondary">
                {completedLessons.length}/{lessons.length} lessons
              </Badge>
            </div>
            <Progress value={progressPercentage} className="w-full" />
          </CardContent>
        </Card>

        {/* Lesson Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {lessons.map((lesson, index) => (
            <Card 
              key={lesson.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                currentLesson === index ? 'ring-2 ring-primary' : ''
              } ${
                completedLessons.includes(index) ? 'bg-success/10 border-success' : ''
              }`}
              onClick={() => setCurrentLesson(index)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <Badge variant={lesson.type === 'video' ? 'default' : 'secondary'}>
                    {lesson.type === 'video' ? <Video className="h-3 w-3 mr-1" /> : 
                     lesson.type === 'interactive' ? <Play className="h-3 w-3 mr-1" /> :
                     <FileText className="h-3 w-3 mr-1" />}
                    {lesson.type}
                  </Badge>
                  {completedLessons.includes(index) && (
                    <CheckCircle className="h-5 w-5 text-success" />
                  )}
                </div>
                <CardTitle className="text-lg">{lesson.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{lesson.duration}</p>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Current Lesson Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {lessons[currentLesson].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Lesson Content</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6">
                <div className="prose max-w-none">
                  <p className="text-lg leading-relaxed">
                    {lessons[currentLesson].content.introduction}
                  </p>

                  {lessons[currentLesson].content.keyPoints && (
                    <div className="bg-accent/10 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3">Key Points:</h3>
                      <ul className="space-y-2">
                        {lessons[currentLesson].content.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {lessons[currentLesson].content.detailedContent && (
                    <div className="whitespace-pre-line text-base leading-relaxed">
                      {lessons[currentLesson].content.detailedContent}
                    </div>
                  )}

                  {lessons[currentLesson].content.principles && (
                    <div className="space-y-6">
                      {lessons[currentLesson].content.principles.map((principle, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h3 className="text-xl font-bold text-primary mb-2">{principle.title}</h3>
                          <p className="text-muted-foreground mb-3">{principle.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Examples:</h4>
                              <ul className="space-y-1">
                                {principle.examples.map((example, i) => (
                                  <li key={i} className="flex items-center gap-2 text-sm">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    {example}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-success/10 p-3 rounded-lg">
                              <h4 className="font-semibold text-success mb-1">Impact:</h4>
                              <p className="text-sm">{principle.impact}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {lessons[currentLesson].content.categories && (
                    <div className="space-y-4">
                      {lessons[currentLesson].content.categories.map((category, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-8 h-8 rounded-full ${
                              category.color === 'Green' ? 'bg-green-500' :
                              category.color === 'Blue' ? 'bg-blue-500' : 'bg-red-500'
                            }`}></div>
                            <div>
                              <h3 className="font-bold">{category.type}</h3>
                              <p className="text-sm text-muted-foreground">{category.description}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Examples:</h4>
                              <ul className="space-y-1">
                                {category.examples.map((example, i) => (
                                  <li key={i} className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="h-3 w-3 text-success" />
                                    {example}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <div className="mb-2">
                                <strong>Treatment:</strong> {category.treatment}
                              </div>
                              <div>
                                <strong>Percentage:</strong> {category.percentage}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="quiz" className="space-y-4">
                <div className="bg-accent/10 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Test Your Knowledge</h3>
                  <p className="text-lg mb-4">{lessons[currentLesson].content.quiz.question}</p>
                  
                  <div className="space-y-2">
                    {lessons[currentLesson].content.quiz.options.map((option, index) => (
                      <Button
                        key={index}
                        variant={quizAnswers[currentLesson] === index ? 
                          (index === lessons[currentLesson].content.quiz.correct ? "default" : "destructive") 
                          : "outline"}
                        className="w-full justify-start text-left"
                        onClick={() => handleQuizAnswer(currentLesson, index)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>

                  {quizAnswers[currentLesson] !== undefined && (
                    <div className="mt-4 p-3 rounded-lg bg-success/10">
                      <p className="text-success font-medium">
                        {quizAnswers[currentLesson] === lessons[currentLesson].content.quiz.correct ? 
                          "Correct! Great job!" : "Incorrect. The correct answer is highlighted above."}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
                disabled={currentLesson === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <Button
                onClick={() => handleCompleteLesson(currentLesson)}
                disabled={completedLessons.includes(currentLesson)}
              >
                {completedLessons.includes(currentLesson) ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completed
                  </>
                ) : (
                  <>
                    <Award className="h-4 w-4 mr-2" />
                    Mark Complete
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={() => setCurrentLesson(Math.min(lessons.length - 1, currentLesson + 1))}
                disabled={currentLesson === lessons.length - 1}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};