# Sanity Schemas Reference

These schema files are for reference when setting up your Sanity Studio.

## Setup Instructions:

1. Create a new Sanity Studio project:
   ```bash
   npm create sanity@latest
   ```

2. Copy these schema files to your Studio's `schemas/` folder

3. Import them in your `sanity.config.ts`:
   ```ts
   import heroSlide from './schemas/heroSlide'
   import coreValue from './schemas/coreValue'
   import mission from './schemas/mission'
   import impactStat from './schemas/impactStat'
   import contactInfo from './schemas/contactInfo'
   import contactCategory from './schemas/contactCategory'
   import socialMedia from './schemas/socialMedia'
   import outreach from './schemas/outreach'

   export default defineConfig({
     // ... other config
     schema: {
       types: [heroSlide, coreValue, mission, impactStat, contactInfo, contactCategory, socialMedia, outreach],
     },
   })
   ```

4. Get your Project ID from Sanity dashboard

5. Add to `.env`:
   ```
   VITE_SANITY_PROJECT_ID=your_project_id
   VITE_SANITY_DATASET=production
   ```

## Schema Types:

- **heroSlide** - Homepage hero carousel slides
- **coreValue** - Core values section
- **mission** - Mission items
- **impactStat** - Impact statistics
- **contactInfo** - Contact information (email, phone, location)
- **contactCategory** - Contact form category options
- **socialMedia** - Social media links (Instagram, Facebook, etc.)
- **outreach** - Outreach/projects page items (supports multiple images)
