import React, { useEffect } from 'react';

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface FAQItemSchema {
  question: string;
  answer: string;
}

export interface BlogArticleSchema {
  headline: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  publisherName?: string;
}

export interface ServiceSchemaInfo {
  name: string;
  serviceType: string;
  description: string;
  provider: string;
  areaServed?: string;
}

export interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  breadcrumbs?: BreadcrumbItem[];
  faqList?: FAQItemSchema[];
  blogArticle?: BlogArticleSchema;
  serviceInfo?: ServiceSchemaInfo;
  isContactPage?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = [
    'Cloudloop Group',
    'Dubai Business Setup',
    'UAE Documents Clearing',
    'Cloudloop IT',
    'Golden Visa Dubai',
    'Web Development Dubai',
    'Managed IT Support UAE',
    'PRO Services Dubai',
    'Cybersecurity UAE'
  ],
  canonicalUrl = 'https://cloudloopgroup.com',
  ogType = 'website',
  ogImage = 'https://cloudloopgroup.com/cloudloop.webp',
  breadcrumbs,
  faqList,
  blogArticle,
  serviceInfo,
  isContactPage
}) => {
  useEffect(() => {
    // 1. Update Document Title
    const fullTitle = title.includes('Cloudloop') ? title : `${title} | Cloudloop Group UAE`;
    document.title = fullTitle;

    // Helper function to set or create meta tags
    const setMeta = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper for link canonical
    const setLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Standard Meta Tags
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords.join(', '));
    setMeta('name', 'robots', 'index, follow');
    setLink('canonical', canonicalUrl);

    // 3. Open Graph Metadata
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:site_name', 'Cloudloop Group UAE');
    setMeta('property', 'og:locale', 'en_US');

    // 4. Twitter Cards
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // 5. Build Dynamic JSON-LD Graph Array
    const jsonLdGraph: any[] = [
      // WebSite with SearchAction Schema
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://cloudloopgroup.com/#website',
        url: 'https://cloudloopgroup.com',
        name: 'Cloudloop Group UAE',
        description: 'Premier UAE corporate umbrella group for Documents Clearing and Information Technology.',
        publisher: { '@id': 'https://cloudloopgroup.com/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://cloudloopgroup.com/faqs?search={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      // Organization / LocalBusiness / ProfessionalService Schema
      {
        '@context': 'https://schema.org',
        '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
        '@id': 'https://cloudloopgroup.com/#organization',
        name: 'Cloudloop Group LLC',
        legalName: 'Cloudloop Group LLC Dubai',
        url: 'https://cloudloopgroup.com',
        logo: 'https://cloudloopgroup.com/logo.png',
        image: 'https://cloudloopgroup.com/cloudloop.webp',
        description: 'Dubai premier corporate group operating Cloudloop Documents Clearing & Cloudloop Information Technology.',
        telephone: '+971-55-612-6050',
        email: 'info@cloudloopgroup.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Office No: 1001-04, Rigga Business Centre, Ibis Hotel',
          addressLocality: 'Dubai',
          addressRegion: 'Dubai',
          postalCode: '00000',
          addressCountry: 'AE'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 25.2631,
          longitude: 55.3262
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '08:00',
            closes: '18:00'
          }
        ],
        sameAs: [
          'https://linkedin.com/company/cloudloop-group',
          'https://twitter.com/cloudloopuae',
          'https://facebook.com/cloudloopgroup'
        ],
        priceRange: '$$$',
        department: [
          {
            '@type': 'LocalBusiness',
            name: 'Cloudloop Documents Clearing Division',
            telephone: '+971-55-612-6050',
            description: 'Mainland & Free Zone Business Setup, Golden Visas, Trade Licensing & Corporate PRO Services in Dubai.'
          },
          {
            '@type': 'LocalBusiness',
            name: 'Cloudloop Information Technology Division',
            telephone: '+971-55-612-6050',
            description: 'Custom Enterprise Web & Mobile Software Engineering, Cloud Architecture, Cyber Security VAPT Audits.'
          }
        ]
      },
      // WebPage Schema
      {
        '@context': 'https://schema.org',
        '@type': isContactPage ? 'ContactPage' : 'WebPage',
        '@id': `${canonicalUrl}/#webpage`,
        url: canonicalUrl,
        name: fullTitle,
        description: description,
        isPartOf: { '@id': 'https://cloudloopgroup.com/#website' }
      }
    ];

    // Optional: BreadcrumbList Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      jsonLdGraph.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: b.name,
          item: b.item
        }))
      });
    }

    // Optional: FAQPage Schema
    if (faqList && faqList.length > 0) {
      jsonLdGraph.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqList.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
      });
    }

    // Optional: BlogPosting / Article Schema
    if (blogArticle) {
      jsonLdGraph.push({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blogArticle.headline,
        image: [blogArticle.image],
        datePublished: blogArticle.datePublished,
        dateModified: blogArticle.dateModified || blogArticle.datePublished,
        author: {
          '@type': 'Person',
          name: blogArticle.authorName
        },
        publisher: {
          '@type': 'Organization',
          name: blogArticle.publisherName || 'Cloudloop Group LLC',
          logo: {
            '@type': 'ImageObject',
            url: 'https://cloudloopgroup.com/logo.png'
          }
        },
        description: description
      });
    }

    // Optional: Service Schema
    if (serviceInfo) {
      jsonLdGraph.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: serviceInfo.name,
        serviceType: serviceInfo.serviceType,
        description: serviceInfo.description,
        provider: {
          '@type': 'Organization',
          name: serviceInfo.provider
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: serviceInfo.areaServed || 'United Arab Emirates'
        }
      });
    }

    // Inject Script Tag into document head
    let scriptTag = document.getElementById('schema-json-ld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'schema-json-ld';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLdGraph);

  }, [title, description, keywords, canonicalUrl, ogType, ogImage, breadcrumbs, faqList, blogArticle, serviceInfo, isContactPage]);

  return null;
};
