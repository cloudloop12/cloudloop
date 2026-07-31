import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = ['Cloudloop Group', 'Dubai Business Setup', 'UAE Documents Clearing', 'Cloudloop IT', 'Golden Visa Dubai', 'Web Development Dubai', 'Managed IT Support UAE'],
  canonicalUrl,
}) => {
  useEffect(() => {
    // Update Document Title
    const fullTitle = `${title} | Cloudloop Group UAE`;
    document.title = fullTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords.join(', '));

    // Open Graph Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', fullTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // Schema.org Structured Data (JSON-LD)
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Corporation',
      name: 'Cloudloop Group LLC',
      url: 'https://cloudloopgroup.com',
      logo: 'https://cloudloopgroup.com/logo.png',
      description: 'Premier UAE corporate umbrella group operating Cloudloop Documents Clearing and Cloudloop Information Technology.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Level 18, Business Bay Tower, Sheikh Zayed Road',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+971-55-612-6050',
        contactType: 'customer service',
        areaServed: 'AE',
        availableLanguage: ['English', 'Arabic'],
      },
      department: [
        {
          '@type': 'LocalBusiness',
          name: 'Cloudloop Documents Clearing',
          description: 'Mainland and Free Zone Business Setup, Golden Visas, and PRO Services in Dubai.',
        },
        {
          '@type': 'LocalBusiness',
          name: 'Cloudloop Information Technology',
          description: 'Software Engineering, Cyber Security, AWS Cloud, and Managed IT Infrastructure.',
        },
      ],
    };

    let scriptTag = document.getElementById('schema-json-ld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'schema-json-ld';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);

  }, [title, description, keywords, canonicalUrl]);

  return null;
};
