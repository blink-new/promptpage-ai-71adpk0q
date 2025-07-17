import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Switch } from './ui/switch'
import { Slider } from './ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Separator } from './ui/separator'
import { 
  Palette, 
  Type, 
  Layout, 
  Space,
  Settings,
  Save,
  RotateCcw,
  Wand2
} from 'lucide-react'
import { GeneratedPage } from '../services/pageGenerator'

interface SectionCustomizerProps {
  page: GeneratedPage
  onUpdatePage: (updatedPage: GeneratedPage) => void
}

export const SectionCustomizer: React.FC<SectionCustomizerProps> = ({
  page,
  onUpdatePage
}) => {
  const [customizations, setCustomizations] = useState({
    colorScheme: page.colorScheme,
    typography: {
      fontFamily: 'Inter',
      fontSize: 'medium',
      lineHeight: 'normal'
    },
    spacing: {
      sectionPadding: 'normal',
      contentWidth: 'normal'
    },
    layout: {
      containerStyle: 'centered',
      sectionSpacing: 'normal'
    }
  })

  const handleColorChange = (colorType: string, value: string) => {
    const updatedColorScheme = {
      ...customizations.colorScheme,
      [colorType]: value
    }
    
    setCustomizations({
      ...customizations,
      colorScheme: updatedColorScheme
    })
    
    // Update the page with new color scheme
    onUpdatePage({
      ...page,
      colorScheme: updatedColorScheme
    })
  }

  const handleTypographyChange = (property: string, value: string) => {
    setCustomizations({
      ...customizations,
      typography: {
        ...customizations.typography,
        [property]: value
      }
    })
  }

  const handleSpacingChange = (property: string, value: string) => {
    setCustomizations({
      ...customizations,
      spacing: {
        ...customizations.spacing,
        [property]: value
      }
    })
  }

  const handleLayoutChange = (property: string, value: string) => {
    setCustomizations({
      ...customizations,
      layout: {
        ...customizations.layout,
        [property]: value
      }
    })
  }

  const resetToDefaults = () => {
    const defaultCustomizations = {
      colorScheme: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#06b6d4'
      },
      typography: {
        fontFamily: 'Inter',
        fontSize: 'medium',
        lineHeight: 'normal'
      },
      spacing: {
        sectionPadding: 'normal',
        contentWidth: 'normal'
      },
      layout: {
        containerStyle: 'centered',
        sectionSpacing: 'normal'
      }
    }
    
    setCustomizations(defaultCustomizations)
    onUpdatePage({
      ...page,
      colorScheme: defaultCustomizations.colorScheme
    })
  }

  const generateNewColorScheme = async () => {
    // Generate a new color scheme based on the page content
    const colors = [
      { primary: '#ef4444', secondary: '#f97316', accent: '#eab308' }, // Red theme
      { primary: '#10b981', secondary: '#059669', accent: '#06b6d4' }, // Green theme
      { primary: '#8b5cf6', secondary: '#a855f7', accent: '#ec4899' }, // Purple theme
      { primary: '#3b82f6', secondary: '#1d4ed8', accent: '#06b6d4' }, // Blue theme
      { primary: '#f59e0b', secondary: '#d97706', accent: '#dc2626' }, // Orange theme
    ]
    
    const randomScheme = colors[Math.floor(Math.random() * colors.length)]
    handleColorChange('primary', randomScheme.primary)
    handleColorChange('secondary', randomScheme.secondary)
    handleColorChange('accent', randomScheme.accent)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Customize Design</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="colors">
              <Palette className="w-4 h-4 mr-1" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography">
              <Type className="w-4 h-4 mr-1" />
              Type
            </TabsTrigger>
            <TabsTrigger value="layout">
              <Layout className="w-4 h-4 mr-1" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="spacing">
              <Space className="w-4 h-4 mr-1" />
              Space
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Color Scheme</Label>
                <Button size="sm" variant="outline" onClick={generateNewColorScheme}>
                  <Wand2 className="w-4 h-4 mr-1" />
                  Generate
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color" className="text-xs">Primary</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="primary-color"
                      type="color"
                      value={customizations.colorScheme.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="w-8 h-8 rounded border cursor-pointer"
                    />
                    <Input
                      value={customizations.colorScheme.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="text-xs"
                      placeholder="#6366f1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondary-color" className="text-xs">Secondary</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="secondary-color"
                      type="color"
                      value={customizations.colorScheme.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      className="w-8 h-8 rounded border cursor-pointer"
                    />
                    <Input
                      value={customizations.colorScheme.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      className="text-xs"
                      placeholder="#8b5cf6"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accent-color" className="text-xs">Accent</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="accent-color"
                      type="color"
                      value={customizations.colorScheme.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="w-8 h-8 rounded border cursor-pointer"
                    />
                    <Input
                      value={customizations.colorScheme.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="text-xs"
                      placeholder="#06b6d4"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: customizations.colorScheme.primary }}
                />
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: customizations.colorScheme.secondary }}
                />
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: customizations.colorScheme.accent }}
                />
                <span className="text-xs text-muted-foreground ml-2">Preview</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Font Family</Label>
                <Select 
                  value={customizations.typography.fontFamily} 
                  onValueChange={(value) => handleTypographyChange('fontFamily', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                    <SelectItem value="Poppins">Poppins</SelectItem>
                    <SelectItem value="Montserrat">Montserrat</SelectItem>
                    <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Font Size</Label>
                <Select 
                  value={customizations.typography.fontSize} 
                  onValueChange={(value) => handleTypographyChange('fontSize', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Line Height</Label>
                <Select 
                  value={customizations.typography.lineHeight} 
                  onValueChange={(value) => handleTypographyChange('lineHeight', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tight">Tight</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="relaxed">Relaxed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Container Style</Label>
                <Select 
                  value={customizations.layout.containerStyle} 
                  onValueChange={(value) => handleLayoutChange('containerStyle', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="centered">Centered</SelectItem>
                    <SelectItem value="full-width">Full Width</SelectItem>
                    <SelectItem value="narrow">Narrow</SelectItem>
                    <SelectItem value="wide">Wide</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Section Spacing</Label>
                <Select 
                  value={customizations.layout.sectionSpacing} 
                  onValueChange={(value) => handleLayoutChange('sectionSpacing', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="spacing" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Section Padding</Label>
                <Select 
                  value={customizations.spacing.sectionPadding} 
                  onValueChange={(value) => handleSpacingChange('sectionPadding', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tight">Tight</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="loose">Loose</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Content Width</Label>
                <Select 
                  value={customizations.spacing.contentWidth} 
                  onValueChange={(value) => handleSpacingChange('contentWidth', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="narrow">Narrow</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="wide">Wide</SelectItem>
                    <SelectItem value="full">Full Width</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-4" />
        
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={resetToDefaults}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset to Defaults
          </Button>
          
          <Badge variant="secondary" className="text-xs">
            Changes apply instantly
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}