(function () {
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".primary-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".primary-nav a").forEach(function (link) {
    var target = link.getAttribute("href");
    if (target === currentPage) {
      link.classList.add("active");
    }
  });

  var contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(contactForm);
      var name = data.get("name") || "";
      var email = data.get("email") || "";
      var phone = data.get("phone") || "";
      var service = data.get("service") || "";
      var message = data.get("message") || "";
      var subject = encodeURIComponent("Website enquiry - " + service);
      var body = encodeURIComponent(
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + phone + "\n" +
        "Service: " + service + "\n\n" +
        message
      );
      window.location.href = "mailto:contact@aryavartaindustrial.com?subject=" + subject + "&body=" + body;
    });
  }

  var loginForm = document.querySelector("[data-login-form]");
  var portalPanel = document.querySelector("[data-portal-panel]");
  var loginPanel = document.querySelector("[data-login-panel]");
  var status = document.querySelector("[data-login-status]");
  var logout = document.querySelector("[data-logout]");

  function showPortal() {
    if (loginPanel) {
      loginPanel.style.display = "none";
    }
    if (portalPanel) {
      portalPanel.classList.add("active");
    }
  }

  if (loginForm && portalPanel && loginPanel) {
    if (window.localStorage.getItem("aryavartaEmployeeDemo") === "active") {
      showPortal();
    }

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var employeeId = String(loginForm.employeeId.value || "").trim().toUpperCase();
      var password = String(loginForm.password.value || "").trim();

      if (employeeId === "AIRPL2026" && password === "demo2026") {
        window.localStorage.setItem("aryavartaEmployeeDemo", "active");
        if (status) {
          status.className = "form-status success";
          status.textContent = "Access granted. Loading employee workspace.";
        }
        showPortal();
        return;
      }

      if (status) {
        status.className = "form-status error";
        status.textContent = "Access denied. Please check your employee ID and password.";
      }
    });
  }

  if (logout) {
    logout.addEventListener("click", function () {
      window.localStorage.removeItem("aryavartaEmployeeDemo");
      window.location.reload();
    });
  }
})();
