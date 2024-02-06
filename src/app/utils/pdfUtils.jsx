

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function generatePdf(data) {
  
  const pdfDoc = await PDFDocument.create();

  
  const page = pdfDoc.addPage([1127, 794]);

  
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.setFont(helveticaFont);
  page.setFontSize(12);

  
  data.forEach((item, index) => {
    const y = page.getHeight() - (index + 1) * 20;
    page.drawText(`
    
    ${item.id}. Check In: ${item.check_in}, Check Out: ${item.check_out}`, {
      x: 50,
      y,
      color: rgb(0, 0, 0),
    });
    
  });

  
  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}
