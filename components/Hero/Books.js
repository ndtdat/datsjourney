import { BookOpenIcon } from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import { NotionRenderer } from 'react-notion-x'

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then((m) => m.Collection), { ssr: true }
)

const BooksHero = ({ blockMap }) => {
  return (
    <>
      <div className='container mx-auto flex px-5 py-2 mb-10 md:flex-row flex-col items-center'>
        <div className='flex flex-col md:w-4/5 md:items-start mb-6 md:mb-0 md:text-left'>
          <NotionRenderer
            className='md:ml-0'
            recordMap={blockMap}
            components={{ Collection }}
          />
        </div>
        <div className='w-1/5'>
          <BookOpenIcon className='object-cover object-center text-gray-500 dark:text-gray-300' />
        </div>
      </div>
    </>
  )
}

export default BooksHero
