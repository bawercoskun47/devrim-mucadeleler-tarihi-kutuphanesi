// DOM elementlerini seç
const bookContent = document.getElementById('bookContent');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const quotesList = document.getElementById('quotesList');
const downloadQuotesBtn = document.getElementById('downloadQuotesBtn');
const bookList = document.getElementById('bookList');

// Alıntıları saklamak için dizi
let quotes = [];
let currentBook = '';

// Kitap listesini yükle ve göster
async function loadBookList() {
    try {
        const response = await fetch('books.json');
        if (!response.ok) throw new Error('Kitap listesi yüklenemedi');
        const books = await response.json();

        if (books.length === 0) {
            bookList.innerHTML = '<p class="text-gray-500">Kitap bulunamadı</p>';
            return;
        }

        bookList.innerHTML = '';
        books.forEach(book => {
            const div = document.createElement('div');
            div.className = 'book-item p-4 border rounded hover:bg-red-50 cursor-pointer transition-colors';
            div.dataset.book = book.id;
            div.dataset.download = book.downloadLink;
            div.innerHTML = `
                <h3 class="text-xl font-semibold mb-2">${book.title}</h3>
                <p class="text-gray-600 text-sm">${book.description}</p>
                <a href="${book.downloadLink}" target="_blank" class="text-red-600 hover:underline text-sm mt-2 inline-block">
                    Kitabı İndir
                </a>
            `;
            div.addEventListener('click', () => selectBook(book.id));
            bookList.appendChild(div);
        });
    } catch (error) {
        bookList.innerHTML = `<p class="text-red-500">Hata: ${error.message}</p>`;
    }
}

// Kitap seçme işleyicisi
async function selectBook(bookId) {
    currentBook = bookId;
    bookContent.innerHTML = '<p class="text-center"><i class="fas fa-spinner fa-spin"></i> Kitap yükleniyor...</p>';
    addQuoteBtn.disabled = true;

    try {
        const response = await fetch(`/books/${bookId}.txt`);
        if (!response.ok) {
            bookContent.innerHTML = `<p class="text-red-500">Kitap içeriği bulunamadı. Lütfen kitabı indirip "books" klasörüne yükleyin.</p>`;
            return;
        }
        const text = await response.text();
        displayContent(text);
        addQuoteBtn.disabled = false;
    } catch (error) {
        bookContent.innerHTML = `<p class="text-red-500">Hata: ${error.message}</p>`;
    }
}

loadBookList();

// İçeriği görüntüle
function displayContent(text) {
    console.log('Format öncesi metin:', text); // Debug için log
    
    // Başlığı ayır
    const lines = text.split('\n');
    console.log('Satırlar:', lines); // Debug için log
    
    const title = lines[0];
    const content = lines.slice(2).join('\n');
    
    console.log('Başlık:', title); // Debug için log
    console.log('İçerik:', content); // Debug için log

    // İçeriği bölümlere ayır
    const sections = content.split('\n\n').map(section => {
        console.log('Bölüm:', section); // Debug için log
        // Alt başlıkları kontrol et
        if (section.includes('---')) {
            const [sectionTitle] = section.split('\n');
            return `<h2 class="text-xl font-bold mt-6 mb-3">${sectionTitle}</h2>`;
        }
        // Normal paragrafları işle
        return `<p class="mb-4">${section.replace(/\n/g, '<br>')}</p>`;
    }).join('');

    bookContent.innerHTML = `
        <div class="p-4">
            <h1 class="text-2xl font-bold mb-6">${title}</h1>
            ${sections}
        </div>
    `;
}

// Seçili metni al
function getSelectedText() {
    return window.getSelection().toString().trim();
}

// Alıntı ekleme butonu işleyicisi
addQuoteBtn.addEventListener('click', () => {
    const selectedText = getSelectedText();
    if (selectedText) {
        addQuote(selectedText);
    } else {
        alert('Lütfen metinden bir bölüm seçin');
    }
});

// Alıntı ekle
function addQuote(text) {
    const quote = {
        text,
        source: currentBook,
        date: new Date().toLocaleString('tr-TR')
    };
    
    quotes.push(quote);
    updateQuotesList();
    downloadQuotesBtn.disabled = false;
}

// Alıntılar listesini güncelle
function updateQuotesList() {
    if (quotes.length === 0) {
        quotesList.innerHTML = '<p class="text-gray-500 text-center mt-10">Henüz alıntı eklenmedi</p>';
        return;
    }

    quotesList.innerHTML = quotes.map((quote, index) => `
        <div class="quote-item bg-gray-50 p-4 rounded border">
            <div class="quote-text mb-2">${quote.text}</div>
            <div class="quote-meta text-sm text-gray-600">
                <span class="source"><i class="fas fa-book mr-1"></i>${quote.source}</span>
                <span class="date ml-4"><i class="fas fa-calendar-alt mr-1"></i>${quote.date}</span>
                <button onclick="removeQuote(${index})" class="text-red-500 hover:text-red-700 ml-4">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Alıntıyı kaldır
function removeQuote(index) {
    quotes.splice(index, 1);
    updateQuotesList();
    if (quotes.length === 0) {
        downloadQuotesBtn.disabled = true;
    }
}

// Alıntıları indir
downloadQuotesBtn.addEventListener('click', () => {
    const text = quotes.map(quote => 
        `"${quote.text}"\nKaynak: ${quote.source}\nTarih: ${quote.date}\n\n`
    ).join('---\n\n');
    
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'alıntilar.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Sayfa yüklendiğinde alıntı butonlarını devre dışı bırak
addQuoteBtn.disabled = true;
downloadQuotesBtn.disabled = true;
