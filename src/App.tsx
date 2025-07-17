import { useState, useCallback } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
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
  Zap,
  AlertCircle,
  Plus,
  Edit3
} from 'lucide-react'
import { generateLandingPage, exportAsHTML, exportAsReact, regenerateSectionHTML, type GeneratedPage, type GeneratedSection } from './services/pageGenerator'
import { EditableSection } from './components/EditableSection'
import { SectionCustomizer } from './components/SectionCustomizer'
import toast, { Toaster } from 'react-hot-toast'

function App() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [generatedPage, setGeneratedPage] = useState<GeneratedPage | null>(null)
  const [activeTab, setActiveTab] = useState('generator')
  const [error, setError] = useState<string | null>(null)
  const [editMode, setEditMode] = useState(false)


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

  const updateSection = useCallback((updatedSection: GeneratedSection) => {
    if (!generatedPage) return
    
    // Regenerate HTML for the updated section
    const sectionWithNewHTML = regenerateSectionHTML(updatedSection, generatedPage.colorScheme)
    
    setGeneratedPage({
      ...generatedPage,
      sections: generatedPage.sections.map(section =>
        section.id === updatedSection.id ? sectionWithNewHTML : section
      )
    })
  }, [generatedPage])

  const deleteSection = useCallback((sectionId: string) => {
    if (!generatedPage) return
    
    setGeneratedPage({
      ...generatedPage,
      sections: generatedPage.sections.filter(section => section.id !== sectionId)
    })
    toast.success('Section deleted')
  }, [generatedPage])

  const duplicateSection = useCallback((section: GeneratedSection) => {
    if (!generatedPage) return
    
    const newSection = {
      ...section,
      id: `${section.id}_copy_${Date.now()}`,
      name: `${section.name} (Copy)`
    }
    
    setGeneratedPage({
      ...generatedPage,
      sections: [...generatedPage.sections, newSection]
    })
    toast.success('Section duplicated')
  }, [generatedPage])

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination || !generatedPage) return
    
    const newSections = Array.from(generatedPage.sections)
    const [reorderedItem] = newSections.splice(result.source.index, 1)
    newSections.splice(result.destination.index, 0, reorderedItem)
    
    setGeneratedPage({
      ...generatedPage,
      sections: newSections
    })
  }, [generatedPage])

  const addNewSection = useCallback((sectionType: string) => {
    if (!generatedPage) return
    
    const newSection: GeneratedSection = {
      id: `new_${sectionType}_${Date.now()}`,
      name: `New ${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}`,
      enabled: true,
      content: getSectionTemplate(sectionType),
      html: `<section class="py-16 px-4"><div class="max-w-4xl mx-auto text-center"><h2 class="text-3xl font-bold mb-4">New ${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}</h2><p class="text-gray-600">Edit this section to customize its content.</p></div></section>`
    }
    
    setGeneratedPage({
      ...generatedPage,
      sections: [...generatedPage.sections, newSection]
    })
    toast.success('New section added')
  }, [generatedPage])

  const getSectionTemplate = (sectionType: string) => {
    switch (sectionType) {
      case 'hero':
        return {
          headline: 'Your Amazing Headline',
          subheadline: 'Supporting Subheadline',
          description: 'Compelling description that converts visitors into customers.',
          primaryCTA: 'Get Started',
          secondaryCTA: 'Learn More',
          badge: 'New & Improved'
        }
      case 'features':
        return {
          title: 'Powerful Features',
          subtitle: 'Everything you need to succeed',
          features: [
            { title: 'Feature 1', description: 'Description of feature 1' },
            { title: 'Feature 2', description: 'Description of feature 2' },
            { title: 'Feature 3', description: 'Description of feature 3' }
          ]
        }
      case 'testimonials':
        return {
          title: 'What Our Customers Say',
          subtitle: 'Join thousands of satisfied customers',
          testimonials: [
            { text: 'Great product! Highly recommended.', author: 'John Doe', role: 'CEO, Company' },
            { text: 'Excellent service and support.', author: 'Jane Smith', role: 'Marketing Director' }
          ]
        }
      case 'faq':
        return {
          title: 'Frequently Asked Questions',
          subtitle: 'Everything you need to know',
          faqs: [
            { question: 'How does it work?', answer: 'It works by...' },
            { question: 'Is it secure?', answer: 'Yes, it is completely secure...' }
          ]
        }
      case 'cta':
        return {
          headline: 'Ready to Get Started?',
          description: 'Join thousands of satisfied customers today',
          primaryCTA: 'Start Free Trial',
          secondaryCTA: 'Contact Sales'
        }
      default:
        return { title: 'New Section', content: 'Edit this section to add your content.' }
    }
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
          <TabsList className="grid w-full grid-cols-1 lg:w-[200px] mx-auto mb-8">
            <TabsTrigger value="generator">Generator</TabsTrigger>
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
                  className="min-h-[80px] resize-none"
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
                  {/* Edit Mode Toggle */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Edit3 className="w-5 h-5" />
                          <span>Edit Mode</span>
                        </div>
                        <Switch
                          checked={editMode}
                          onCheckedChange={setEditMode}
                        />
                      </CardTitle>
                    </CardHeader>
                    {editMode && (
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Edit mode allows you to customize sections, reorder them, and add new content.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline" onClick={() => addNewSection('hero')}>
                            <Plus className="w-4 h-4 mr-1" />
                            Hero
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => addNewSection('features')}>
                            <Plus className="w-4 h-4 mr-1" />
                            Features
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => addNewSection('testimonials')}>
                            <Plus className="w-4 h-4 mr-1" />
                            Testimonials
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => addNewSection('faq')}>
                            <Plus className="w-4 h-4 mr-1" />
                            FAQ
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => addNewSection('cta')}>
                            <Plus className="w-4 h-4 mr-1" />
                            CTA
                          </Button>
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* Section Customizer */}
                  <SectionCustomizer 
                    page={generatedPage}
                    onUpdatePage={setGeneratedPage}
                  />

                  {/* Page Sections */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Settings className="w-5 h-5" />
                        <span>Page Sections</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="sections">
                          {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                              {!editMode ? (
                                // Simple toggle view
                                generatedPage.sections.map((section, index) => (
                                  <Draggable key={section.id} draggableId={section.id} index={index}>
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className={`flex items-center justify-between p-3 border rounded-lg mb-3 bg-white transition-all duration-200 ${
                                          snapshot.isDragging ? 'shadow-lg scale-105 rotate-1' : 'hover:shadow-md'
                                        }`}
                                      >
                                        <div className="flex items-center space-x-3">
                                          <div {...provided.dragHandleProps}>
                                            <Grip className="w-4 h-4 text-muted-foreground cursor-move" />
                                          </div>
                                          <span className="font-medium">{section.name}</span>
                                        </div>
                                        <Switch
                                          checked={section.enabled}
                                          onCheckedChange={() => toggleSection(section.id)}
                                        />
                                      </div>
                                    )}
                                  </Draggable>
                                ))
                              ) : (
                                // Editable sections view
                                generatedPage.sections.map((section, index) => (
                                  <Draggable key={section.id} draggableId={section.id} index={index}>
                                    {(provided, snapshot) => (
                                      <div ref={provided.innerRef} {...provided.draggableProps} className="mb-4">
                                        <EditableSection
                                          section={section}
                                          onUpdate={updateSection}
                                          onDelete={deleteSection}
                                          onDuplicate={duplicateSection}
                                          onToggleVisibility={toggleSection}
                                          isDragging={snapshot.isDragging}
                                          dragHandleProps={provided.dragHandleProps}
                                        />
                                      </div>
                                    )}
                                  </Draggable>
                                ))
                              )}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
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
                      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200/60 min-h-[800px] overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
                        <div className="relative">
                          {/* Enhanced Browser Chrome */}
                          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-200/60 backdrop-blur-sm">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-gradient-to-br from-red-400 to-red-500 rounded-full shadow-sm"></div>
                              <div className="w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-sm"></div>
                              <div className="w-3 h-3 bg-gradient-to-br from-green-400 to-green-500 rounded-full shadow-sm"></div>
                            </div>
                            <div className="flex-1 max-w-md mx-4">
                              <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 text-sm text-slate-600 border border-slate-200/60 shadow-sm">
                                <div className="flex items-center space-x-2">
                                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                  <span className="font-medium">
                                    {generatedPage.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.com
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-slate-200 rounded border border-slate-300/60"></div>
                              <div className="w-6 h-6 bg-slate-200 rounded border border-slate-300/60"></div>
                            </div>
                          </div>
                          
                          {/* Enhanced Page Content */}
                          <div className="bg-white overflow-y-auto max-h-[700px] scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 relative">
                            {/* Subtle overlay for depth */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/30 pointer-events-none z-10"></div>
                            
                            <div className="space-y-0 relative">
                              {generatedPage.sections
                                .filter(section => section.enabled)
                                .map((section, index) => (
                                  <div 
                                    key={section.id} 
                                    dangerouslySetInnerHTML={{ __html: section.html }}
                                    className="w-full animate-fade-in relative"
                                    style={{
                                      '--primary': generatedPage.colorScheme.primary,
                                      '--secondary': generatedPage.colorScheme.secondary,
                                      '--accent': generatedPage.colorScheme.accent,
                                      animationDelay: `${index * 0.1}s`
                                    } as React.CSSProperties}
                                  />
                                ))}
                            </div>
                            
                            {/* Bottom fade effect */}
                            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
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
      
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: isDarkMode ? '#1f2937' : '#ffffff',
            color: isDarkMode ? '#f9fafb' : '#111827',
            border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
          },
        }}
      />
    </div>
  )
}

export default App