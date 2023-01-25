const current = new Date()
const tomorrow = new Date(current)
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow.setHours(0, 0, 0, 0)

export default function filterPublishedPosts({
  posts,
  onlyBooks,
  onlyExperiences,
  onlyStories,
  onlyPost,
  onlyHidden
}) {
  if (!posts || !posts.length) return []
  const publishedPosts = posts
    .filter((post) =>
      onlyBooks
        ? post?.type?.[0] === 'Books'
        : post
    )
    .filter((post) =>
      onlyExperiences
        ? post?.type?.[0] === 'Experiences'
        : post
    )
    .filter((post) =>
      onlyStories
        ? post?.type?.[0] === 'Stories'
        : post
    )
    .filter((post) =>
      onlyPost
        ? post?.type?.[0] === 'Post'
        : post
    )
    .filter((post) =>
      onlyHidden
        ? post?.type?.[0] === 'Hidden'
        : post?.type?.[0] !== 'Hidden'
    )
    .filter((post) => {
      const postDate = new Date(post?.date?.start_date || post.createdTime)
      return (
        post.title &&
        post.slug &&
        post?.status?.[0] === 'Published' &&
        postDate < tomorrow
      )
    })
  return publishedPosts
}
