import fitz  # PyMuPDF
import os

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def save_text(text, output_path):
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(text)

if __name__ == "__main__":
    pdf_folder = "books"
    output_folder = "books_text"
    os.makedirs(output_folder, exist_ok=True)

    for filename in os.listdir(pdf_folder):
        if filename.lower().endswith(".pdf"):
            pdf_path = os.path.join(pdf_folder, filename)
            text = extract_text_from_pdf(pdf_path)
            output_path = os.path.join(output_folder, filename[:-4] + ".txt")
            save_text(text, output_path)
            print(f"Extracted text from {filename} to {output_path}")
