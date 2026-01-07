document.addEventListener("DOMContentLoaded", () => {

  const currentPage = document.body.dataset.page

  if (!currentPage) return

  document.querySelectorAll("nav a[data-page]").forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active")
    }
  })

})
