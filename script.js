// Global variables
let blogPosts = [
  {
    id: 1,
    title: "The Importance of React in Modern Web Development",
    category: "web-development",
    content:
      "React.js is a powerful JavaScript library that has revolutionized modern web application development. Its component-based architecture and virtual DOM make it incredibly efficient...",
    excerpt:
      "Exploring how React.js transforms modern web development with its powerful features and ecosystem.",
    tags: ["react", "javascript", "web-development"],
    readingTime: 8,
    views: 245,
    date: new Date().toISOString().split("T")[0],
    author: "MD Anik Hasan",
  },
  {
    id: 2,
    title: "5 Proven Strategies for Facebook Ads Success",
    category: "digital-marketing",
    content:
      "Facebook Ads is a powerful marketing tool. With the right strategies, you can achieve excellent ROI. Here are 5 proven techniques that I use for my clients...",
    excerpt:
      "Learn the strategies that consistently deliver high ROI for Facebook advertising campaigns.",
    tags: ["facebook-ads", "marketing", "roi"],
    readingTime: 6,
    views: 189,
    date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
    author: "MD Anik Hasan",
  },
  {
    id: 3,
    title: "How AI Technology is Simplifying Business Operations",
    category: "ai-technology",
    content:
      "Artificial Intelligence (AI) is no longer just future technology. Currently, AI is being used in various business sectors to increase automation and efficiency...",
    excerpt:
      "Discover how AI is transforming business operations through automation and intelligent solutions.",
    tags: ["ai", "automation", "business"],
    readingTime: 10,
    views: 167,
    date: new Date(Date.now() - 172800000).toISOString().split("T")[0],
    author: "MD Anik Hasan",
  },
];

let portfolioProjects = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "websites",
    description:
      "Modern e-commerce platform built with React and Node.js featuring payment integration, inventory management, and admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    url: "",
    color: "from-primary to-accent",
  },
  {
    id: 2,
    title: "Responsive Portfolio Website",
    category: "websites",
    description:
      "Professional portfolio website with modern design, responsive layout, and interactive animations.",
    technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
    url: "",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Fashion Brand Campaign",
    category: "meta-ads",
    description:
      "Successful Facebook Ads campaign that achieved 300% ROI increase for a fashion brand through strategic targeting and creative optimization.",
    technologies: ["Facebook Ads", "Audience Research", "A/B Testing"],
    url: "",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 4,
    title: "Restaurant Promotion Campaign",
    category: "meta-ads",
    description:
      "Instagram Ads campaign that increased local customer acquisition for a restaurant chain by 250%.",
    technologies: ["Instagram Ads", "Local Targeting", "Creative Design"],
    url: "",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 5,
    title: "AI Chatbot Integration",
    category: "ai-work",
    description:
      "Smart chatbot system for customer service using ChatGPT API with natural language processing capabilities.",
    technologies: ["ChatGPT API", "Node.js", "NLP"],
    url: "",
    color: "from-green-500 to-teal-500",
  },
  {
    id: 6,
    title: "AI Content Generator Tool",
    category: "ai-work",
    description:
      "Content generation tool for blogs and social media using advanced AI prompts and automation workflows.",
    technologies: ["AI Prompts", "OpenAI API", "React"],
    url: "",
    color: "from-yellow-500 to-orange-500",
  },
];

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

function initializeApp() {
  setupEventListeners();
  renderBlogPosts();
  renderPortfolio();
  updateBlogStats();
  startTypingAnimation();
  setupIntersectionObserver();
}

function setupEventListeners() {
  // Mobile menu toggle
  document
    .getElementById("mobile-menu-btn")
    .addEventListener("click", toggleMobileMenu);

  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", smoothScroll);
  });

  // Portfolio filtering
  document.querySelectorAll(".portfolio-tab").forEach((tab) => {
    tab.addEventListener("click", filterPortfolio);
  });

  // Blog filtering
  document.querySelectorAll(".blog-filter").forEach((filter) => {
    filter.addEventListener("click", filterBlogPosts);
  });

  // Blog search
  document
    .getElementById("blog-search")
    .addEventListener("input", searchBlogPosts);

  // Blog content preview
  document
    .getElementById("blog-content")
    .addEventListener("input", updateBlogPreview);

  // Form submissions
  document
    .getElementById("blog-form")
    .addEventListener("submit", handleBlogSubmission);
  document
    .getElementById("contact-form")
    .addEventListener("submit", handleContactSubmission);
  document
    .getElementById("add-project-form")
    .addEventListener("submit", handleProjectSubmission);

  // Navbar scroll effect
  window.addEventListener("scroll", handleNavbarScroll);
}

// Mobile menu functionality
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenu.classList.toggle("hidden");
}

// Smooth scrolling
function smoothScroll(e) {
  e.preventDefault();
  const target = document.querySelector(this.getAttribute("href"));
  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    document.getElementById("mobile-menu").classList.add("hidden");
  }
}

// Typing animation
function startTypingAnimation() {
  const texts = [
    "Full Stack Developer & Digital Marketing Expert",
    "Meta Ads Expert & AI Specialist",
    "Web Developer & Content Creator",
    "Building Digital Solutions That Drive Growth",
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById("typing-text");

  function typeEffect() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typeEffect, 500);
    } else {
      setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
  }

  typeEffect();
}

// Portfolio functionality
function filterPortfolio() {
  const category = this.getAttribute("data-category");

  // Update active tab
  document.querySelectorAll(".portfolio-tab").forEach((t) => {
    t.classList.remove("active", "bg-primary", "text-white");
    t.classList.add("bg-gray-200", "dark:bg-gray-700");
  });
  this.classList.add("active", "bg-primary", "text-white");
  this.classList.remove("bg-gray-200", "dark:bg-gray-700");

  // Filter portfolio items
  document.querySelectorAll(".portfolio-item").forEach((item) => {
    if (category === "all" || item.classList.contains(category)) {
      item.style.display = "block";
      item.style.animation = "fadeInUp 0.6s ease-out";
    } else {
      item.style.display = "none";
    }
  });
}

function renderPortfolio() {
  const portfolioGrid = document.getElementById("portfolio-grid");
  portfolioGrid.innerHTML = "";

  portfolioProjects.forEach((project) => {
    const projectCard = createProjectCard(project);
    portfolioGrid.appendChild(projectCard);
  });
}

function createProjectCard(project) {
  const card = document.createElement("div");
  card.className = `portfolio-item ${project.category} bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg card-hover`;

  const techTags = project.technologies
    .map(
      (tech) =>
        `<span class="text-xs bg-primary/10 text-primary px-2 py-1 rounded m-1">${tech}</span>`
    )
    .join("");

  card.innerHTML = `
                <div class="h-48 bg-gradient-to-br ${
                  project.color
                } flex items-center justify-center">
                    <i class="fas ${getProjectIcon(
                      project.category
                    )} text-white text-4xl"></i>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-4 text-sm">${
                      project.description
                    }</p>
                    <div class="flex flex-wrap mb-4">
                        ${techTags}
                    </div>
                    <div class="flex justify-between items-center">
                        <button onclick="viewProjectDetails(${
                          project.id
                        })" class="text-primary hover:underline font-medium">
                            View Details
                        </button>
                        ${
                          project.url
                            ? `<a href="${project.url}" target="_blank" class="text-accent hover:underline">
                            <i class="fas fa-external-link-alt"></i>
                        </a>`
                            : ""
                        }
                    </div>
                </div>
            `;

  return card;
}

function getProjectIcon(category) {
  const icons = {
    websites: "fa-laptop-code",
    "meta-ads": "fa-facebook",
    "ai-work": "fa-robot",
  };
  return icons[category] || "fa-project-diagram";
}

function showAddProjectModal() {
  document.getElementById("add-project-modal").classList.add("active");
}

function handleProjectSubmission(e) {
  e.preventDefault();

  const newProject = {
    id: portfolioProjects.length + 1,
    title: document.getElementById("project-title").value,
    category: document.getElementById("project-category").value,
    description: document.getElementById("project-description").value,
    technologies: document
      .getElementById("project-technologies")
      .value.split(",")
      .map((t) => t.trim()),
    url: document.getElementById("project-url").value,
    color: getRandomColor(),
  };

  portfolioProjects.push(newProject);
  renderPortfolio();
  closeModal("add-project-modal");
  showSuccessModal("Project added successfully!");

  // Reset form
  e.target.reset();
}

function getRandomColor() {
  const colors = [
    "from-primary to-accent",
    "from-purple-500 to-pink-500",
    "from-green-500 to-teal-500",
    "from-yellow-500 to-orange-500",
    "from-red-500 to-pink-500",
    "from-indigo-500 to-purple-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function viewProjectDetails(projectId) {
  const project = portfolioProjects.find((p) => p.id === projectId);
  if (project) {
    const techList = project.technologies
      .map((tech) => `<li class="text-sm">• ${tech}</li>`)
      .join("");
    showCustomModal(
      "Project Details",
      `
                    <div class="text-left">
                        <h3 class="text-xl font-semibold mb-4">${
                          project.title
                        }</h3>
                        <div class="mb-4">
                            <span class="text-xs bg-primary/10 text-primary px-2 py-1 rounded">${getCategoryName(
                              project.category
                            )}</span>
                        </div>
                        <p class="text-gray-600 dark:text-gray-400 mb-4">${
                          project.description
                        }</p>
                        <div class="mb-4">
                            <h4 class="font-semibold mb-2">Technologies Used:</h4>
                            <ul class="text-gray-600 dark:text-gray-400">
                                ${techList}
                            </ul>
                        </div>
                        ${
                          project.url
                            ? `<a href="${project.url}" target="_blank" class="text-primary hover:underline">
                            <i class="fas fa-external-link-alt mr-1"></i>View Live Project
                        </a>`
                            : ""
                        }
                    </div>
                `
    );
  }
}

// Blog functionality
function renderBlogPosts(postsToRender = blogPosts) {
  const blogContainer = document.getElementById("blog-posts");
  blogContainer.innerHTML = "";

  postsToRender.forEach((post) => {
    const blogCard = createBlogCard(post);
    blogContainer.appendChild(blogCard);
  });
}

function createBlogCard(post) {
  const card = document.createElement("div");
  card.className = `blog-post bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg card-hover ${post.category}`;

  const tags = post.tags
    .map(
      (tag) =>
        `<span class="text-xs bg-accent/10 text-accent px-2 py-1 rounded">${tag}</span>`
    )
    .join(" ");

  card.innerHTML = `
                <div class="p-6">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-xs bg-primary/10 text-primary px-2 py-1 rounded">${getCategoryName(
                          post.category
                        )}</span>
                        <div class="flex items-center text-sm text-gray-500">
                            <i class="fas fa-clock mr-1"></i>
                            ${post.readingTime} min read
                        </div>
                    </div>
                    <h3 class="text-xl font-semibold mb-3 line-clamp-2">${
                      post.title
                    }</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">${
                      post.excerpt
                    }</p>
                    <div class="flex flex-wrap gap-1 mb-4">
                        ${tags}
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="flex items-center text-sm text-gray-500">
                            <i class="fas fa-eye mr-1"></i>
                            ${post.views} views
                        </div>
                        <button onclick="readFullArticle(${
                          post.id
                        })" class="text-primary hover:underline font-medium">
                            Read More <i class="fas fa-arrow-right ml-1"></i>
                        </button>
                    </div>
                    <div class="text-xs text-gray-400 mt-2">
                        By ${post.author} • ${formatDate(post.date)}
                    </div>
                </div>
            `;

  return card;
}

function getCategoryName(category) {
  const categories = {
    "web-development": "Web Development",
    "digital-marketing": "Digital Marketing",
    "ai-technology": "AI Technology",
    "tips-tricks": "Tips & Tricks",
  };
  return categories[category] || category;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function filterBlogPosts() {
  const category = this.getAttribute("data-category");

  // Update active filter
  document.querySelectorAll(".blog-filter").forEach((f) => {
    f.classList.remove("active", "bg-primary", "text-white");
    f.classList.add("bg-gray-200", "dark:bg-gray-700");
  });
  this.classList.add("active", "bg-primary", "text-white");
  this.classList.remove("bg-gray-200", "dark:bg-gray-700");

  // Filter posts
  const filteredPosts =
    category === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === category);
  renderBlogPosts(filteredPosts);
}

function searchBlogPosts() {
  const searchTerm = this.value.toLowerCase();
  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );
  renderBlogPosts(filteredPosts);
}

function toggleBlogForm() {
  const formContainer = document.getElementById("blog-form-container");
  formContainer.classList.toggle("hidden");
  if (!formContainer.classList.contains("hidden")) {
    document.getElementById("blog-title").focus();
  }
}

function updateBlogPreview() {
  const content = this.value;
  const preview = document.getElementById("blog-preview");

  if (content.trim()) {
    // Use marked.js to convert markdown to HTML
    if (typeof marked !== "undefined") {
      preview.innerHTML = marked.parse(content);
    } else {
      preview.innerHTML = content.replace(/\n/g, "<br>");
    }
  } else {
    preview.innerHTML = "Start typing to see preview...";
  }
}

function handleBlogSubmission(e) {
  e.preventDefault();

  const newPost = {
    id: blogPosts.length + 1,
    title: document.getElementById("blog-title").value,
    category: document.getElementById("blog-category").value,
    content: document.getElementById("blog-content").value,
    excerpt:
      document.getElementById("blog-excerpt").value ||
      document.getElementById("blog-content").value.substring(0, 150) + "...",
    tags: document
      .getElementById("blog-tags")
      .value.split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag),
    readingTime:
      parseInt(document.getElementById("blog-reading-time").value) || 5,
    views: 0,
    date: new Date().toISOString().split("T")[0],
    author: "MD Anik Hasan",
  };

  blogPosts.unshift(newPost);
  renderBlogPosts();
  updateBlogStats();
  toggleBlogForm();
  showSuccessModal("Blog post published successfully!");

  // Reset form
  e.target.reset();
  document.getElementById("blog-preview").innerHTML =
    "Start typing to see preview...";
}

function saveDraft() {
  // In a real application, this would save to localStorage or send to server
  showSuccessModal("Draft saved successfully!");
}

function readFullArticle(postId) {
  const post = blogPosts.find((p) => p.id === postId);
  if (post) {
    // Increment views
    post.views++;
    updateBlogStats();
    renderBlogPosts();

    const tags = post.tags
      .map(
        (tag) =>
          `<span class="text-xs bg-accent/10 text-accent px-2 py-1 rounded mr-1">${tag}</span>`
      )
      .join("");

    let content = post.content;
    if (typeof marked !== "undefined") {
      content = marked.parse(content);
    } else {
      content = content.replace(/\n/g, "<br>");
    }

    showCustomModal(
      "Full Article",
      `
                    <div class="text-left max-h-96 overflow-y-auto">
                        <h3 class="text-2xl font-semibold mb-4">${
                          post.title
                        }</h3>
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-xs bg-primary/10 text-primary px-2 py-1 rounded">${getCategoryName(
                              post.category
                            )}</span>
                            <div class="flex items-center text-sm text-gray-500">
                                <i class="fas fa-clock mr-1"></i>
                                ${post.readingTime} min read • ${
        post.views
      } views
                            </div>
                        </div>
                        <div class="mb-4">
                            ${tags}
                        </div>
                        <div class="prose prose-sm max-w-none text-gray-600 dark:text-gray-400 leading-relaxed">
                            ${content}
                        </div>
                        <div class="text-sm text-gray-400 mt-6 pt-4 border-t">
                            By ${post.author} • ${formatDate(post.date)}
                        </div>
                    </div>
                `
    );
  }
}

function updateBlogStats() {
  document.getElementById("total-posts").textContent = blogPosts.length;
  document.getElementById("total-views").textContent = blogPosts.reduce(
    (sum, post) => sum + post.views,
    0
  );

  const currentMonth = new Date().getMonth();
  const thisMonthPosts = blogPosts.filter(
    (post) => new Date(post.date).getMonth() === currentMonth
  );
  document.getElementById("this-month").textContent = thisMonthPosts.length;
}

// Contact form functionality
function handleContactSubmission(e) {
  e.preventDefault();

  // In a real application, this would send the email
  showSuccessModal(
    "Thank you for your message! I will get back to you within 24 hours."
  );
  e.target.reset();
}

// LinkedIn functionality
function addLinkedIn() {
  document.getElementById("linkedin-modal").classList.add("active");
}

function saveLinkedIn() {
  const url = document.getElementById("linkedin-url").value;
  if (url) {
    // Update all LinkedIn links
    document.getElementById("linkedin-link").href = url;
    document.getElementById("footer-linkedin").href = url;
    closeModal("linkedin-modal");
    showSuccessModal("LinkedIn profile added successfully!");
  }
}

// Modal functionality
function showSuccessModal(message) {
  document.getElementById("success-message").textContent = message;
  document.getElementById("success-modal").classList.add("active");
}

function showCustomModal(title, content) {
  const modal = document.createElement("div");
  modal.className = "modal active";
  modal.innerHTML = `
                <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-96 overflow-y-auto">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-semibold">${title}</h3>
                        <button onclick="this.closest('.modal').remove()" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    ${content}
                </div>
            `;
  document.body.appendChild(modal);
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
}

// Navbar scroll effect
function handleNavbarScroll() {
  const nav = document.querySelector("nav");
  if (window.scrollY > 100) {
    nav.style.background = "rgba(255, 255, 255, 0.95)";
    nav.style.backdropFilter = "blur(15px)";
  } else {
    nav.style.background = "rgba(255, 255, 255, 0.1)";
    nav.style.backdropFilter = "blur(10px)";
  }
}

// Intersection Observer for animations
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        entry.target.classList.add("animate-fade-in-up");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll(".card-hover, section > div > div")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      observer.observe(el);
    });
}

// Add some utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize theme persistence
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }
}

// Call theme initialization
initializeTheme();
