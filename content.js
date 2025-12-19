(function() {
    const updateState = () => {
        if (!document.body) return;

        const url = window.location.href;
        const isVideoPage = url.includes('view_video.php') || url.includes('/watch/');
        const isHomePage = window.location.pathname === '/' || window.location.pathname === '';

        if (isVideoPage && !isHomePage) {
            document.body.classList.add('is-video-page');
            
            // Clean up any remaining suggested thumbnails
            document.querySelectorAll('.is-video-page .js-pop, .is-video-page .activeVideo').forEach(el => {
                if (!el.closest('#player') && !el.closest('.mgp_main')) {
                    el.style.display = 'none';
                }
            });
        } else {
            // Restore everything for the Homepage
            document.body.classList.remove('is-video-page');
        }
    };

    // Use MutationObserver for better performance than setInterval
    const observer = new MutationObserver(() => {
        updateState();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // Initial run
    updateState();
})();
