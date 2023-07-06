import html2pdf from 'html2pdf.js';

/**
 * Export an HTML content to PDF file with the given file name.
 * @param {*} element HTML element to be converted to PDF.
 * @param {string} fileName name of file after exporting.
 * @param {int} margin margin of file when convert to pdf.
 * @returns {Promise} promise that represent the exporting task.
 */
function exportHtmlAsPdf(element, fileName, margin = 5) {
  let options = {
    margin: margin,
    filename: fileName,
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 4, useCORS: true },
    pagebreak: { after: '.page-break-point', avoid: ['.row', '.q-card'] },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'p' }
  };
  return html2pdf(element, options);
}

export { exportHtmlAsPdf };