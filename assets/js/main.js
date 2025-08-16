/**
* Template Name: TheProperty
* Template URL: https://bootstrapmade.com/theproperty-bootstrap-real-estate-template/
* Updated: Aug 05 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

// Hexadecimal representation of 'info@homebyaum.com'
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox',
    zoomable: false, // ปิดการซูมใน Glightbox (ถ้าคุณไม่ต้องการฟังก์ชันซูม)
    loop: true,
    thumbs: true
  });

  /**
   * Product Image Thumbnail and Navigation Functionality
   * (ฟังก์ชัน Drift Zoom ถูกลบออกไปแล้ว เนื่องจากคุณไม่ต้องการการซูม)
   */

  function productDetailFeatures() {
    // Thumbnail click functionality
    function initThumbnailClick() {
      const thumbnails = document.querySelectorAll('.thumbnail-item');
      // mainImage ยังคงอยู่เพื่อให้โค้ดไม่ Error แต่จะไม่ถูกใช้ในการเปลี่ยน src แล้ว
      const mainImage = document.getElementById('main-product-image'); 

      if (!thumbnails.length || !mainImage) return;

      thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
          // **โค้ดส่วนนี้ถูกคอมเมนต์ออก/ลบ เพื่อไม่ให้เปลี่ยนรูปภาพหลัก**
          // const imageSrc = this.getAttribute('data-image');
          // mainImage.src = imageSrc;
          // mainImage.setAttribute('data-zoom', imageSrc);

          // Update active state (ยังคงต้องการเพื่อเน้น Thumbnail ที่ถูกเลือก)
          thumbnails.forEach(item => item.classList.remove('active'));
          this.classList.add('active');
        });
      });
    }

    // Image navigation functionality (prev/next buttons)
    function initImageNavigation() {
      const prevButton = document.querySelector('.image-nav-btn.prev-image');
      const nextButton = document.querySelector('.image-nav-btn.next-image');

      if (!prevButton || !nextButton) return;

      const thumbnails = Array.from(document.querySelectorAll('.thumbnail-item'));
      if (!thumbnails.length) return;

      // Function to navigate to previous or next image
      function navigateImage(direction) {
        // Find the currently active thumbnail
        const activeIndex = thumbnails.findIndex(thumb => thumb.classList.contains('active'));
        if (activeIndex === -1) return;

        let newIndex;
        if (direction === 'prev') {
          // Go to previous image or loop to the last one
          newIndex = activeIndex === 0 ? thumbnails.length - 1 : activeIndex - 1;
        } else {
          // Go to next image or loop to the first one
          newIndex = activeIndex === thumbnails.length - 1 ? 0 : activeIndex + 1;
        }

        // Simulate click on the new thumbnail
        // การเรียก .click() บน thumbnail ที่มี class="glightbox" จะเปิด Lightbox
        // และยังเปลี่ยน active state ของ thumbnail ด้วย
        thumbnails[newIndex].click();
      }

      // Add event listeners to navigation buttons
      prevButton.addEventListener('click', () => navigateImage('prev'));
      nextButton.addEventListener('click', () => navigateImage('next'));
    }

    // Initialize all features (initDriftZoom ถูกลบออกแล้ว)
    initThumbnailClick();
    initImageNavigation();
  }

  productDetailFeatures();

  // --- Start: Email Obfuscation with JavaScript and Hexadecimal ---
  // ใส่โค้ดส่วนนี้เพื่อป้องกันอีเมล

  /**
   * Function to decode a hexadecimal string back to a normal string.
   * @param {string} hex - The hexadecimal string to decode.
   * @returns {string} The decoded string.
   */
  function decodeHex(hex) {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
  }

  /**
   * Function to display obfuscated emails on the page.
   * Looks for elements with the class 'obfuscated-email'.
   * The hexadecimal email should be in a 'data-hex-email' attribute.
   */
  function displayObfuscatedEmails() {
    document.querySelectorAll('.obfuscated-email').forEach(function(element) {
      const hexEmail = element.getAttribute('data-hex-email');
      if (hexEmail) {
        const email = decodeHex(hexEmail);
        element.href = 'mailto:' + email;
        element.textContent = email;
      }
    });
  }

  // Run the email obfuscation function when the page loads
  window.addEventListener('load', displayObfuscatedEmails);

  // --- End: Email Obfuscation with JavaScript and Hexadecimal ---

})();

// เพิ่ม JavaScript เพื่อ Trigger Lightbox เมื่อคลิกรูปภาพหลัก
document.addEventListener('DOMContentLoaded', function() {
    const mainImageContainer = document.querySelector('.main-image-container');
    const firstThumbnailLink = document.querySelector('.thumbnail-gallery .thumbnail-item.glightbox');

    if (mainImageContainer && firstThumbnailLink) {
        // เปลี่ยน cursor เป็นรูปมือชี้ เพื่อบอกผู้ใช้ว่าคลิกได้
        mainImageContainer.style.cursor = 'pointer';

        // เพิ่ม Event Listener ให้กับ container ของรูปภาพหลัก
        mainImageContainer.addEventListener('click', function(event) {
            // ตรวจสอบว่าไม่ได้คลิกโดนปุ่ม navigation (Prev/Next)
            if (!event.target.closest('.image-nav-buttons')) {
                // ป้องกันพฤติกรรม Default ของลิงก์ <a> (ที่เปิดรูปเต็ม)
                event.preventDefault();
                // จำลองการคลิกที่ลิงก์ thumbnail ตัวแรก เพื่อเปิด Lightbox
                firstThumbnailLink.click();
            }
        });
    }
});

// สำหรับคำนวณการแสดงผลวันที่ไฮไลท์บนหน้าแรก
document.addEventListener("DOMContentLoaded", function(){
  document.querySelectorAll(".listed time").forEach(function(el){
    let listedDate = new Date(el.getAttribute("datetime"));
    let today = new Date();
    let diffMs = today - listedDate; // ความแตกต่างในหน่วยมิลลิวินาที
    let diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // แปลงเป็นชั่วโมง
    let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // แปลงเป็นวัน

    let text;
    if (diffDays < 1) { // ถ้ายังไม่ถึง 1 วัน
      text = `ประกาศเมื่อไม่กี่ชั่วโมงที่ผ่านมา`;
    } else if (diffDays < 7) {
      text = `ประกาศเมื่อ ${diffDays} วันที่ผ่านมา`;
    } else if (diffDays < 30) {
      let weeks = Math.floor(diffDays / 7);
      text = `ประกาศเมื่อ ${weeks} สัปดาห์ที่ผ่านมา`;
    } else {
      let months = Math.floor(diffDays / 30);
      text = `ประกาศเมื่อ ${months} เดือนที่ผ่านมา`;
    }

    el.textContent = text;
  });
});