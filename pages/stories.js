import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import StoriesHero from '@/components/Hero/Stories'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import BLOG from '@/blog.config'

export async function getStaticProps() {
  const posts = await getAllPosts({ onlyNewsletter: true })

  const heros = await getAllPosts({ onlyHidden: true })
  const hero = heros.find((t) => t.slug === 'stories')

  let blockMap
  try {
    blockMap = await getPostBlocks(hero.id)
  } catch (err) {
    console.error(err)
    // return { props: { post: null, blockMap: null } }
  }

  return {
    props: {
      posts,
      blockMap
    },
    revalidate: 1
  }
}

const stories = ({ posts, blockMap }) => {
  return (
    <Container title={BLOG.newsletter} description={BLOG.description}>
      <StoriesHero blockMap={blockMap} />
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </Container>
  )
}

export default stories
