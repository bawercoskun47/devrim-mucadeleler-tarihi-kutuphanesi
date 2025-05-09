
Built by https://www.blackbox.ai

---

# Devrim ve Mücadeleler Tarihi Kütüphanesi

## Project Overview
Devrim ve Mücadeleler Tarihi Kütüphanesi is a web application designed to provide access to historical books and documents related to revolutionary movements. Users can browse through a list of books, view book content, create quotes from selected text, and download these quotes as a text file.

## Installation

### Prerequisites
- A web browser (Chrome, Firefox, etc.)
- Python (for running the PDF extraction script)

### Steps
1. **Clone this repository:**
   ```bash
   git clone https://your-repository-url.git
   cd your-repository-name
   ```

2. **Set up your books directory:**
   Place your PDF files in the `books` folder.

3. **Extract text from PDFs (optional):**
   If you have PDF files and need to convert them to .txt files:
   - Ensure you have the required Python packages:
     ```bash
     pip install PyMuPDF
     ```
   - Run the PDF extraction script:
     ```bash
     python extract_pdf_text.py
     ```

4. **Open `index.html`:**
   Simply double-click `index.html` to open it in your web browser.

## Usage
- Load the application in your browser.
- Browse through the books listed; click on a book to view its content.
- Select any text from the displayed book content and add it as a quote.
- Download the quotes you have created by clicking the download button.

## Features
- Dynamic loading of books and their content from a JSON file.
- Selection of text to create quotes with storage in client-side memory.
- A downloadable text file for all created quotes.

## Dependencies
This project uses the following dependencies:
- **Tailwind CSS** for styling (loaded from CDN)
- **Font Awesome** for icons (loaded from CDN)
- **PDF.js** for rendering PDF files (loaded from CDN)
- **PyMuPDF** for extracting text from PDF files (for the Python script)

## Project Structure
```
project-root/
│
├── index.html           # Main HTML file
├── app.js               # JavaScript file for interactive functionalities
├── books.json           # JSON file containing book metadata (titles, descriptions, download links)
├── extract_pdf_text.py  # Python script for extracting text from PDF files
└── books/               # Directory where PDF files are stored
```

## License
This project is open-source and available under the MIT License.

## Acknowledgments
- Appreciation to the developers of Tailwind CSS, Font Awesome, and PDF.js for their valuable libraries.

Feel free to contribute or raise issues if you have any suggestions or face difficulties using the application.