@@ .. @@
     // Navbar scroll effect
     const navbar = document.querySelector('.navbar');
-    const navbarHeight = navbar.offsetHeight;
-
-    function updateNavbar() {
-        if (window.scrollY > navbarHeight) {
-            navbar.classList.add('navbar-scrolled');
-        } else {
-            navbar.classList.remove('navbar-scrolled');
-        }
-    }
-
-    window.addEventListener('scroll', updateNavbar);
+    const navbarHeight = navbar ? navbar.offsetHeight : 80;