let images = [];
let currentFilter = 'All';
let editingId = null;
let draggedId = null;

const ACTION_BTN =
    'action-btn inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl neomorphic-btn text-gray-800 dark:text-gray-200 text-sm font-medium cursor-pointer shrink-0';

const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
const imagePreview = document.getElementById('imagePreview');
const imageTitle = document.getElementById('imageTitle');
const imageCategory = document.getElementById('imageCategory');
const submitBtn = document.getElementById('submitBtn');
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');
const darkModeToggle = document.getElementById('darkModeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const filterBtns = document.querySelectorAll('.filter-btn');
const editModal = document.getElementById('editModal');
const editTitle = document.getElementById('editTitle');
const editCategory = document.getElementById('editCategory');
const saveEdit = document.getElementById('saveEdit');
const cancelEdit = document.getElementById('cancelEdit');
const uploadCTA = document.getElementById('uploadCTA');
const uploadSection = document.getElementById('uploadSection');
const deleteModal = document.getElementById('deleteModal');
const deleteModalContent = document.getElementById('deleteModalContent');
const cancelDelete = document.getElementById('cancelDelete');
const confirmDelete = document.getElementById('confirmDelete');

let deletingId = null;

let previewData = null;

function init() {
    loadFromStorage();
    loadDarkMode();
    renderGallery();
    setupEventListeners();
}

function setupEventListeners() {
    dropArea.addEventListener('click', () => fileInput.click());
    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('border-white', 'bg-white/10');
    });
    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('border-white', 'bg-white/10');
    });
    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.classList.remove('border-white', 'bg-white/10');
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    });
    submitBtn.addEventListener('click', handleSubmit);
    closeModal.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });
    darkModeToggle.addEventListener('click', toggleDarkMode);
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active', 'bg-white/20'));
            btn.classList.add('active', 'bg-white/20');
            currentFilter = btn.dataset.filter;
            renderGallery();
        });
    });
    uploadCTA.addEventListener('click', () => {
        uploadSection.scrollIntoView({ behavior: 'smooth' });
    });
    saveEdit.addEventListener('click', saveEditedImage);
    cancelEdit.addEventListener('click', () => editModal.classList.add('hidden'));
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) editModal.classList.add('hidden');
    });
    cancelDelete.addEventListener('click', closeDeleteModal);
    confirmDelete.addEventListener('click', performDelete);
    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) closeDeleteModal();
    });
    gallery.addEventListener('click', handleGalleryClick);
}

function openDeleteModal(id) {
    deletingId = id;
    deleteModal.classList.remove('hidden');
    deleteModal.classList.add('flex');
    setTimeout(() => {
        deleteModal.classList.remove('opacity-0');
        deleteModalContent.classList.remove('scale-95');
        deleteModalContent.classList.add('scale-100');
    }, 10);
}

function closeDeleteModal() {
    deleteModal.classList.add('opacity-0');
    deleteModalContent.classList.remove('scale-100');
    deleteModalContent.classList.add('scale-95');
    setTimeout(() => {
        deleteModal.classList.add('hidden');
        deleteModal.classList.remove('flex');
        deletingId = null;
    }, 300);
}

function performDelete() {
    if (deletingId !== null) {
        images = images.filter(i => i.id !== deletingId);
        saveToStorage();
        renderGallery();
        closeDeleteModal();
    }
}

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
    }
    if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB.');
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        previewData = e.target.result;
        imagePreview.src = previewData;
        previewContainer.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
}

function handleSubmit() {
    if (!previewData) {
        alert('Please select an image.');
        return;
    }
    if (!imageTitle.value.trim()) {
        alert('Please enter a title.');
        return;
    }
    const newImage = {
        id: Date.now(),
        src: previewData,
        title: imageTitle.value.trim(),
        category: imageCategory.value,
        favorite: false,
        createdAt: new Date().toISOString()
    };
    images.unshift(newImage);
    saveToStorage();
    renderGallery();
    resetForm();
}

function resetForm() {
    previewData = null;
    previewContainer.classList.add('hidden');
    imageTitle.value = '';
    fileInput.value = '';
}

function saveToStorage() {
    localStorage.setItem('galleryImages', JSON.stringify(images));
}

function loadFromStorage() {
    const stored = localStorage.getItem('galleryImages');
    if (stored) {
        images = JSON.parse(stored);
    }
}

function escapeHtml(text) {
    const el = document.createElement('span');
    el.textContent = text;
    return el.innerHTML;
}

function renderGallery() {
    let filteredImages = images;
    if (currentFilter !== 'All') {
        filteredImages = images.filter(img => img.category === currentFilter);
    }
    if (filteredImages.length === 0) {
        gallery.innerHTML = `
            <div class="col-span-full text-center py-16">
                <p class="text-black dark:text-white text-xl text-center">No images yet. Upload your first image!</p>
            </div>
        `;
        return;
    }
    gallery.innerHTML = filteredImages.map((img, index) => `
        <article
            class="gallery-card neomorphic-bg neomorphic-shadow rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] cursor-grab"
            data-id="${img.id}"
            data-index="${index}"
            draggable="true"
        >
            <div class="mb-3">
                <h3 class="text-gray-800 dark:text-gray-200 font-bold text-lg sm:text-xl leading-tight">${escapeHtml(img.title)}</h3>
                <p class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1 tracking-wide">${escapeHtml(img.category)}</p>
            </div>
            
            <img
                src="${img.src}"
                alt="${escapeHtml(img.title)}"
                class="gallery-image w-full h-48 object-cover rounded-xl cursor-pointer mb-4"
            >

            <div class="flex flex-wrap items-center justify-center gap-3">
                <button type="button" data-action="delete" class="${ACTION_BTN}" title="Delete">
                    <span aria-hidden="true">🗑️</span>
                    <span class="hidden sm:inline">Delete</span>
                </button>
                <button type="button" data-action="edit" class="${ACTION_BTN}" title="Edit">
                    <span aria-hidden="true">✏️</span>
                    <span class="hidden sm:inline">Edit</span>
                </button>
                <button type="button" data-action="favorite" class="${ACTION_BTN}" title="Favorite">
                    <span aria-hidden="true">${img.favorite ? '❤️' : '🤍'}</span>
                    <span class="hidden sm:inline">Favorite</span>
                </button>
                <button type="button" data-action="drag" class="${ACTION_BTN} drag-handle" title="Drag to reorder">
                    <span aria-hidden="true">📦</span>
                    <span class="hidden sm:inline">Drag</span>
                </button>
            </div>
        </article>
    `).join('');

    setupGalleryDrag();
}

function handleGalleryClick(e) {
    const card = e.target.closest('.gallery-card');
    if (!card) return;

    const id = Number(card.dataset.id);
    const actionBtn = e.target.closest('[data-action]');

    if (actionBtn) {
        e.stopPropagation();
        const action = actionBtn.dataset.action;
        if (action === 'favorite') toggleFavorite(id);
        else if (action === 'edit') openEditModal(id);
        else if (action === 'delete') openDeleteModal(id);
        return;
    }

    if (e.target.classList.contains('gallery-image')) {
        const img = images.find(i => i.id === id);
        if (img) openModal(img.src);
    }
}

let draggedIndex = null;
let isDragging = false;

function setupGalleryDrag() {
    const cards = gallery.querySelectorAll('.gallery-card');
    
    cards.forEach(card => {
        card.addEventListener('dragstart', (e) => {
            isDragging = true;
            draggedIndex = parseInt(card.dataset.index, 10);
            card.classList.add('opacity-50', 'scale-105', 'cursor-grabbing');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', card.dataset.id);
        });

        card.addEventListener('dragend', () => {
            isDragging = false;
            cards.forEach(c => {
                c.classList.remove('opacity-50', 'scale-105', 'cursor-grabbing', 'ring-2', 'ring-purple-400', 'ring-white/40');
            });
            draggedIndex = null;
        });

        card.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (!isDragging) return;
            card.classList.add('ring-2', 'ring-purple-400');
            e.dataTransfer.dropEffect = 'move';
        });

        card.addEventListener('dragleave', (e) => {
            if (!e.relatedTarget?.closest('.gallery-card')) {
                card.classList.remove('ring-2', 'ring-purple-400');
            }
        });

        card.addEventListener('drop', (e) => {
            e.preventDefault();
            if (!isDragging) return;
            const dropIndex = parseInt(card.dataset.index, 10);
            
            if (draggedIndex !== null && dropIndex !== null && draggedIndex !== dropIndex) {
                reorderImages(draggedIndex, dropIndex);
            }
        });
    });
}

function reorderImages(fromFilteredIndex, toFilteredIndex) {
    let filteredImages = images;
    if (currentFilter !== 'All') {
        filteredImages = images.filter(img => img.category === currentFilter);
    }
    
    const fromId = filteredImages[fromFilteredIndex].id;
    const toId = filteredImages[toFilteredIndex].id;
    
    const fromFullIndex = images.findIndex(i => i.id === fromId);
    const toFullIndex = images.findIndex(i => i.id === toId);
    
    if (fromFullIndex === -1 || toFullIndex === -1) return;
    
    const [item] = images.splice(fromFullIndex, 1);
    images.splice(toFullIndex, 0, item);
    
    saveToStorage();
    renderGallery();
}

function openModal(src) {
    modalImage.src = src;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function toggleFavorite(id) {
    const img = images.find(i => i.id === id);
    if (img) {
        img.favorite = !img.favorite;
        saveToStorage();
        renderGallery();
    }
}

function deleteImage(id) {
    if (confirm('Are you sure you want to delete this image?')) {
        images = images.filter(i => i.id !== id);
        saveToStorage();
        renderGallery();
    }
}

function openEditModal(id) {
    editingId = id;
    const img = images.find(i => i.id === id);
    if (img) {
        editTitle.value = img.title;
        editCategory.value = img.category;
        editModal.classList.remove('hidden');
        editModal.classList.add('flex');
    }
}

function saveEditedImage() {
    const img = images.find(i => i.id === editingId);
    if (img) {
        img.title = editTitle.value.trim();
        img.category = editCategory.value;
        saveToStorage();
        renderGallery();
        editModal.classList.add('hidden');
    }
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    updateDarkModeIcons(isDark);
}

function loadDarkMode() {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
    updateDarkModeIcons(false);
}

function updateDarkModeIcons(isDark) {
    if (isDark) {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

init();
