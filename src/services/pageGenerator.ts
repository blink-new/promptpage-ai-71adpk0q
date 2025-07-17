import { blink } from '../lib/blink'

export interface GeneratedSection {
  id: string
  name: string
  enabled: boolean
  content: string
  html: string
}

export interface GeneratedPage {
  title: string
  description: string
  sections: GeneratedSection[]
  colorScheme: {
    primary: string
    secondary: string
    accent: string
  }
}

// Modern design templates for each section type
const SECTION_TEMPLATES = {
  hero: (content: any, colors: any) => `
    <section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
      <div class="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-gradient-to-tr from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="space-y-8 animate-fade-in">
          <!-- Badge -->
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 text-blue-700 text-sm font-medium shadow-sm">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
            </svg>
            ${content.badge || 'New & Improved'}
          </div>
          
          <!-- Main Headline -->
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span class="block text-slate-900">${content.headline}</span>
            <span class="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mt-2">
              ${content.subheadline}
            </span>
          </h1>
          
          <!-- Description -->
          <p class="max-w-3xl mx-auto text-xl sm:text-2xl text-slate-600 leading-relaxed">
            ${content.description}
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button class="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 min-w-[200px]">
              <span class="relative z-10">${content.primaryCTA || 'Get Started'}</span>
              <div class="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
            <button class="px-8 py-4 bg-white text-slate-700 font-semibold rounded-2xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 min-w-[200px]">
              ${content.secondaryCTA || 'Learn More'}
            </button>
          </div>
          
          <!-- Social Proof -->
          <div class="pt-12 flex flex-col items-center space-y-4">
            <p class="text-sm text-slate-500 font-medium">Trusted by ${content.socialProofNumber || '10,000+'} customers worldwide</p>
            <div class="flex items-center space-x-8 opacity-60">
              <div class="h-8 w-24 bg-slate-300 rounded"></div>
              <div class="h-8 w-24 bg-slate-300 rounded"></div>
              <div class="h-8 w-24 bg-slate-300 rounded"></div>
              <div class="h-8 w-24 bg-slate-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  
  features: (content: any, colors: any) => `
    <section class="py-24 bg-white relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-20">
          <h2 class="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            ${content.title || 'Powerful Features'}
          </h2>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            ${content.subtitle || 'Everything you need to succeed, all in one place'}
          </p>
        </div>
        
        <!-- Features Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${content.features?.map((feature: any, index: number) => `
            <div class="group relative p-8 bg-white rounded-3xl border border-slate-200/60 hover:border-slate-300/60 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <!-- Icon -->
              <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
                </svg>
              </div>
              
              <!-- Content -->
              <h3 class="text-xl font-bold text-slate-900 mb-3">${feature.title}</h3>
              <p class="text-slate-600 leading-relaxed">${feature.description}</p>
              
              <!-- Hover Effect -->
              <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          `).join('') || ''}
        </div>
      </div>
    </section>
  `,
  
  testimonials: (content: any, colors: any) => `
    <section class="py-24 bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-20">
          <h2 class="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            ${content.title || 'What Our Customers Say'}
          </h2>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto">
            ${content.subtitle || 'Join thousands of satisfied customers who trust our solution'}
          </p>
        </div>
        
        <!-- Testimonials Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${content.testimonials?.map((testimonial: any, index: number) => `
            <div class="relative p-8 bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <!-- Quote Icon -->
              <div class="absolute -top-4 left-8">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
              
              <!-- Stars -->
              <div class="flex space-x-1 mb-4 pt-4">
                ${Array(5).fill(0).map(() => `
                  <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                `).join('')}
              </div>
              
              <!-- Testimonial Text -->
              <p class="text-slate-700 mb-6 leading-relaxed">"${testimonial.text}"</p>
              
              <!-- Author -->
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full mr-4"></div>
                <div>
                  <p class="font-semibold text-slate-900">${testimonial.author}</p>
                  <p class="text-sm text-slate-500">${testimonial.role}</p>
                </div>
              </div>
            </div>
          `).join('') || ''}
        </div>
      </div>
    </section>
  `,
  
  faq: (content: any, colors: any) => `
    <section class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            ${content.title || 'Frequently Asked Questions'}
          </h2>
          <p class="text-xl text-slate-600">
            ${content.subtitle || 'Everything you need to know about our service'}
          </p>
        </div>
        
        <!-- FAQ Items -->
        <div class="space-y-4">
          ${content.faqs?.map((faq: any, index: number) => `
            <div class="group border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 transition-colors duration-200">
              <button class="w-full px-8 py-6 text-left flex items-center justify-between bg-white hover:bg-slate-50 transition-colors duration-200">
                <h3 class="text-lg font-semibold text-slate-900 pr-8">${faq.question}</h3>
                <div class="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white transform group-hover:rotate-45 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </div>
              </button>
              <div class="px-8 pb-6 text-slate-600 leading-relaxed">
                ${faq.answer}
              </div>
            </div>
          `).join('') || ''}
        </div>
      </div>
    </section>
  `,
  
  cta: (content: any, colors: any) => `
    <section class="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 bg-grid-white-05 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
      <div class="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
      
      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="space-y-8">
          <!-- Headline -->
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            ${content.headline || 'Ready to Get Started?'}
          </h2>
          
          <!-- Description -->
          <p class="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            ${content.description || 'Join thousands of satisfied customers and transform your business today'}
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button class="group relative px-8 py-4 bg-white text-slate-900 font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 min-w-[200px]">
              <span class="relative z-10">${content.primaryCTA || 'Start Free Trial'}</span>
            </button>
            <button class="px-8 py-4 bg-transparent text-white font-semibold rounded-2xl border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-200 min-w-[200px]">
              ${content.secondaryCTA || 'Contact Sales'}
            </button>
          </div>
          
          <!-- Trust Indicators -->
          <div class="pt-12 flex flex-col items-center space-y-4">
            <p class="text-sm text-blue-200">No credit card required • Cancel anytime • 30-day money-back guarantee</p>
          </div>
        </div>
      </div>
    </section>
  `
}

export async function generateLandingPage(prompt: string): Promise<GeneratedPage> {
  // Generate the landing page structure and content using AI
  const { object: pageStructure } = await blink.ai.generateObject({
    prompt: `Create a comprehensive, professional landing page structure for: "${prompt}". 
    
    Generate detailed, realistic content for each section with specific, engaging copy that would convert visitors into customers.
    
    REQUIRED SECTIONS:
    1. Hero - compelling headline, subheadline, description, primary/secondary CTAs, badge text, social proof number
    2. Features - title, subtitle, and 6 detailed features with titles and descriptions
    3. Testimonials - title, subtitle, and 6 realistic customer testimonials with names, roles, and detailed feedback
    4. FAQ - title, subtitle, and 8 common questions with comprehensive answers
    5. CTA - compelling headline, description, primary/secondary CTAs
    
    Make the content:
    - Specific to the business/industry mentioned in the prompt
    - Professional and conversion-focused
    - Realistic and believable
    - Emotionally engaging
    - Include specific benefits and outcomes
    - Use modern, professional language
    
    Choose an elegant color scheme with hex colors that fits the business type.`,
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        colorScheme: {
          type: 'object',
          properties: {
            primary: { type: 'string' },
            secondary: { type: 'string' },
            accent: { type: 'string' }
          },
          required: ['primary', 'secondary', 'accent']
        },
        sections: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              enabled: { type: 'boolean' },
              content: { type: 'object' }
            },
            required: ['id', 'name', 'enabled', 'content']
          }
        }
      },
      required: ['title', 'description', 'colorScheme', 'sections']
    }
  })

  // Generate HTML for each section using modern templates
  const sectionsWithHtml = pageStructure.sections.map((section) => {
    let html = ''
    
    const sectionType = section.name.toLowerCase()
    if (sectionType.includes('hero')) {
      html = SECTION_TEMPLATES.hero(section.content, pageStructure.colorScheme)
    } else if (sectionType.includes('feature')) {
      html = SECTION_TEMPLATES.features(section.content, pageStructure.colorScheme)
    } else if (sectionType.includes('testimonial')) {
      html = SECTION_TEMPLATES.testimonials(section.content, pageStructure.colorScheme)
    } else if (sectionType.includes('faq')) {
      html = SECTION_TEMPLATES.faq(section.content, pageStructure.colorScheme)
    } else if (sectionType.includes('cta')) {
      html = SECTION_TEMPLATES.cta(section.content, pageStructure.colorScheme)
    } else {
      // Fallback for any other section type
      html = `<section class="py-16 px-4"><div class="max-w-4xl mx-auto text-center"><h2 class="text-3xl font-bold mb-4">${section.name}</h2><div class="text-gray-600">${JSON.stringify(section.content)}</div></div></section>`
    }
    
    return {
      ...section,
      html: html.trim()
    }
  })

  return {
    title: pageStructure.title,
    description: pageStructure.description,
    sections: sectionsWithHtml,
    colorScheme: pageStructure.colorScheme
  }
}

export function exportAsHTML(page: GeneratedPage): string {
  const enabledSections = page.sections.filter(section => section.enabled)
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.title}</title>
    <meta name="description" content="${page.description}">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '${page.colorScheme.primary}',
                        secondary: '${page.colorScheme.secondary}',
                        accent: '${page.colorScheme.accent}'
                    },
                    animation: {
                        'fade-in': 'fade-in 0.6s ease-out',
                        'slide-up': 'slide-up 0.6s ease-out',
                    },
                    keyframes: {
                        'fade-in': {
                            '0%': { opacity: '0', transform: 'translateY(10px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' }
                        },
                        'slide-up': {
                            '0%': { opacity: '0', transform: 'translateY(20px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' }
                        }
                    }
                }
            }
        }
    </script>
    <style>
        :root {
            --primary: ${page.colorScheme.primary};
            --secondary: ${page.colorScheme.secondary};
            --accent: ${page.colorScheme.accent};
        }
        .bg-grid-slate-100 {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.05)'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e");
        }
        .bg-grid-white-05 {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e");
        }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .smooth-scroll {
            scroll-behavior: smooth;
        }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body class="smooth-scroll antialiased">
    ${enabledSections.map(section => section.html).join('\n    ')}
    
    <script>
        // Add smooth scrolling and interaction effects
        document.addEventListener('DOMContentLoaded', function() {
            // Animate elements on scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            // Observe all sections
            document.querySelectorAll('section').forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                observer.observe(section);
            });
        });
    </script>
</body>
</html>`
}

export function exportAsReact(page: GeneratedPage): string {
  const enabledSections = page.sections.filter(section => section.enabled)
  
  const componentName = page.title.replace(/[^a-zA-Z0-9]/g, '')
  
  return `import React from 'react'

interface ${componentName}Props {
  className?: string
}

const ${componentName}: React.FC<${componentName}Props> = ({ className = '' }) => {
  return (
    <div className={\`\${className}\`}>
      ${enabledSections.map(section => 
        `{/* ${section.name} Section */}
      <div dangerouslySetInnerHTML={{ __html: \`${section.html.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />`
      ).join('\n      ')}
    </div>
  )
}

export default ${componentName}`
}