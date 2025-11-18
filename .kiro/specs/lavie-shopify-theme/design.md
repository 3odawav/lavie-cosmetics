# Design Document

## Overview

This design document outlines the technical approach for developing a bilingual (Arabic/English) Shopify theme for La Vie Cosmetics Egypt. The theme will leverage Shopify's Liquid templating engine, custom sections, and localization features to deliver a modern, responsive e-commerce experience with full RTL (right-to-left) support for Arabic content.

The design follows Shopify's theme architecture best practices, utilizing the existing theme structure with sections, snippets, templates, and assets. The implementation will focus on bilingual content delivery, custom typography, hero carousel functionality, and product filtering to display only La Vie branded products.

## Architecture

### Theme Structure

The theme follows Shopify's standard directory structure:

```
/
├── assets/           # CSS, JS, images, fonts
├── config/           # Theme settings and configuration
├── layout/           # Base layout templates
├── locales/          # Translation files (en.default.json, ar.json)
├── sections/         # Reusable page sections
├── snippets/         # Reusable code components
└── templates/        # Page templates
```

### Language Architecture

The bilingual system will use:
- **Shopify's native localization system** for content translation
- **Locale files** (`locales/en.default.json` and `locales/ar.json`) for all translatable strings
- **CSS direction switching** using `[dir="rtl"]` and `[dir="ltr"]` selectors
- **JavaScript language detection** to apply appropriate styles and behaviors
- **Browser localStorage** to persist language preference across sessions

### Component Hierarchy

```
Layout (theme.liquid)
├── Header Section
│   ├── Language Switcher Snippet
│   ├── Navigation Snippet
│   └── Logo
├── Main Content
│   ├── Hero Carousel Section
│   ├── Best Sellers Section
│   ├── Product Grid Section
│   └── Certificate Section
└── Footer Section
    └── Quality Badges Snippet
```

## Components and Interfaces

### 1. Language Switcher Component

**Location**: `snippets/language-switcher.liquid`

**Functionality**:
- Renders language toggle UI (English/Arabic)
- Triggers Shopify's locale switching mechanism
- Stores preference in localStorage
- Updates page direction attribute (`dir="ltr"` or `dir="rtl"`)

**Interface**:
```liquid
{% render 'language-switcher' %}
```

### 2. Hero Carousel Section

**Location**: `sections/hero-carousel.liquid`

**Functionality**:
- Displays 4 rotating slides with images
- Auto-advances every 5 seconds
- Manual navigation controls
- Smooth transition animations
- Responsive image loading

**Schema Settings**:
- Slide images (4 slots)
- Slide text overlays (bilingual)
- CTA button text and links
- Animation speed
- Auto-play toggle

**Dependencies**:
- Slick Slider library (already present in `assets/slick-slider.min.js`)
- Custom CSS (`assets/hero-carousel.css`)

### 3. Product Filter Component

**Location**: `sections/lavie-products.liquid`

**Functionality**:
- Fetches products from Shopify product API
- Filters products by vendor ("Lavie Cosmetics EG")
- Renders product cards with image, title, price, description
- Supports bilingual product data

**Data Source**:
- Shopify product metafields for bilingual descriptions
- Product vendor field for filtering
- Product images from CDN

### 4. Best Sellers Section

**Location**: `sections/featured-collection.liquid` (customized)

**Functionality**:
- Displays specific 5 products by handle
- Hard-coded product handles for best sellers
- Responsive grid layout

**Product Handles**:
1. `lavie-absolute-protein-brazilian-keratin-straightening-treatment-all-hair-types`
2. `lavie-tropical-purple-straightening-treatment-for-blonde-gray-hair`
3. `lavie-brazilian-natural-spices-shampoo-daily-hydrating-hair-conditioner-300ml`
4. `untitled-nov5_04-35` (Deep Repair Spray)
5. `hydrating-mask`

### 5. Certificate Section

**Location**: `sections/certificate-section.liquid`

**Functionality**:
- Displays certification text and badges
- Bilingual content support
- Image/badge display

### 6. Footer Badges Component

**Location**: `snippets/footer-badges.liquid`

**Functionality**:
- Renders 6 quality badges with icons
- Bilingual badge text
- Responsive layout

**Badges**:
- Cruelty-Free
- Paraben-Free
- Sulfate-Free
- Dermatologically Tested
- Made in Brazil
- Official Egypt Distributor

### 7. About Us Pages

**Location**: 
- `sections/about-us-en.liquid`
- `sections/about-us-ar.liquid`

**Templates**:
- `templates/page.about-us-en.liquid`
- `templates/page.about-us-ar.liquid`

### 8. Contact Us Pages

**Location**:
- `sections/contact-us-en.liquid`
- `sections/contact-us-ar.liquid`

**Templates**:
- `templates/page.contact-us-en.liquid`
- `templates/page.contact-us-ar.liquid`

**Contact Information**:
- Office: Maadi Corniche, Cairo, Egypt
- Email: info@laviecosmetics-eg.com
- Working Hours: Sunday – Thursday 9 AM – 5 PM
- Phone numbers (clickable tel: links)

### 9. Product Collections

**Collections**:
1. **Brazilian Protein Collection**
   - Products: Absolute Protein, Tropical Purple, Shampoo, Conditioner

2. **Haircare For Her Collection**
   - Products: Deep Repair Spray, SOS Peptide Plex, Hair Mask

## Data Models

### Product Data Structure

```javascript
{
  handle: String,           // URL-friendly identifier
  title: String,            // Product name
  description: String,      // HTML description
  price: Number,            // Price in EGP
  image: String,            // CDN image URL
  vendor: String,           // "Lavie Cosmetics EG"
  type: String,             // Product category
  tags: Array<String>,      // Product tags
  metafields: {
    title_ar: String,       // Arabic title
    description_ar: String  // Arabic description
  }
}
```

### Locale Data Structure

```json
{
  "general": {
    "language_switcher": {
      "english": "English",
      "arabic": "العربية"
    }
  },
  "sections": {
    "hero": {
      "slide_1_text": "...",
      "slide_2_text": "...",
      "cta_button": "..."
    },
    "best_sellers": {
      "heading": "Best Sellers"
    },
    "certificate": {
      "heading": "Authorized Distributor Certificate",
      "text": "..."
    }
  },
  "footer": {
    "badges": {
      "cruelty_free": "Cruelty-Free",
      "paraben_free": "Paraben-Free",
      ...
    }
  }
}
```

### Font Configuration

```css
@font-face {
  font-family: 'SOFIA PRO';
  src: url('sofia-pro.woff2') format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'NEUE HAAS GROTESK';
  src: url('neue-haas-grotesk.woff2') format('woff2');
  font-display: swap;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After analyzing all acceptance criteria, several redundancies were identified:

- **Requirements 4.1 and 4.3** both validate product filtering (positive and negative cases) - these can be combined into a single comprehensive property
- **Requirements 4.5 and 5.4** both test product click navigation - these can be unified into one property about product links
- **Requirements 1.2 and 1.3** follow the same pattern for different languages - these can be combined into one property about language switching behavior

### Correctness Properties

Property 1: Language switcher presence
*For any* page load, the header should contain a language switcher element
**Validates: Requirements 1.1**

Property 2: Language selection updates content and direction
*For any* language selection (English or Arabic), all page content should render in the selected language with the corresponding text direction (ltr for English, rtl for Arabic)
**Validates: Requirements 1.2, 1.3**

Property 3: Language switching preserves page context
*For any* page and language switch, the current page URL and context should remain unchanged after switching languages
**Validates: Requirements 1.4**

Property 4: Language preference persistence
*For any* language selection, when the user returns to the website in a new session, the previously selected language should be active
**Validates: Requirements 1.5**

Property 5: Heading font application
*For any* heading element (h1, h2, h3, h4, h5, h6), the computed font-family should be SOFIA PRO or its fallback
**Validates: Requirements 2.1**

Property 6: Body text font application
*For any* body text element (p, span, div with text), the computed font-family should be NEUE HAAS GROTESK or its fallback
**Validates: Requirements 2.2**

Property 7: Font fallback on load failure
*For any* font loading failure, the system should apply fallback fonts and maintain layout integrity without shifts or breaks
**Validates: Requirements 2.3**

Property 8: Carousel slide transitions
*For any* carousel slide transition (auto or manual), smooth CSS transition or animation effects should be applied
**Validates: Requirements 3.3, 12.1**

Property 9: Carousel navigation functionality
*For any* carousel navigation control interaction (next, previous, dot indicators), the active slide should change accordingly
**Validates: Requirements 3.5**

Property 10: Carousel slide overlay content
*For any* carousel slide, promotional text and a call-to-action button should be present as overlay elements
**Validates: Requirements 3.6**

Property 11: Product vendor filtering
*For any* product displayed in the products section, the vendor field should equal "Lavie Cosmetics EG"
**Validates: Requirements 4.1, 4.3**

Property 12: Product display completeness
*For any* displayed product, the product card should contain name, image, price, and description in the currently selected language
**Validates: Requirements 4.4, 10.4**

Property 13: Product link navigation
*For any* product click interaction, the system should navigate to that product's detail page
**Validates: Requirements 4.5, 5.4**

Property 14: Best Sellers product display
*For any* product in the Best Sellers section, the product card should display image, name, and price
**Validates: Requirements 5.3**

Property 15: Footer badges presence
*For any* page load, the footer should contain all six quality badges (Cruelty-Free, Paraben-Free, Sulfate-Free, Dermatologically Tested, Made in Brazil, Official Egypt Distributor)
**Validates: Requirements 7.1**

Property 16: Footer badge visual indicators
*For any* footer badge, an icon or visual indicator should be present alongside the text
**Validates: Requirements 7.2**

Property 17: Footer badge translation
*For any* footer badge when Arabic language is selected, the badge text should be displayed in Arabic
**Validates: Requirements 7.3**

Property 18: Contact page phone link formatting
*For any* phone number on the Contact Us page, the element should be a clickable link with tel: protocol
**Validates: Requirements 9.5**

Property 19: Carousel hover feedback
*For any* carousel navigation control hover event, visual feedback (color, opacity, or transform change) should be applied
**Validates: Requirements 12.3**

Property 20: Carousel active slide effects
*For any* active carousel slide, zoom or parallax transform effects should be applied to the background image
**Validates: Requirements 12.2**

Property 21: Carousel layout stability
*For any* carousel load and animation, the Cumulative Layout Shift (CLS) metric should remain below 0.1
**Validates: Requirements 12.4**

## Error Handling

### Font Loading Failures

**Strategy**: Use `font-display: swap` to show fallback fonts immediately while custom fonts load. Define fallback font stacks:
- Headings: `'SOFIA PRO', 'Helvetica Neue', Arial, sans-serif`
- Body: `'NEUE HAAS GROTESK', 'Helvetica Neue', Arial, sans-serif`

**Implementation**: Monitor font loading with FontFaceObserver and apply fallback classes if fonts fail to load within 3 seconds.

### Missing Product Data

**Strategy**: Gracefully handle missing product fields:
- Missing image: Display placeholder image
- Missing description: Show title only
- Missing price: Hide "Add to Cart" button
- Missing translation: Fall back to English content

**Implementation**: Use Liquid conditionals to check for field existence before rendering.

### Language Switching Errors

**Strategy**: If locale switching fails:
- Log error to console
- Maintain current language
- Show user-friendly error message
- Retry mechanism with exponential backoff

**Implementation**: Wrap locale switching in try-catch blocks with error state management.

### Carousel Loading Failures

**Strategy**: If carousel JavaScript fails to initialize:
- Display first slide as static image
- Hide navigation controls
- Ensure content remains accessible

**Implementation**: Progressive enhancement approach - carousel is an enhancement, not a requirement for content access.

### Product Filtering Failures

**Strategy**: If vendor filtering fails:
- Display all products rather than none
- Log error for debugging
- Add visual indicator that filtering is unavailable

**Implementation**: Defensive programming with fallback to unfiltered product list.

## Testing Strategy

### Unit Testing

Unit tests will focus on specific examples and edge cases:

**JavaScript Unit Tests** (using Jest or similar):
- Language switcher click handlers
- LocalStorage read/write operations
- Carousel initialization with various configurations
- Product filtering logic with edge cases (empty vendor, null values)
- Font loading detection

**Liquid Template Tests** (using Shopify Theme Check):
- Template syntax validation
- Required section schema validation
- Snippet parameter validation
- Translation key existence

**CSS Tests**:
- RTL/LTR direction switching
- Font-family application
- Responsive breakpoints
- Animation performance

### Property-Based Testing

Property-based tests will verify universal properties across all inputs using **fast-check** (JavaScript property testing library).

**Configuration**: Each property test will run a minimum of 100 iterations with randomly generated inputs.

**Test Tagging**: Each property-based test will include a comment tag in this format:
```javascript
// **Feature: lavie-shopify-theme, Property {number}: {property_text}**
```

**Property Test Coverage**:

1. **Language Switching Properties** (Properties 2, 3, 4)
   - Generate random page URLs and language selections
   - Verify content language and direction consistency
   - Verify page context preservation
   - Verify localStorage persistence

2. **Font Application Properties** (Properties 5, 6, 7)
   - Generate random DOM elements
   - Verify computed font-family values
   - Simulate font loading failures
   - Verify fallback behavior

3. **Carousel Properties** (Properties 8, 9, 10, 19, 20, 21)
   - Generate random slide counts and configurations
   - Verify transition animations
   - Verify navigation behavior
   - Verify overlay content presence
   - Measure layout shift metrics

4. **Product Display Properties** (Properties 11, 12, 13, 14)
   - Generate random product data
   - Verify vendor filtering
   - Verify required fields presence
   - Verify link functionality

5. **Footer Properties** (Properties 15, 16, 17)
   - Generate random page contexts
   - Verify badge presence and count
   - Verify icon presence
   - Verify translation behavior

6. **Contact Page Properties** (Property 18)
   - Generate random phone number formats
   - Verify tel: link formatting

### Integration Testing

Integration tests will verify component interactions:

- Language switcher updates all page sections
- Product filtering works with Shopify API
- Carousel integrates with Slick Slider library
- Font loading integrates with CSS rendering
- LocalStorage integrates with language switcher

### Manual Testing Checklist

- Visual regression testing across browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsiveness testing (iOS Safari, Android Chrome)
- RTL layout visual verification
- Accessibility testing (screen readers, keyboard navigation)
- Performance testing (Lighthouse scores, Core Web Vitals)

### Shopify Theme Validation

- Run Shopify Theme Check CLI tool
- Validate theme package structure
- Test theme upload and activation in Shopify admin
- Verify all sections appear in theme customizer

## Performance Considerations

### Font Loading Optimization

- Preload critical fonts (SOFIA PRO regular, NEUE HAAS GROTESK regular)
- Use `font-display: swap` for non-blocking rendering
- Subset fonts to include only required characters
- Serve fonts in WOFF2 format for optimal compression

### Image Optimization

- Use Shopify CDN for all product images
- Implement lazy loading for below-fold images
- Serve responsive images with srcset
- Use WebP format with JPEG fallback

### JavaScript Optimization

- Defer non-critical JavaScript
- Minimize carousel library size (use Slick Slider minified)
- Bundle and minify custom JavaScript
- Use code splitting for page-specific scripts

### CSS Optimization

- Critical CSS inlining for above-fold content
- Defer non-critical CSS
- Minimize and compress CSS files
- Use CSS containment for isolated components

### Caching Strategy

- Leverage Shopify CDN caching
- Set appropriate cache headers for static assets
- Use localStorage for language preference (avoid server round-trips)
- Implement service worker for offline support (optional enhancement)

## Accessibility

### WCAG 2.1 AA Compliance

- Semantic HTML structure
- Proper heading hierarchy
- Alt text for all images
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- Color contrast ratios (minimum 4.5:1 for text)

### RTL Accessibility

- Proper `dir` attribute on html element
- Logical properties for spacing (margin-inline, padding-inline)
- Bidirectional text support
- Icon mirroring for directional icons

### Screen Reader Support

- Descriptive link text
- Form labels and error messages
- Live regions for dynamic content updates
- Skip navigation links

## Deployment

### Theme Package Structure

```
lavie-theme.zip
├── assets/
│   ├── base.css
│   ├── hero-carousel.css
│   ├── custom-fonts.css
│   ├── sofia-pro.woff2
│   ├── neue-haas-grotesk.woff2
│   ├── hero-carousel.js
│   ├── language-switcher.js
│   ├── slick-slider.min.js
│   └── [product images]
├── config/
│   ├── settings_data.json
│   └── settings_schema.json
├── layout/
│   └── theme.liquid
├── locales/
│   ├── en.default.json
│   └── ar.json
├── sections/
│   ├── header.liquid
│   ├── footer.liquid
│   ├── hero-carousel.liquid
│   ├── lavie-products.liquid
│   ├── featured-collection.liquid
│   ├── certificate-section.liquid
│   ├── about-us-en.liquid
│   ├── about-us-ar.liquid
│   ├── contact-us-en.liquid
│   └── contact-us-ar.liquid
├── snippets/
│   ├── language-switcher.liquid
│   ├── footer-badges.liquid
│   ├── product-card.liquid
│   └── [other snippets]
└── templates/
    ├── index.json
    ├── page.about-us-en.liquid
    ├── page.about-us-ar.liquid
    ├── page.contact-us-en.liquid
    ├── page.contact-us-ar.liquid
    ├── collection.json
    └── product.json
```

### Deployment Steps

1. Package theme files into ZIP archive
2. Upload to Shopify admin (Online Store > Themes > Upload theme)
3. Preview theme in Shopify theme editor
4. Configure theme settings (colors, fonts, sections)
5. Add product data and collections
6. Configure locales and translations
7. Test all functionality in preview mode
8. Publish theme when ready

### Post-Deployment Validation

- Verify all pages load without errors
- Test language switching on all pages
- Verify product filtering shows only La Vie products
- Test carousel functionality
- Verify font loading
- Check mobile responsiveness
- Run Lighthouse audit
- Test checkout flow integration

## Maintenance and Updates

### Content Updates

- Product descriptions and images updated via Shopify admin
- Translation updates via locale files
- Hero carousel images updated via theme customizer

### Code Updates

- Version control with Git
- Staging environment for testing updates
- Automated testing before deployment
- Rollback plan for failed updates

### Monitoring

- Google Analytics for traffic and behavior
- Shopify Analytics for sales and conversions
- Error logging for JavaScript errors
- Performance monitoring (Core Web Vitals)
