document.addEventListener('DOMContentLoaded', function() {
    if(localStorage.getItem('role') === 'admin' || localStorage.getItem('role') === 'owner') {
        document.getElementById('upload-section').style.display = 'block';
    }

    loadGallery();

    document.getElementById('uploadForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fileInput = document.getElementById('photoInput');
        const caption = document.getElementById('photoCaption').value;
        
        if(fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                savePhotoToGallery(e.target.result, caption);
                alert('Photo uploaded successfully!');
                fileInput.value = '';
                document.getElementById('photoCaption').value = '';
                loadGallery();
            }
            
            reader.readAsDataURL(file);
        }
    });
});

function savePhotoToGallery(imageData, caption) {
    let gallery = JSON.parse(localStorage.getItem('gallery') || '[]');
    gallery.unshift({
        id: Date.now(),
        image: imageData,
        caption: caption,
        date: new Date().toLocaleDateString(),
        uploadedBy: localStorage.getItem('username') || 'Admin'
    });
    localStorage.setItem('gallery', JSON.stringify(gallery));
}

function loadGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    let gallery = JSON.parse(localStorage.getItem('gallery') || '[]');

    if(gallery.length === 0) {
        gallery = [
            {id: 1, caption: 'Midnight Tournament 2024'},
            {id: 2, caption: 'Squad War Winners'},
            {id: 3, caption: 'Community Meetup'},
            {id: 4, caption: 'New Year Celebration'}
        ];
    }
    
    galleryGrid.innerHTML = gallery.map(item => `
        <div class="col-md-3 mb-4">
            <div class="gallery-item" onclick="viewPhoto('${item.image || item.id}', '${item.caption}')">
                <img src="${item.image || 'assets/gallery/' + item.id + '.jpg'}" 
                     class="img-fluid rounded" 
                     alt="${item.caption}"
                     style="height: 200px; object-fit: cover;">
                <div class="gallery-caption">${item.caption}</div>
            </div>
        </div>
    `).join('');
}

function viewPhoto(imageSrc, caption) {
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('modalTitle').textContent = caption;
    document.getElementById('modalCaption').textContent = caption;
    
    const modal = new bootstrap.Modal(document.getElementById('photoModal'));
    modal.show();
}