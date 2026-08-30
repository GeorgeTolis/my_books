// Sample Books Data Structure
const books = [
    {
        id: 'book-1',
        title: 'Echoes of Late September',
        greekTitle: 'Ηχώ του Ύστερου Σεπτέμβρη',
        year: 2024,
        season: 'Early Autumn 2024',
        genre: 'Emotional Drama / Fiction',
        pages: 180,
        language: 'Greek (Original)',
        hasEnglish: false,
        synopsis: 'A story reflecting on hidden feelings and quiet moments kept away from the world. Written during late summer to express inner emotions indirectly through character journeys.',
        coverColor: 'from-amber-800 to-amber-950',
        accentColor: 'text-amber-700',
        status: 'Completed',
        pdfLink: '#'
    },
    {
        id: 'book-2',
        title: 'Whispers Beneath the Sun',
        greekTitle: 'Ψίθυροι Κάτω από τον Ήλιο',
        year: 2025,
        season: 'Summer 2025',
        genre: 'Philosophical Realism',
        pages: 210,
        language: 'Greek (Original)',
        hasEnglish: false,
        synopsis: 'Explores personal reflections and hidden feelings under the bright Greek summer skies. A journey of quiet self-realization.',
        coverColor: 'from-terracotta-600 to-terracotta-700',
        accentColor: 'text-terracotta-600',
        status: 'Completed',
        pdfLink: '#'
    },
    {
        id: 'book-3',
        title: 'Project 2026 (Upcoming Story)',
        greekTitle: 'Έργο 2026 (Υπό Εξέλιξη)',
        year: 2026,
        season: 'Late Summer 2026 Target',
        genre: 'Personal Narrative',
        pages: 'In Progress',
        language: 'Greek (Original)',
        hasEnglish: false,
        synopsis: 'Currently in progress. This story will represent the feelings and experiences of this year, planned for completion in early autumn 2026.',
        coverColor: 'from-sage-700 to-slate-900',
        accentColor: 'text-sage-700',
        status: 'In Progress',
        pdfLink: null
    }
];

// Render Books Grid
function renderBooks(booksToRender) {
    const grid = document.getElementById('books-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (booksToRender.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12 text-mutedInk">
                <i data-lucide="book-x" class="w-12 h-12 mx-auto text-parchment mb-3"></i>
                <p class="text-lg font-serif">No books found matching your criteria.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    booksToRender.forEach(book => {
        const card = document.createElement('div');
        card.className = 'group bg-white rounded-2xl border border-parchment p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1';
        card.addEventListener('click', () => openModal(book.id));

        card.innerHTML = `
            <div>
                <!-- Book Visual Mockup -->
                <div class="w-full h-56 bg-gradient-to-br ${book.coverColor} rounded-xl book-shadow relative overflow-hidden flex flex-col justify-between p-5 text-white mb-5 group-hover:scale-[1.02] transition-transform duration-300">
                    <div class="book-spine absolute left-0 top-0 bottom-0 w-4"></div>
                    
                    <div class="flex justify-between items-start pl-2">
                        <span class="text-xs bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full uppercase tracking-widest font-semibold">${book.year}</span>
                        <span class="text-xs font-serif italic opacity-80">${book.status}</span>
                    </div>

                    <div class="pl-2">
                        <span class="text-[10px] uppercase tracking-widest opacity-75 block">${book.genre}</span>
                        <h3 class="font-serif font-bold text-xl leading-snug mt-1">${book.title}</h3>
                        <p class="text-xs font-serif opacity-90 italic mt-0.5">${book.greekTitle}</p>
                    </div>
                </div>

                <!-- Info -->
                <div class="space-y-2">
                    <div class="flex items-center justify-between text-xs text-mutedInk">
                        <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${book.season}</span>
                        <span class="flex items-center gap-1"><i data-lucide="book-open" class="w-3.5 h-3.5"></i> ${book.pages} pages</span>
                    </div>
                    <p class="text-xs text-mutedInk line-clamp-2 leading-relaxed">
                        ${book.synopsis}
                    </p>
                </div>
            </div>

            <div class="mt-5 pt-4 border-t border-parchment flex items-center justify-between">
                <span class="text-xs font-medium px-2.5 py-1 rounded-md ${book.hasEnglish ? 'bg-sage-100 text-sage-700' : 'bg-warmPaper text-mutedInk'}">
                    ${book.hasEnglish ? '🇬🇷 GR / 🇬🇧 EN' : '🇬🇷 GR Original'}
                </span>
                <span class="text-xs font-bold ${book.accentColor} group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Details <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                </span>
            </div>
        `;

        grid.appendChild(card);
    });

    lucide.createIcons();
}

// Filter Functionality
function filterBooks(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-terracotta-600', 'text-white', 'shadow-sm');
        btn.classList.add('text-warmInk');
    });

    const activeBtn = document.getElementById(`btn-${category}`);
    if (activeBtn) {
        activeBtn.classList.add('bg-terracotta-600', 'text-white', 'shadow-sm');
        activeBtn.classList.remove('text-warmInk');
    }

    if (category === 'all') {
        renderBooks(books);
    } else if (category === 'greek') {
        renderBooks(books.filter(b => b.language.includes('Greek')));
    } else if (category === 'english') {
        renderBooks(books.filter(b => b.hasEnglish));
    }
}

// Search Functionality
function searchBooks() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = books.filter(b => 
        b.title.toLowerCase().includes(query) || 
        b.greekTitle.toLowerCase().includes(query) || 
        b.synopsis.toLowerCase().includes(query) ||
        b.genre.toLowerCase().includes(query)
    );
    renderBooks(filtered);
}

// Timeline Rendering
function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;
    container.innerHTML = '';

    books.forEach(book => {
        const item = document.createElement('div');
        item.className = 'relative pl-6 sm:pl-8 group';

        item.innerHTML = `
            <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-cream border-2 border-goldAccent group-hover:scale-125 group-hover:bg-terracotta-500 transition-all"></div>
            
            <div class="bg-white p-5 rounded-xl border border-parchment shadow-sm">
                <div class="flex items-center justify-between flex-wrap gap-2 mb-1">
                    <span class="font-bold text-terracotta-600 text-sm">${book.season}</span>
                    <span class="text-xs font-semibold px-2 py-0.5 rounded ${book.status === 'Completed' ? 'bg-sage-100 text-sage-700' : 'bg-goldAccent/20 text-warmInk'}">${book.status}</span>
                </div>
                <h4 class="font-serif font-bold text-lg text-warmInk">${book.title}</h4>
                <p class="text-xs text-mutedInk italic mb-2">${book.greekTitle}</p>
                <p class="text-xs text-warmInk/80 leading-relaxed">${book.synopsis}</p>
            </div>
        `;

        container.appendChild(item);
    });
}

// Modal Handlers
function openModal(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <div class="flex flex-col md:flex-row gap-6 items-start">
            <div class="w-full md:w-48 h-64 bg-gradient-to-br ${book.coverColor} rounded-xl book-shadow flex-shrink-0 p-5 text-white flex flex-col justify-between relative overflow-hidden">
                <div class="book-spine absolute left-0 top-0 bottom-0 w-3"></div>
                <span class="text-xs bg-white/20 px-2 py-0.5 rounded uppercase font-semibold w-max">${book.year}</span>
                <div>
                    <span class="text-[10px] uppercase block opacity-75">${book.genre}</span>
                    <h3 class="font-serif font-bold text-lg leading-tight mt-1">${book.title}</h3>
                </div>
            </div>

            <div class="space-y-4 flex-grow">
                <div>
                    <span class="text-xs font-semibold text-terracotta-600 uppercase tracking-widest">${book.season}</span>
                    <h2 class="font-serif text-2xl font-bold text-warmInk">${book.title}</h2>
                    <p class="text-sm font-serif italic text-mutedInk">${book.greekTitle}</p>
                </div>

                <div class="grid grid-cols-2 gap-3 bg-warmPaper p-3 rounded-xl text-xs text-warmInk">
                    <div><strong>Genre:</strong> ${book.genre}</div>
                    <div><strong>Pages:</strong> ${book.pages}</div>
                    <div><strong>Language:</strong> ${book.language}</div>
                    <div><strong>English Status:</strong> ${book.hasEnglish ? 'Available' : 'Planned'}</div>
                </div>

                <div>
                    <h4 class="text-xs font-bold uppercase text-mutedInk mb-1">About this story</h4>
                    <p class="text-sm text-warmInk leading-relaxed">${book.synopsis}</p>
                </div>

                ${!book.hasEnglish ? `
                    <div class="p-3 bg-terracotta-50 text-terracotta-700 text-xs rounded-xl flex items-center gap-2 border border-terracotta-100">
                        <i data-lucide="info" class="w-4 h-4 flex-shrink-0"></i>
                        <span>English translation for this title is planned once time permits around studies and work.</span>
                    </div>
                ` : ''}

                <div class="pt-4 flex gap-3">
                    ${book.pdfLink ? `
                        <a href="${book.pdfLink}" class="flex-1 bg-terracotta-600 text-white text-center py-2.5 rounded-xl text-sm font-semibold hover:bg-terracotta-700 transition-all shadow-sm">
                            Read Story (PDF)
                        </a>
                    ` : `
                        <button disabled class="flex-1 bg-parchment text-mutedInk text-center py-2.5 rounded-xl text-sm font-semibold cursor-not-allowed">
                            Work in Progress
                        </button>
                    `}
                </div>
            </div>
        </div>
    `;

    document.getElementById('book-modal').classList.remove('hidden');
    lucide.createIcons();
}

function closeModal() {
    document.getElementById('book-modal').classList.add('hidden');
}

// App Initialization
window.addEventListener('DOMContentLoaded', () => {
    // Dynamic Footer Year
    const yearElem = document.getElementById('current-year');
    if (yearElem) yearElem.textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Attach filter button listeners
    const btnAll = document.getElementById('btn-all');
    const btnGreek = document.getElementById('btn-greek');
    const btnEnglish = document.getElementById('btn-english');
    if (btnAll) btnAll.addEventListener('click', () => filterBooks('all'));
    if (btnGreek) btnGreek.addEventListener('click', () => filterBooks('greek'));
    if (btnEnglish) btnEnglish.addEventListener('click', () => filterBooks('english'));

    // Attach search listener
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.addEventListener('keyup', searchBooks);

    // Modal listeners
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const bookModal = document.getElementById('book-modal');
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (bookModal) {
        bookModal.addEventListener('click', (e) => {
            if (e.target.id === 'book-modal') closeModal();
        });
    }

    // Initial renders
    renderBooks(books);
    renderTimeline();
    lucide.createIcons();
});