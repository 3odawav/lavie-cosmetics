# Implementation Plan

## Completed Work

The following components are already implemented:
- ✅ Basic hero carousel with CSS animations (sections/hero-carousel.liquid, assets/hero-carousel.css)
- ✅ La Vie products section with static product blocks (sections/lavie-products.liquid)
- ✅ Custom fonts CSS file (assets/custom-fonts.css)
- ✅ About Us pages in English and Arabic (sections/about-us-en.liquid, sections/about-us-ar.liquid)
- ✅ Language switcher snippet exists (snippets/header-language.liquid)
- ✅ Hero images uploaded (hero1.jpg, hero2.png, hero3.png, hero4.png)
- ✅ Product images uploaded (lavie_product_1-6.png)
- ✅ Slick Slider library available (assets/slick-slider.min.js)

## Remaining Tasks

### Phase 1: Bilingual Localization System

- [ ] 1. Create Arabic locale file and enhance translations
  - Create locales/ar.json with complete Arabic translations
  - Add translation keys for hero carousel text overlays
  - Add translation keys for Best Sellers section
  - Add translation keys for certificate section
  - Add translation keys for footer badges
  - Add translation keys for product sections
  - _Requirements: 1.1, 1.2, 1.3_

- [ ]* 1.1 Write property test for language switcher presence
  - **Property 1: Language switcher presence**
  - **Validates: Requirements 1.1**

- [ ] 2. Enhance language switcher with full functionality
  - Update snippets/header-language.liquid to support English/Arabic toggle
  - Create assets/language-switcher.js for switching logic
  - Implement localStorage persistence for language preference
  - Add page direction switching (dir="ltr" / dir="rtl") on html element
  - Ensure language context is maintained during page switches
  - Integrate language switcher into sections/header.liquid
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ]* 2.1 Write property test for language switching
  - **Property 2: Language selection updates content and direction**
  - **Validates: Requirements 1.2, 1.3**

- [ ]* 2.2 Write property test for page context preservation
  - **Property 3: Language switching preserves page context**
  - **Validates: Requirements 1.4**

- [ ]* 2.3 Write property test for language preference persistence
  - **Property 4: Language preference persistence**
  - **Validates: Requirements 1.5**

### Phase 2: Typography Enhancement

- [ ] 3. Complete custom font implementation
  - Add SOFIA PRO font files (woff2 format) to assets/
  - Add NEUE HAAS GROTESK font files (woff2 format) to assets/
  - Update assets/custom-fonts.css with @font-face declarations
  - Add font-display: swap for non-blocking rendering
  - Define comprehensive fallback font stacks
  - Add font preload links to layout/theme.liquid
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ]* 3.1 Write property test for heading font application
  - **Property 5: Heading font application**
  - **Validates: Requirements 2.1**

- [ ]* 3.2 Write property test for body text font application
  - **Property 6: Body text font application**
  - **Validates: Requirements 2.2**

- [ ]* 3.3 Write property test for font fallback behavior
  - **Property 7: Font fallback on load failure**
  - **Validates: Requirements 2.3**

### Phase 3: Hero Carousel Enhancement

- [ ] 4. Upgrade hero carousel with Slick Slider and interactive features
  - Update sections/hero-carousel.liquid to use Slick Slider library
  - Add section schema for customizable slide images, text overlays, and CTA buttons
  - Implement 5-second auto-advance interval
  - Add manual navigation controls (arrows and dots)
  - Add bilingual text overlay support using locale translations
  - Update assets/hero-carousel.css with hover effects and transitions
  - Implement active slide zoom/parallax effects
  - Ensure layout stability (prevent CLS)
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 12.1, 12.2, 12.3, 12.4_

- [ ]* 4.1 Write property test for carousel slide transitions
  - **Property 8: Carousel slide transitions**
  - **Validates: Requirements 3.3, 12.1**

- [ ]* 4.2 Write property test for carousel navigation
  - **Property 9: Carousel navigation functionality**
  - **Validates: Requirements 3.5**

- [ ]* 4.3 Write property test for carousel overlay content
  - **Property 10: Carousel slide overlay content**
  - **Validates: Requirements 3.6**

- [ ]* 4.4 Write property test for carousel hover feedback
  - **Property 19: Carousel hover feedback**
  - **Validates: Requirements 12.3**

- [ ]* 4.5 Write property test for carousel active slide effects
  - **Property 20: Carousel active slide effects**
  - **Validates: Requirements 12.2**

- [ ]* 4.6 Write property test for carousel layout stability
  - **Property 21: Carousel layout stability**
  - **Validates: Requirements 12.4**

### Phase 4: Product Display Enhancement

- [ ] 5. Convert products section to dynamic Shopify product filtering
  - Update sections/lavie-products.liquid to fetch products from Shopify API
  - Implement vendor filtering to show only "Lavie Cosmetics EG" products
  - Add bilingual product data support using metafields (title_ar, description_ar)
  - Implement product click navigation to detail pages
  - Create responsive product card layout
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ]* 5.1 Write property test for product vendor filtering
  - **Property 11: Product vendor filtering**
  - **Validates: Requirements 4.1, 4.3**

- [ ]* 5.2 Write property test for product display completeness
  - **Property 12: Product display completeness**
  - **Validates: Requirements 4.4, 10.4**

- [ ]* 5.3 Write property test for product link navigation
  - **Property 13: Product link navigation**
  - **Validates: Requirements 4.5, 5.4**

- [ ] 6. Create Best Sellers section
  - Create sections/best-sellers.liquid or customize sections/featured-collection.liquid
  - Hard-code 5 specific product handles for best sellers
  - Implement bilingual section heading using locale translations
  - Display product cards with image, name, and price
  - Ensure responsive grid layout
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ]* 6.1 Write property test for Best Sellers product display
  - **Property 14: Best Sellers product display**
  - **Validates: Requirements 5.3**

### Phase 5: Certificate and Footer Components

- [ ] 7. Create certificate section
  - Create sections/certificate-section.liquid
  - Add bilingual certification text (English/Arabic)
  - Include certification badge images from Tecso Cosméticos Brazil
  - Configure section schema for customization
  - _Requirements: 6.1, 6.2, 6.3_

- [ ] 8. Implement footer badges component
  - Create snippets/footer-badges.liquid
  - Add 6 quality badge icons: Cruelty-Free, Paraben-Free, Sulfate-Free, Dermatologically Tested, Made in Brazil, Official Egypt Distributor
  - Implement bilingual badge text using locale translations
  - Integrate snippet into sections/footer.liquid
  - Create responsive layout for badges
  - _Requirements: 7.1, 7.2, 7.3_

- [ ]* 8.1 Write property test for footer badges presence
  - **Property 15: Footer badges presence**
  - **Validates: Requirements 7.1**

- [ ]* 8.2 Write property test for footer badge visual indicators
  - **Property 16: Footer badge visual indicators**
  - **Validates: Requirements 7.2**

- [ ]* 8.3 Write property test for footer badge translation
  - **Property 17: Footer badge translation**
  - **Validates: Requirements 7.3**

### Phase 6: Contact Pages

- [ ] 9. Create Contact Us pages
  - Create sections/contact-us-en.liquid with English content
  - Create sections/contact-us-ar.liquid with Arabic content (RTL layout)
  - Add office location: Maadi Corniche, Cairo, Egypt
  - Add email: info@laviecosmetics-eg.com
  - Add working hours: Sunday – Thursday 9 AM – 5 PM
  - Implement clickable phone number links with tel: protocol
  - Create templates/page.contact-us-en.liquid
  - Create templates/page.contact-us-ar.liquid
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ]* 9.1 Write property test for contact page phone link formatting
  - **Property 18: Contact page phone link formatting**
  - **Validates: Requirements 9.5**

### Phase 7: RTL Support and Layout

- [ ] 10. Implement comprehensive RTL/LTR styling
  - Create assets/rtl-support.css with [dir="rtl"] selectors
  - Use CSS logical properties (margin-inline, padding-inline) throughout theme
  - Mirror directional icons and arrows for RTL
  - Update all sections to support RTL layout
  - Test hero carousel in RTL mode
  - Test product grids in RTL mode
  - Ensure proper text alignment and flow for Arabic
  - _Requirements: 1.2, 1.3_

- [ ] 11. Configure homepage layout
  - Update templates/index.json to include all required sections
  - Ensure hero carousel section is at top
  - Add lavie-products section
  - Add Best Sellers section
  - Add certificate section
  - Configure section order and spacing
  - _Requirements: 3.1, 5.1, 6.1_

### Phase 8: Testing and Validation

- [ ] 12. Checkpoint - Ensure all tests pass
  - Run all property tests
  - Ensure all tests pass, ask the user if questions arise

- [ ] 13. Final theme validation
  - Test language switching on all pages
  - Verify product filtering shows only La Vie products
  - Test carousel functionality and animations
  - Verify font loading and fallbacks
  - Test mobile responsiveness
  - Verify RTL layout for Arabic
  - Validate theme structure with Shopify Theme Check
  - Run accessibility audit
  - Run Lighthouse performance audit
  - _Requirements: All_

## Notes on Implementation

**Product Collections (Requirement 10):** This task requires Shopify admin access and cannot be completed through code alone. Collections must be created manually in Shopify admin or via API.

**Product Data Upload (Requirement 4.2):** Products from products_export_1.csv must be imported through Shopify admin. Product images are already uploaded to assets.

**Font Files:** SOFIA PRO and NEUE HAAS GROTESK font files need to be obtained and added to the assets directory. The CSS structure is already in place.

**Testing:** Property-based tests are marked as optional (*) to allow for faster MVP development. They can be implemented later for comprehensive validation.
