const grid = document.getElementById('bento-grid')
const overlay = document.getElementById('modal-overlay')
const modalImg = document.getElementById('modal-img')
const modalTitle = document.getElementById('modal-title')
const modalDesc = document.getElementById('modal-desc')
const modalVisitLink = document.getElementById('modal-visit-link')
const searchInput = document.getElementById('search-input')
const searchClear = document.getElementById('search-clear')

let allBlogs = []

async function fetchBlogs() {
  const res = await fetch('/api/blogs')
  const json = await res.json()
  return json.data
}

function createCard(blog) {
  const card = document.createElement('div')
  card.className = 'blog-card'

  card.innerHTML = `
    <div class="card-img-wrap">
      <img class="card-img" src="${blog.blogCoverImage}" alt="${blog.blogTitle}" loading="lazy" />
    </div>
    <div class="card-footer">
      <span class="card-title">${blog.blogTitle}</span>
    </div>
  `

  card.addEventListener('click', () => openModal(blog))
  return card
}

function renderBlogs(blogs) {
  grid.innerHTML = ''
  if (!blogs || blogs.length === 0) {
    grid.innerHTML = '<div class="empty-state"><span>No blogs found.</span></div>'
    return
  }
  blogs.forEach(blog => grid.appendChild(createCard(blog)))
}

function openModal(blog) {
  modalImg.src = blog.blogCoverImage
  modalImg.alt = blog.blogTitle
  modalTitle.textContent = blog.blogTitle
  modalDesc.textContent = blog.description
  modalVisitLink.href = blog.blogURL
  overlay.classList.add('open')
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  overlay.classList.remove('open')
  document.body.style.overflow = ''
}

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal()
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal()
})

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase()
  searchClear.classList.toggle('visible', query.length > 0)
  const filtered = query
    ? allBlogs.filter(b => b.blogTitle.toLowerCase().includes(query))
    : allBlogs
  renderBlogs(filtered)
})

searchClear.addEventListener('click', () => {
  searchInput.value = ''
  searchClear.classList.remove('visible')
  renderBlogs(allBlogs)
  searchInput.focus()
})

async function init() {
  try {
    allBlogs = await fetchBlogs()
    renderBlogs(allBlogs)
  } catch {
    grid.innerHTML = '<div class="empty-state"><span>Failed to load blogs.</span></div>'
  }
}

init()
