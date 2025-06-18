import { useEffect } from 'react';

const SEO = ({ 
  title, 
  description, 
  keywords = [], 
  ogImage = '/og-image.jpg',
  ogType = 'website',
  ogUrl,
  noIndex = false
}) => {
  useEffect(() => {
    // Update document title
    document.title = title ? `${title} | BubblePi` : 'BubblePi - Premium Accounts Marketplace';
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description || 'BubblePi - Your trusted marketplace for premium accounts including Netflix, Canva, and AI tools.';
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    const keywordsContent = keywords.length > 0 
      ? keywords.join(', ') 
      : 'premium accounts, Netflix, Canva, AI tools, account marketplace';
    metaKeywords.content = keywordsContent;
    
    // Update robots meta tag
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = noIndex ? 'noindex, nofollow' : 'index, follow';
    
    // Update Open Graph meta tags
    const updateOgTag = (property, content) => {
      let tag = document.querySelector(`meta[property="og:${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', `og:${property}`);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };
    
    updateOgTag('title', title || 'BubblePi - Premium Accounts Marketplace');
    updateOgTag('description', description || 'Your trusted marketplace for premium accounts including Netflix, Canva, and AI tools.');
    updateOgTag('image', ogImage);
    updateOgTag('type', ogType);
    updateOgTag('url', ogUrl || window.location.href);
    
    // Clean up function
    return () => {
      // We don't remove meta tags on cleanup as they should persist
      // until the next SEO component renders
    };
  }, [title, description, keywords, ogImage, ogType, ogUrl, noIndex]);
  
  // This component doesn't render anything visible
  return null;
};

export default SEO; 