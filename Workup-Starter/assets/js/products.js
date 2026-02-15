/**
 * Products Page Logic
 * Renders product cards, handles detail modal & purchase modal
 */
(function () {
    var grid = document.getElementById('products-grid');
    if (!grid) return;

    var products = window.PRODUCTS_DATA || [];

    // Render product cards
    var html = '';
    products.forEach(function (product) {
        html += '<div class="col-lg-4 col-md-6 mb-4">';
        html += '<div class="product-card" data-product-id="' + product.id + '">';
        html += '<div class="product-card__image">';
        html += '<img src="' + product.thumbnail + '" alt="' + product.title + '">';
        html += '</div>';
        html += '<div class="product-card__body">';
        html += '<h4 class="product-card__title">' + product.title + '</h4>';
        html += '<p class="product-card__desc">' + product.description + '</p>';
        html += '<div class="product-card__footer">';
        html += '<span class="product-card__price">' + "\u20B9" + product.price + '</span>';
        html += '<button class="btn btn-style product-card__buy-btn" data-buy-id="' + product.id + '">Buy Now</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
    });

    grid.innerHTML = html;

    // Find product by id
    function findProduct(id) {
        for (var i = 0; i < products.length; i++) {
            if (products[i].id === id) return products[i];
        }
        return null;
    }

    // Event delegation on grid
    grid.addEventListener('click', function (e) {
        // Check if "Buy Now" button was clicked
        var buyBtn = e.target.closest('.product-card__buy-btn');
        if (buyBtn) {
            e.stopPropagation();
            var productId = parseInt(buyBtn.getAttribute('data-buy-id'), 10);
            openPurchaseModal(findProduct(productId));
            return;
        }

        // Otherwise, if clicked inside a product card, open detail modal
        var card = e.target.closest('.product-card');
        if (card) {
            var productId = parseInt(card.getAttribute('data-product-id'), 10);
            openDetailModal(findProduct(productId));
        }
    });

    // ---- Detail Modal ----
    function openDetailModal(product) {
        if (!product) return;

        var modalEl = document.getElementById('productDetailModal');
        if (!modalEl) return;

        var body = modalEl.querySelector('.modal-body');

        var html = '<div class="post-detail" style="box-shadow:none; padding:0;">';

        // Title & Price
        html += '<span class="product-detail__badge">DIY Kit</span>';
        html += '<h1 class="product-detail__title">' + product.title + '</h1>';
        html += '<p class="product-detail__price">' + "\u20B9" + product.price + '</p>';

        // Image Gallery
        if (product.images && product.images.length > 0) {
            html += '<div class="post-gallery">';
            html += '<img src="' + product.images[0] + '" alt="' + product.title + '" class="post-gallery__main" id="detail-gallery-main">';
            if (product.images.length > 1) {
                html += '<div class="post-gallery__thumbs">';
                product.images.forEach(function (img, idx) {
                    html += '<img src="' + img + '" alt="Thumbnail ' + (idx + 1) + '" class="post-gallery__thumb' + (idx === 0 ? ' post-gallery__thumb--active' : '') + '" data-src="' + img + '">';
                });
                html += '</div>';
            }
            html += '</div>';
        }

        // Full content
        html += '<div class="post-detail__content">' + product.fullContent + '</div>';

        // Tags
        if (product.tags && product.tags.length > 0) {
            html += '<div class="post-detail__tags">';
            product.tags.forEach(function (tag) {
                html += '<span class="post-detail__tag">#' + tag + '</span>';
            });
            html += '</div>';
        }

        html += '</div>';

        // Reviews / Comments
        if (product.comments && product.comments.length > 0) {
            html += '<div class="post-comments mt-4" style="box-shadow:none; padding:0;">';
            html += '<h3 class="post-comments__title">' + product.comments.length + ' Review' + (product.comments.length !== 1 ? 's' : '') + '</h3>';
            html += '<ul class="post-comments__list">';

            product.comments.forEach(function (comment) {
                var d = new Date(comment.date.replace(/-/g, '/'));
                var dateStr = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                html += '<li class="post-comments__item">';
                html += '<img src="' + comment.avatar + '" alt="' + comment.name + '" class="post-comments__avatar">';
                html += '<div class="post-comments__body">';
                html += '<div class="post-comments__header">';
                html += '<span class="post-comments__name">' + comment.name + '</span>';
                html += '<span class="post-comments__date">' + dateStr + '</span>';
                html += '</div>';
                html += '<p class="post-comments__text">' + comment.text + '</p>';
                html += '</div>';
                html += '</li>';
            });

            html += '</ul>';
            html += '</div>';
        }

        // Buy Now button at bottom of detail
        html += '<div class="text-center mt-4">';
        html += '<button class="btn btn-style" id="detail-buy-btn" data-buy-id="' + product.id + '">Buy Now at ' + "\u20B9" + product.price + '</button>';
        html += '</div>';

        body.innerHTML = html;

        // Gallery thumbnail click handler
        var mainImg = document.getElementById('detail-gallery-main');
        if (mainImg) {
            body.querySelectorAll('.post-gallery__thumb').forEach(function (thumb) {
                thumb.addEventListener('click', function () {
                    mainImg.src = this.getAttribute('data-src');
                    body.querySelectorAll('.post-gallery__thumb').forEach(function (t) {
                        t.classList.remove('post-gallery__thumb--active');
                    });
                    this.classList.add('post-gallery__thumb--active');
                });
            });
        }

        // Buy button inside detail modal
        var detailBuyBtn = document.getElementById('detail-buy-btn');
        if (detailBuyBtn) {
            detailBuyBtn.addEventListener('click', function () {
                var pid = parseInt(this.getAttribute('data-buy-id'), 10);
                // Close detail modal, open purchase modal
                var detailModal = bootstrap.Modal.getInstance(modalEl);
                if (detailModal) detailModal.hide();
                setTimeout(function () {
                    openPurchaseModal(findProduct(pid));
                }, 300);
            });
        }

        var modal = new bootstrap.Modal(modalEl);
        modal.show();
    }

    // ---- Purchase Modal ----
    function openPurchaseModal(product) {
        if (!product) return;

        var modalEl = document.getElementById('purchaseModal');
        if (!modalEl) return;

        // Set product info in modal
        var nameEl = modalEl.querySelector('#purchase-product-name');
        var priceEl = modalEl.querySelector('#purchase-product-price');
        if (nameEl) nameEl.textContent = product.title;
        if (priceEl) priceEl.textContent = "\u20B9" + product.price;

        // Reset form & hide success
        var form = modalEl.querySelector('#purchaseForm');
        var successMsg = modalEl.querySelector('#purchase-success');
        var formWrapper = modalEl.querySelector('#purchase-form-wrapper');
        if (form) form.reset();
        if (form) form.classList.remove('was-validated');
        if (successMsg) successMsg.style.display = 'none';
        if (formWrapper) formWrapper.style.display = 'block';

        var modal = new bootstrap.Modal(modalEl);
        modal.show();
    }

    // Purchase form submission
    var purchaseForm = document.getElementById('purchaseForm');
    if (purchaseForm) {
        purchaseForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!this.checkValidity()) {
                this.classList.add('was-validated');
                return;
            }

            // Show success message
            var successMsg = document.getElementById('purchase-success');
            var formWrapper = document.getElementById('purchase-form-wrapper');
            if (formWrapper) formWrapper.style.display = 'none';
            if (successMsg) successMsg.style.display = 'block';
        });
    }
})();
