import React, { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { 
  Edit3, 
  Save, 
  X, 
  Trash2, 
  Copy, 
  Eye, 
  EyeOff,
  GripVertical,
  Settings,
  Palette,
  Type,
  Image,
  Plus
} from 'lucide-react'
import { GeneratedSection } from '../services/pageGenerator'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface EditableSectionProps {
  section: GeneratedSection
  onUpdate: (updatedSection: GeneratedSection) => void
  onDelete: (sectionId: string) => void
  onDuplicate: (section: GeneratedSection) => void
  onToggleVisibility: (sectionId: string) => void
  isDragging?: boolean
  dragHandleProps?: any
}

export const EditableSection: React.FC<EditableSectionProps> = ({
  section,
  onUpdate,
  onDelete,
  onDuplicate,
  onToggleVisibility,
  isDragging,
  dragHandleProps
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(section.content)
  const [showSettings, setShowSettings] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleSave = () => {
    const updatedSection = {
      ...section,
      content: editedContent
    }
    onUpdate(updatedSection)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedContent(section.content)
    setIsEditing(false)
  }

  const handleInlineEdit = (field: string, value: any) => {
    const updatedContent = {
      ...editedContent,
      [field]: value
    }
    setEditedContent(updatedContent)
  }

  const addFeature = () => {
    if (editedContent.features) {
      const newFeature = {
        title: 'New Feature',
        description: 'Feature description'
      }
      handleInlineEdit('features', [...editedContent.features, newFeature])
    }
  }

  const updateFeature = (index: number, field: string, value: string) => {
    if (editedContent.features) {
      const updatedFeatures = [...editedContent.features]
      updatedFeatures[index] = { ...updatedFeatures[index], [field]: value }
      handleInlineEdit('features', updatedFeatures)
    }
  }

  const removeFeature = (index: number) => {
    if (editedContent.features) {
      const updatedFeatures = editedContent.features.filter((_, i) => i !== index)
      handleInlineEdit('features', updatedFeatures)
    }
  }

  const addTestimonial = () => {
    if (editedContent.testimonials) {
      const newTestimonial = {
        text: 'Great product! Highly recommended.',
        author: 'John Doe',
        role: 'CEO, Company'
      }
      handleInlineEdit('testimonials', [...editedContent.testimonials, newTestimonial])
    }
  }

  const updateTestimonial = (index: number, field: string, value: string) => {
    if (editedContent.testimonials) {
      const updatedTestimonials = [...editedContent.testimonials]
      updatedTestimonials[index] = { ...updatedTestimonials[index], [field]: value }
      handleInlineEdit('testimonials', updatedTestimonials)
    }
  }

  const removeTestimonial = (index: number) => {
    if (editedContent.testimonials) {
      const updatedTestimonials = editedContent.testimonials.filter((_, i) => i !== index)
      handleInlineEdit('testimonials', updatedTestimonials)
    }
  }

  const addFAQ = () => {
    if (editedContent.faqs) {
      const newFAQ = {
        question: 'New question?',
        answer: 'Answer to the question.'
      }
      handleInlineEdit('faqs', [...editedContent.faqs, newFAQ])
    }
  }

  const updateFAQ = (index: number, field: string, value: string) => {
    if (editedContent.faqs) {
      const updatedFAQs = [...editedContent.faqs]
      updatedFAQs[index] = { ...updatedFAQs[index], [field]: value }
      handleInlineEdit('faqs', updatedFAQs)
    }
  }

  const removeFAQ = (index: number) => {
    if (editedContent.faqs) {
      const updatedFAQs = editedContent.faqs.filter((_, i) => i !== index)
      handleInlineEdit('faqs', updatedFAQs)
    }
  }

  const renderEditForm = () => {
    const sectionType = section.name.toLowerCase()

    if (sectionType.includes('hero')) {
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              value={editedContent.headline || ''}
              onChange={(e) => handleInlineEdit('headline', e.target.value)}
              placeholder="Main headline"
            />
          </div>
          <div>
            <Label htmlFor="subheadline">Subheadline</Label>
            <Input
              id="subheadline"
              value={editedContent.subheadline || ''}
              onChange={(e) => handleInlineEdit('subheadline', e.target.value)}
              placeholder="Supporting headline"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={editedContent.description || ''}
              onChange={(e) => handleInlineEdit('description', e.target.value)}
              placeholder="Hero description"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primaryCTA">Primary CTA</Label>
              <Input
                id="primaryCTA"
                value={editedContent.primaryCTA || ''}
                onChange={(e) => handleInlineEdit('primaryCTA', e.target.value)}
                placeholder="Get Started"
              />
            </div>
            <div>
              <Label htmlFor="secondaryCTA">Secondary CTA</Label>
              <Input
                id="secondaryCTA"
                value={editedContent.secondaryCTA || ''}
                onChange={(e) => handleInlineEdit('secondaryCTA', e.target.value)}
                placeholder="Learn More"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="badge">Badge Text</Label>
            <Input
              id="badge"
              value={editedContent.badge || ''}
              onChange={(e) => handleInlineEdit('badge', e.target.value)}
              placeholder="New & Improved"
            />
          </div>
        </div>
      )
    }

    if (sectionType.includes('feature')) {
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Section Title</Label>
            <Input
              id="title"
              value={editedContent.title || ''}
              onChange={(e) => handleInlineEdit('title', e.target.value)}
              placeholder="Powerful Features"
            />
          </div>
          <div>
            <Label htmlFor="subtitle">Section Subtitle</Label>
            <Textarea
              id="subtitle"
              value={editedContent.subtitle || ''}
              onChange={(e) => handleInlineEdit('subtitle', e.target.value)}
              placeholder="Everything you need to succeed"
              rows={2}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Features</Label>
              <Button size="sm" onClick={addFeature}>
                <Plus className="w-4 h-4 mr-1" />
                Add Feature
              </Button>
            </div>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {editedContent.features?.map((feature: any, index: number) => (
                <Card key={index} className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Input
                        value={feature.title}
                        onChange={(e) => updateFeature(index, 'title', e.target.value)}
                        placeholder="Feature title"
                        className="font-medium"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFeature(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Textarea
                      value={feature.description}
                      onChange={(e) => updateFeature(index, 'description', e.target.value)}
                      placeholder="Feature description"
                      rows={2}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (sectionType.includes('testimonial')) {
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Section Title</Label>
            <Input
              id="title"
              value={editedContent.title || ''}
              onChange={(e) => handleInlineEdit('title', e.target.value)}
              placeholder="What Our Customers Say"
            />
          </div>
          <div>
            <Label htmlFor="subtitle">Section Subtitle</Label>
            <Textarea
              id="subtitle"
              value={editedContent.subtitle || ''}
              onChange={(e) => handleInlineEdit('subtitle', e.target.value)}
              placeholder="Join thousands of satisfied customers"
              rows={2}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Testimonials</Label>
              <Button size="sm" onClick={addTestimonial}>
                <Plus className="w-4 h-4 mr-1" />
                Add Testimonial
              </Button>
            </div>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {editedContent.testimonials?.map((testimonial: any, index: number) => (
                <Card key={index} className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Testimonial {index + 1}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeTestimonial(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Textarea
                      value={testimonial.text}
                      onChange={(e) => updateTestimonial(index, 'text', e.target.value)}
                      placeholder="Testimonial text"
                      rows={2}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={testimonial.author}
                        onChange={(e) => updateTestimonial(index, 'author', e.target.value)}
                        placeholder="Author name"
                      />
                      <Input
                        value={testimonial.role}
                        onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                        placeholder="Author role"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (sectionType.includes('faq')) {
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Section Title</Label>
            <Input
              id="title"
              value={editedContent.title || ''}
              onChange={(e) => handleInlineEdit('title', e.target.value)}
              placeholder="Frequently Asked Questions"
            />
          </div>
          <div>
            <Label htmlFor="subtitle">Section Subtitle</Label>
            <Textarea
              id="subtitle"
              value={editedContent.subtitle || ''}
              onChange={(e) => handleInlineEdit('subtitle', e.target.value)}
              placeholder="Everything you need to know"
              rows={2}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>FAQs</Label>
              <Button size="sm" onClick={addFAQ}>
                <Plus className="w-4 h-4 mr-1" />
                Add FAQ
              </Button>
            </div>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {editedContent.faqs?.map((faq: any, index: number) => (
                <Card key={index} className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">FAQ {index + 1}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFAQ(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Input
                      value={faq.question}
                      onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                      placeholder="Question"
                    />
                    <Textarea
                      value={faq.answer}
                      onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                      placeholder="Answer"
                      rows={2}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (sectionType.includes('cta')) {
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              value={editedContent.headline || ''}
              onChange={(e) => handleInlineEdit('headline', e.target.value)}
              placeholder="Ready to Get Started?"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={editedContent.description || ''}
              onChange={(e) => handleInlineEdit('description', e.target.value)}
              placeholder="Join thousands of satisfied customers"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primaryCTA">Primary CTA</Label>
              <Input
                id="primaryCTA"
                value={editedContent.primaryCTA || ''}
                onChange={(e) => handleInlineEdit('primaryCTA', e.target.value)}
                placeholder="Start Free Trial"
              />
            </div>
            <div>
              <Label htmlFor="secondaryCTA">Secondary CTA</Label>
              <Input
                id="secondaryCTA"
                value={editedContent.secondaryCTA || ''}
                onChange={(e) => handleInlineEdit('secondaryCTA', e.target.value)}
                placeholder="Contact Sales"
              />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="p-4 text-center text-muted-foreground">
        <p>No custom editor available for this section type.</p>
        <p className="text-sm mt-2">Raw content:</p>
        <pre className="text-xs bg-muted p-2 rounded mt-2 text-left overflow-auto">
          {JSON.stringify(editedContent, null, 2)}
        </pre>
      </div>
    )
  }

  return (
    <div className={`group relative border rounded-lg transition-all duration-200 ${
      isDragging ? 'shadow-lg scale-105 rotate-1' : 'hover:shadow-md'
    } ${!section.enabled ? 'opacity-50' : ''}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between p-3 border-b bg-muted/30">
        <div className="flex items-center space-x-3">
          <div {...dragHandleProps} className="cursor-move">
            <GripVertical className="w-4 h-4 text-muted-foreground" />
          </div>
          <Badge variant={section.enabled ? "default" : "secondary"}>
            {section.name}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onToggleVisibility(section.id)}
            title={section.enabled ? "Hide section" : "Show section"}
          >
            {section.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsEditing(!isEditing)}
            title="Edit section"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDuplicate(section)}
            title="Duplicate section"
          >
            <Copy className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(section.id)}
            title="Delete section"
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="p-4 border-b bg-muted/10">
          <div className="space-y-4">
            {renderEditForm()}
            
            <div className="flex items-center justify-end space-x-2 pt-4 border-t">
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-1" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Section Preview */}
      <div className="p-4">
        <div className="text-sm text-muted-foreground mb-2">Preview:</div>
        <div 
          ref={contentRef}
          className="border rounded bg-white overflow-hidden"
          style={{ maxHeight: '200px', overflowY: 'auto' }}
        >
          <div 
            dangerouslySetInnerHTML={{ __html: section.html }}
            className="transform scale-50 origin-top-left"
            style={{ width: '200%', height: '200%' }}
          />
        </div>
      </div>
    </div>
  )
}