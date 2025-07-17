import { useState } from 'react'
import { Button } from './components/ui/button'
import { Textarea } from './components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Switch } from './components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Separator } from './components/ui/separator'
import { Alert, AlertDescription } from './components/ui/alert'
import { 
  Sparkles, 
  Wand2, 
  Eye, 
  Download, 
  Share2, 
  Copy, 
  Moon, 
  Sun,
  Grip,
  Settings,
  Code,
  FileText,
  Star,
  Check,
  Zap,
  AlertCircle
} from 'lucide-react'
import { generateLandingPage, exportAsHTML, exportAsReact, type GeneratedPage } from './services/pageGenerator'
import toast, { Toaster } from 'react-hot-toast'

function App() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [generatedPage, setGeneratedPage] = useState<GeneratedPage | null>(null)
  const [activeTab, setActiveTab] = useState('generator')
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    setError(null)
    
    try {
      const page = await generateLandingPage(prompt)
      setGeneratedPage(page)
      toast.success('Landing page generated successfully!')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate landing page'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsGenerating(false)
    }
  }

  const toggleSection = (sectionId: string) => {
    if (!generatedPage) return
    
    setGeneratedPage({
      ...generatedPage,
      sections: generatedPage.sections.map(section =>
        section.id === sectionId ? { ...section, enabled: !section.enabled } : section
      )
    })
  }

  const handleExport = (format: 'html' | 'react') => {
    if (!generatedPage) return

    try {
      let content: string
      let filename: string
      
      if (format === 'html') {
        content = exportAsHTML(generatedPage)
        filename = `${generatedPage.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.html`
      } else {
        content = exportAsReact(generatedPage)
        filename = `${generatedPage.title.replace(/[^a-zA-Z0-9]/g, '')}.tsx`
      }

      // Create and download file
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success(`Exported as ${format.toUpperCase()}!`)
    } catch (err) {
      toast.error('Failed to export page')
    }
  }

  const handleShare = async () => {
    if (!generatedPage) return

    try {
      const shareData = {
        title: generatedPage.title,
        text: generatedPage.description,
        url: window.location.href
      }

      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(window.location.href)
        toast.success('Link copied to clipboard!')
      }
    } catch (err) {
      toast.error('Failed to share page')
    }
  }

  const handleCopy = async () => {
    if (!generatedPage) return

    try {
      const htmlContent = exportAsHTML(generatedPage)
      await navigator.clipboard.writeText(htmlContent)
      toast.success('HTML copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy HTML')
    }
  }

  return (
    <div className={`min-h-screen bg-background transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">PromptPage AI</h1>
                <p className="text-xs text-muted-foreground">AI-Powered Landing Page Generator</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="hidden sm:flex">
                <Sparkles className="w-3 h-3 mr-1" />
                Made with AI
              </Badge>
              
              <div className="flex items-center space-x-2">
                <Sun className="w-4 h-4" />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                />
                <Moon className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px] mx-auto mb-8">
            <TabsTrigger value="generator">Generator</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 py-12">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4" />
                <span>AI-Powered</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Generate Beautiful Landing Pages
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Transform your ideas into stunning, responsive landing pages with just a simple text prompt. 
                Perfect for solopreneurs, indie hackers, and AI builders.
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="max-w-4xl mx-auto">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Prompt Input */}
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wand2 className="w-5 h-5" />
                  <span>Describe Your Landing Page</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Example: A landing page for a yoga instructor offering online classes with a calming design, testimonials section, and class booking form..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] resize-none"
                  maxLength={500}
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    {prompt.length}/500 characters
                  </p>
                  <Button 
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className="px-8"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Page
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Generated Page Preview */}
            {generatedPage && (
              <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* Controls Panel */}
                <div className="lg:col-span-1 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Settings className="w-5 h-5" />
                        <span>Page Sections</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {generatedPage.sections.map((section) => (
                        <div key={section.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Grip className="w-4 h-4 text-muted-foreground cursor-move" />
                            <span className="font-medium">{section.name}</span>
                          </div>
                          <Switch
                            checked={section.enabled}
                            onCheckedChange={() => toggleSection(section.id)}
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Download className="w-5 h-5" />
                        <span>Export Options</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => handleExport('html')}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Export as HTML
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => handleExport('react')}
                      >
                        <Code className="w-4 h-4 mr-2" />
                        Export as React
                      </Button>
                      <Separator />
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={handleShare}
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Page
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={handleCopy}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy HTML
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Preview Area */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Eye className="w-5 h-5" />
                        <span>Live Preview</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="bg-white rounded-xl border-2 border-slate-200/60 min-h-[800px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="relative">
                          {/* Browser Chrome */}
                          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200/60">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            </div>
                            <div className="flex-1 max-w-md mx-4">
                              <div className="bg-white rounded-md px-3 py-1 text-sm text-slate-500 border border-slate-200">
                                {generatedPage.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.com
                              </div>
                            </div>
                            <div className="w-16"></div>
                          </div>
                          
                          {/* Page Content */}
                          <div className="bg-white overflow-y-auto max-h-[700px] scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                            <div className="space-y-0">
                              {generatedPage.sections
                                .filter(section => section.enabled)
                                .map((section) => (
                                  <div 
                                    key={section.id} 
                                    dangerouslySetInnerHTML={{ __html: section.html }}
                                    className="w-full animate-fade-in"
                                    style={{
                                      '--primary': generatedPage.colorScheme.primary,
                                      '--secondary': generatedPage.colorScheme.secondary,
                                      '--accent': generatedPage.colorScheme.accent
                                    } as React.CSSProperties}
                                  />
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pricing" className="space-y-8">
            <div className="text-center space-y-4 py-12">
              <h2 className="text-3xl lg:text-5xl font-bold">Simple, Transparent Pricing</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that works best for your needs. Start free, upgrade when you're ready.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Free Plan */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <div className="text-3xl font-bold">$0<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>3 landing pages per month</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Basic templates</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>HTML export</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">Get Started</Button>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="relative border-primary">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <div className="text-3xl font-bold">$29<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Unlimited landing pages</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Premium templates</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>HTML & React export</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Custom branding</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                  <Button className="w-full">Upgrade to Pro</Button>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="text-3xl font-bold">$99<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Everything in Pro</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Team collaboration</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>API access</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>White-label solution</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Dedicated support</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">Contact Sales</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">PromptPage AI</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© 2024 PromptPage AI. All rights reserved.</span>
              <Badge variant="outline" className="text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                Made with AI
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App