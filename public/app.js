const grid = document.getElementById('bento-grid')
const overlay = document.getElementById('modal-overlay')
const modalImg = document.getElementById('modal-img')
const modalTitle = document.getElementById('modal-title')
const modalDesc = document.getElementById('modal-desc')
const modalVisitLink = document.getElementById('modal-visit-link')

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

async function init() {
  try {
    const blogs = await fetchBlogs()
    grid.innerHTML = ''

    if (!blogs || blogs.length === 0) {
      grid.innerHTML = '<div class="empty-state"><span>No blogs yet.</span></div>'
      return
    }

    blogs.forEach(blog => grid.appendChild(createCard(blog)))
  } catch {
    grid.innerHTML = '<div class="empty-state"><span>Failed to load blogs.</span></div>'
  }
}

init()
