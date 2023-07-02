export function isImageURL(url) {
  // Regular expression pattern for image URL validation
  const imageURLPattern = /\.(jpeg|jpg|gif|png|svg)$/i;
  
  // Test the URL against the image URL pattern
  return imageURLPattern.test(url) || url.startsWith('blob:');
}